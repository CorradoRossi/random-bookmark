// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ lastUpdated: 0 });
});

function getRandomBookmark(callback) {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    const bookmarks = [];

    function traverseBookmarks(nodes) {
      for (let node of nodes) {
        if (node.url) {
          bookmarks.push(node.url);
        }
        if (node.children) {
          traverseBookmarks(node.children);
        }
      }
    }

    traverseBookmarks(bookmarkTreeNodes);

    if (bookmarks.length > 0) {
      const randomIndex = Math.floor(Math.random() * bookmarks.length);
      callback(bookmarks[randomIndex]);
    } else {
      callback(null);
    }
  });
}

function updateHomepage() {
  const now = Date.now();
  chrome.storage.local.get(["lastUpdated", "currentHomepage"], (result) => {
    const lastUpdated = result.lastUpdated || 0;
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (now - lastUpdated > oneDayInMs) {
      getRandomBookmark((randomBookmark) => {
        if (randomBookmark) {
          chrome.storage.local.set({
            lastUpdated: now,
            currentHomepage: randomBookmark,
          });
        }
      });
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getNewRandom") {
    getRandomBookmark((randomBookmark) => {
      if (randomBookmark) {
        chrome.bookmarks.search({url: randomBookmark}, (bookmarks) => {
          if (bookmarks.length > 0) {
            chrome.storage.local.set({
              lastUpdated: Date.now(),
              currentHomepage: randomBookmark
            });
            sendResponse({bookmark: bookmarks[0]});
          }
        });
      }
    });
    return true;  // Indicates we will sendResponse asynchronously
  }
});

chrome.runtime.onStartup.addListener(updateHomepage);
