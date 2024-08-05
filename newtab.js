chrome.storage.local.get("currentHomepage", (result) => {
  console.log("result 1", result);
  if (result.currentHomepage && result.refreshInterval !== "everyNewTab") {
    console.log("result.currentHomepage 2", result.currentHomepage);
    window.location.href = result.currentHomepage;
  } else if (result.refreshInterval === "everyNewTab") {
    console.log("result.refreshInterval", result.refreshInterval);
    chrome.runtime.sendMessage({ action: "getNewRandom" }, (response) => {
      if (response && response.currentHomepage) {
        console.log("response.currentHomepage 3", response.currentHomepage);
        window.location.href = response.currentHomepage;
      }
    });
  } else {
    document.body.innerHTML =
      "<p>No bookmarks found. Please add some bookmarks and reload.</p>";
  }
});
