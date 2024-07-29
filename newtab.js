// newtab.js
function displayBookmarkInfo(bookmark) {
  const bookmarkInfo = document.getElementById("bookmark-info");
  bookmarkInfo.innerHTML = `
    <h2>${bookmark.title}</h2>
    <p>URL: <a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
  `;

  const openButton = document.getElementById("open-bookmark");
  openButton.onclick = () => (window.location.href = bookmark.url);

  const newRandomButton = document.getElementById("new-random");
  newRandomButton.onclick = () => {
    chrome.runtime.sendMessage({ action: "getNewRandom" }, (response) => {
      if (response && response.bookmark) {
        displayBookmarkInfo(response.bookmark);
      }
    });
  };
}

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
