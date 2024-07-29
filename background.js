function getRandomBookmark(callback) {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    const bookmarks = [];

    function traverseBookmarks(nodes) {
      for (let node of nodes) {
        if (node.url) {
          bookmarks.push(node);
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
  chrome.storage.local.get(
    ["lastUpdated", "currentHomepage", "refreshInterval"],
    (result) => {
      const now = Date.now();
      const lastUpdated = result.lastUpdated || 0;
      const refreshInterval = result.refreshInterval || "daily";

      let shouldUpdate = false;

      if (refreshInterval === "everyNewTab") {
        shouldUpdate = true;
      } else if (
        refreshInterval === "daily" &&
        now - lastUpdated > 24 * 60 * 60 * 1000
      ) {
        shouldUpdate = true;
      } else if (
        refreshInterval === "weekly" &&
        now - lastUpdated > 7 * 24 * 60 * 60 * 1000
      ) {
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        getRandomBookmark((randomBookmark) => {
          if (randomBookmark) {
            chrome.storage.local.set({
              lastUpdated: now,
              currentHomepage: randomBookmark,
            }, () => {
              // Update the current tab with the new URL
              chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0]) {
                  chrome.tabs.update(tabs[0].id, {url: randomBookmark.url});
                }
              });
            });
          }
        });
      }
    }
  );
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ refreshInterval: "daily", lastUpdated: 0 });
});

chrome.runtime.onStartup.addListener(updateHomepage);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getNewRandom") {
    getRandomBookmark((randomBookmark) => {
      if (randomBookmark) {
        chrome.storage.local.set({
          lastUpdated: Date.now(),
          currentHomepage: randomBookmark,
        });
        console.log("New random bookmark set:", randomBookmark);
        sendResponse({ bookmark: randomBookmark });
      }
    });
    return true; // Indicates we will sendResponse asynchronously
  } else if (request.action === "updateHomepage") {
    updateHomepage();
  }
});