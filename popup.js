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
      displayBookmarkInfo(result.currentHomepage);
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
      chrome.tabs.create({ url: result.currentHomepage.url });
    }
  });
});

document
  .getElementById("interval-select")
  .addEventListener("change", (event) => {
    chrome.storage.local.set({ refreshInterval: event.target.value });
  });

chrome.storage.local.get("refreshInterval", (result) => {
  document.getElementById("interval-select").value =
    result.refreshInterval || "daily";
});

loadCurrentBookmark();
