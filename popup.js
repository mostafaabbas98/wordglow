// Polyfill for browser API
if (typeof browser === "undefined") {
  var browser = chrome;
}

// Save and load the user's preferred target language and enable state using chrome.storage

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("targetLang");
  const enableToggle = document.getElementById("enableToggle");

  // Load saved settings
  chrome.storage.sync.get(
    ["wordglowTargetLang", "wordglowEnabled"],
    (result) => {
      // Load target language
      if (result.wordglowTargetLang) {
        select.value = result.wordglowTargetLang;
      }

      // Load enabled state (default to true if not set)
      const isEnabled =
        result.wordglowEnabled !== undefined ? result.wordglowEnabled : true;
      enableToggle.checked = isEnabled;
    }
  );

  // Save language on change
  select.addEventListener("change", () => {
    chrome.storage.sync.set({ wordglowTargetLang: select.value });
  });

  // Save enabled state on toggle
  enableToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ wordglowEnabled: enableToggle.checked });
  });
});
