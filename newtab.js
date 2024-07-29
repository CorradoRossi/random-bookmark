chrome.storage.local.get("currentHomepage", (result) => {
  if (result.currentHomepage) {
    window.location.href = result.currentHomepage;
  } else {
    document.body.innerHTML =
      "<p>No bookmarks found. Please add some bookmarks and reload.</p>";
  }
});
