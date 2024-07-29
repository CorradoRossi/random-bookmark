# Random Bookmark Homepage Chrome Extension

## Overview

The Random Bookmark Homepage is a Chrome extension that enhances your browsing experience by setting a random bookmark as your homepage each day. Every time you open Chrome, you'll be greeted with a different page from your bookmarks, helping you rediscover saved content and adding an element of surprise to your daily browsing routine.

## Features

- Selects a random bookmark as your homepage daily
- Automatically updates the homepage when Chrome starts
- Overrides the new tab page to redirect to the selected bookmark
- Respects user privacy by only accessing bookmarks, not browsing history

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. The extension should now appear in your list of installed extensions.

## Usage

Once installed, the extension works automatically:

1. When you start Chrome each day, the extension will select a random bookmark as your homepage.
2. Opening a new tab will redirect you to the selected bookmark for that day.
3. The homepage will remain the same for the entire day, changing again the next time you start Chrome.

Note: If you don't have any bookmarks, the new tab page will display a message asking you to add some bookmarks and reload.

## Files

- `manifest.json`: Defines the extension's properties and required permissions.
- `background.js`: Contains the main logic for selecting a random bookmark and updating the homepage.
- `newtab.html`: A simple HTML file that serves as the new tab page.
- `newtab.js`: Handles the redirection to the selected random bookmark.

## Permissions

This extension requires the following permissions:

- `bookmarks`: To access and select from your saved bookmarks.
- `storage`: To store the last update time and current homepage URL.

## Contributing

Contributions to improve the Random Bookmark Homepage extension are welcome. Please feel free to submit issues or pull requests.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Support

If you encounter any issues or have questions about the extension, please open an issue in this repository.

Happy browsing with your random bookmark homepages!