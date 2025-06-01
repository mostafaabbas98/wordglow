// Polyfill for browser API
if (typeof browser === "undefined") {
  var browser = chrome;
}

// WordGlow Background Script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "translate" && message.text) {
    // Get the user's preferred target language (default to 'ar')
    chrome.storage.sync.get(["wordglowTargetLang"], (result) => {
      const targetLang = result.wordglowTargetLang || "ar";
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        message.text
      )}&langpair=en|${targetLang}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const translation = data?.responseData?.translatedText;
          if (translation) {
            sendResponse({ translation });
          } else {
            sendResponse({ translation: null, error: "No translation found." });
          }
        })
        .catch((error) => {
          sendResponse({
            translation: null,
            error: error.message || "Translation failed.",
          });
        });
    });
    return true;
  }
});
