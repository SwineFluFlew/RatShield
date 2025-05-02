# 🐀 RatShield: Crypto Filter

**RatShield** is a browser extension for Microsoft Edge and Chromium browsers that automatically hides spammy token-alert and memecoin posts on X.com and Twitter using customizable keyword filters.

---

## Features

- **Custom Keyword Filters**: Define your own list of spam indicators (e.g., `Token Alert`, `Quick Buy`, `GemPump`).
- **Match Threshold**: Only hide tweets that match a configured number of keywords.
- **Search-Only Mode**: Optionally limit filtering to search pages for Ethereum/Solana addresses or `$TICKER` queries.
- **Persistent Settings**: Configuration is saved across browser restarts via `chrome.storage.sync`.
- **Modern UI**: Clean, responsive popup with inline save confirmation.

---

## Download

You can skip cloning and just [**download the latest 🐀 release as a ZIP**](https://github.com/SwineFluFlew/RatShield/archive/refs/heads/main.zip).

---

## Load Extension from ZIP

1. Download the ZIP file from the link above.
2. Extract the contents using your file manager (Right-click → “Extract All” or “Unzip”).
3. Open your browser and go to:
   - `edge://extensions/` (Microsoft Edge)
   - or `chrome://extensions/` (Google Chrome)
4. Enable **Developer mode** using the toggle in the top-right.
5. Click **Load unpacked**.
6. Select the folder you just unzipped (`RatShield-main/`).

> You should now see the RatShield icon in your toolbar.

## Usage

1. Click the **RatShield** icon in your browser toolbar.
2. **Configure Keywords**: Enter a comma-separated list of terms to filter.
3. **Set Threshold**: Choose how many keyword matches trigger hiding a post.
4. **Enable Search-Only** (optional): Only filter on `/search?q=` pages for Solana/Ethereum addresses or `$TICKER` queries.
5. Click **Save Settings** — your changes take effect immediately.
