// popup.js
function displayBookmarkInfo(bookmark) {
  const bookmarkInfo = document.getElementById("bookmark-info");
  bookmarkInfo.innerHTML = `
    <p><strong>Current bookmark:</strong></p>
    <p>${bookmark.title}</p>
    <p><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
  `;
}

function loadCurrentBookmark() {
  chrome.storage.local.get("currentHomepage", (result) => {
    if (result.currentHomepage) {
      chrome.bookmarks.search({ url: result.currentHomepage }, (bookmarks) => {
        if (bookmarks.length > 0) {
          displayBookmarkInfo(bookmarks[0]);
        } else {
          document.getElementById("bookmark-info").innerHTML =
            "<p>Error: Bookmark not found.</p>";
        }
      });
    } else {
      document.getElementById("bookmark-info").innerHTML =
        "<p>No bookmarks found. Please add some bookmarks and reload.</p>";
    }
  });
}

document.getElementById("new-random").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "getNewRandom" }, (response) => {
    if (response && response.bookmark) {
      displayBookmarkInfo(response.bookmark);
    }
  });
});

document.getElementById("open-current").addEventListener("click", () => {
  chrome.storage.local.get("currentHomepage", (result) => {
    if (result.currentHomepage) {
      chrome.tabs.create({ url: result.currentHomepage });
    }
  });
});

loadCurrentBookmark();
