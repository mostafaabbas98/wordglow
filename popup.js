// Polyfill for browser API
if (typeof browser === "undefined") {
  var browser = chrome;
}

// Save and load the user's preferred target language using chrome.storage

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("targetLang");

  // Load saved language
  chrome.storage.sync.get(["wordglowTargetLang"], (result) => {
    if (result.wordglowTargetLang) {
      select.value = result.wordglowTargetLang;
    }
  });

  // Save language on change
  select.addEventListener("change", () => {
    chrome.storage.sync.set({ wordglowTargetLang: select.value });
  });
});
