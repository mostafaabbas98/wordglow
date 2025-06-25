// Polyfill for browser API
if (typeof browser === "undefined") {
  var browser = chrome;
}

// WordGlow Content Script
console.log("WordGlow extension loaded!");

let tooltip = null;
let isTranslating = false;

// Create tooltip element
function createTooltip() {
  const tooltip = document.createElement("div");
  tooltip.id = "wordglow-tooltip";
  tooltip.className = "wordglow-tooltip hidden";
  document.body.appendChild(tooltip);
  return tooltip;
}

// Position tooltip near selected text
function positionTooltip(tooltip, selection) {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Position above the selected text
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY - 10}px`;
}

// Show loading state
function showLoading(tooltip) {
  tooltip.classList.remove("hidden");
  tooltip.innerHTML = `
    <div class="wordglow-loading">
      <div class="spinner"></div>
      <span>Translating...</span>
    </div>
  `;
}

// Show translation result
function showTranslation(tooltip, originalText, translatedText) {
  tooltip.classList.remove("hidden");
  tooltip.innerHTML = `
    <div class="wordglow-content">
      <div class="original-text">${originalText}</div>
      <div class="translated-text">${translatedText}</div>
    </div>
  `;
}

// Hide tooltip
function hideTooltip() {
  if (tooltip) {
    tooltip.classList.add("hidden");
  }
}

// Handle text selection
function handleTextSelection() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  // Hide tooltip if no selection
  if (!selectedText) {
    hideTooltip();
    return;
  }

  // Check if WordGlow is enabled before proceeding
  chrome.storage.sync.get(["wordglowEnabled"], (result) => {
    const isEnabled =
      result.wordglowEnabled !== undefined ? result.wordglowEnabled : true;

    if (!isEnabled) {
      hideTooltip();
      return;
    }

    // Create tooltip if doesn't exist
    if (!tooltip) {
      tooltip = createTooltip();
    }

    // Position and show loading
    tooltip.classList.remove("hidden"); // Ensure tooltip is visible immediately
    positionTooltip(tooltip, selection);
    showLoading(tooltip);

    // Request translation
    isTranslating = true;
    chrome.runtime.sendMessage(
      {
        action: "translate",
        text: selectedText,
      },
      (response) => {
        isTranslating = false;
        if (chrome.runtime.lastError) {
          tooltip.innerHTML = `
            <div class="wordglow-error">
              Translation failed. Try again.
            </div>
          `;
          return;
        }
        if (response && response.translation) {
          showTranslation(tooltip, selectedText, response.translation);
        } else {
          tooltip.innerHTML = `
            <div class="wordglow-error">
              Translation failed. Try again.
            </div>
          `;
        }
      }
    );
  });
}

// Event listeners
document.addEventListener("mouseup", handleTextSelection);

// Hide tooltip when clicking elsewhere
document.addEventListener("click", (e) => {
  if (tooltip && !tooltip.contains(e.target)) {
    hideTooltip();
  }
});
