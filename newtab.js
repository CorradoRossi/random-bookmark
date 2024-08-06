chrome.storage.local.get(
  ["currentHomepage", "refreshInterval", "lastUpdated"],
  (result) => {
    if (result.currentHomepage && result.refreshInterval !== "everyNewTab") {
      window.location.href = result.currentHomepage;
    } else if (result.refreshInterval === "everyNewTab") {
      chrome.runtime.sendMessage({ action: "getNewRandom" }, (response) => {
        if (response && response.currentHomepage) {
          window.location.href = response.currentHomepage;
        }
      });
    } else {
      document.body.innerHTML =
        "<p>No bookmarks found. Please add some bookmarks and reload.</p>";
    }
  }
);
