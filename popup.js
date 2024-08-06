function displayBookmarkInfo(currentHomepage) {
  const bookmarkInfo = document.getElementById("bookmark-info");
  if (currentHomepage) {
  bookmarkInfo.innerHTML = `
    <p><a href="${
      currentHomepage.currentHomepage
    }" target="_blank">${currentHomepage.currentHomepage.replace(
    /(^\w+:|^)\/\//,
    ""
  )}</a></p>
  `;
  };
}

function loadCurrentBookmark() {
  chrome.storage.local.get("currentHomepage", (result) => {
    if (result.currentHomepage) {
      displayBookmarkInfo(result);
    } else {
      document.getElementById("bookmark-info").innerHTML =
        "<p>No bookmarks found. Please add some bookmarks and reload.</p>";
    }
  });
}

document.getElementById("new-random").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "getNewRandom" }, (response) => {
    if (response && response.currentHomepage) {
      displayBookmarkInfo(response);
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

document
  .getElementById("interval-select")
  .addEventListener("change", (event) => {
    const newInterval = event.target.value;
    chrome.storage.local.set({ refreshInterval: newInterval }, () => {
      console.log("Refresh interval updated to:", newInterval);
      chrome.runtime.sendMessage({ action: "updateHomepage" });
    });
  });

chrome.storage.local.get(
  ["refreshInterval", "currentHomepage", "lastUpdated"],
  (result) => {
    console.log("refreshInterval", result);
    document.getElementById("interval-select").value =
      result.refreshInterval || "daily";
  }
);

loadCurrentBookmark();