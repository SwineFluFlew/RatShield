
<div align="center" style="padding-bottom: 20px;">
  <img src="icon.png" alt="RatShield Logo" width="300" height="300">
</div>

# 🐀 RatShield: Crypto Filter

**RatShield** is a browser extension for Microsoft Edge and Chromium browsers that automatically hides spammy token-alert and memecoin posts on X.com and Twitter using customizable keyword filters.

---

## Features

- **Custom Keyword Filters**: Define your own list of spam indicators (e.g., `Token Alert`, `Quick Buy`, `GemPump`).
- **Match Threshold**: Only hide tweets that match a configured number of keywords (minimum threshold: 2).
- **Search-Only Mode**: Optionally limit filtering to search pages for Ethereum/Solana addresses or `$TICKER` queries.
- **Blacklist and Whitelist**: Block specific accounts or allow trusted accounts to bypass filtering.
- **Automated Account Filtering**: Automatically hide posts from accounts marked as "Automated 🤖".
- **Persistent Settings**: Configuration is saved across browser restarts via `chrome.storage.sync`.

---

## Download

You can skip cloning and just [**download the latest 🐀 release as a ZIP**](https://github.com/SwineFluFlew/RatShield/releases/latest).

---

## Load Extension from ZIP

1. Download the ZIP file from the link above.
2. Extract the contents using your file manager (Right-click → “Extract All” or “Unzip”).
3. Open your browser and go to:
   - `edge://extensions/` (Microsoft Edge)
   - or `chrome://extensions/` (Google Chrome)
4. Enable **Developer mode** using the toggle in the top-right.
5. Click **Load unpacked**.
6. Select the folder you just unzipped (e.g. `ratshield-v1.0.0/`).

> You should now see the RatShield icon in your toolbar.

## Usage

1. Click the **RatShield** icon in your browser toolbar.
2. **Configure Keywords**: Enter a comma-separated list of terms to filter.
3. **Set Threshold**: Choose how many keyword matches trigger hiding a post (minimum: 2).
4. **Blacklist Accounts**: Add usernames (e.g., `@spammer123`) to block specific accounts.
5. **Whitelist Accounts**: Add usernames (e.g., `@trustedfriend`) to allow specific accounts to bypass filtering.
6. **Enable Search-Only** (optional): Only filter on `/search?q=` pages for Solana/Ethereum addresses or `$TICKER` queries.
7. **Filter Automated Accounts**: Toggle to hide posts from accounts marked as "Automated 🤖".
8. Click **Save Settings** — your changes take effect immediately.

## IMPORTANT

- I've only ever tested this on Microsoft Edge. No idea if it'll work properly on chrome.

# RatShield ON (spam hidden)
![image](https://github.com/user-attachments/assets/e9d29a0e-6b90-4e0d-8a45-c0c59be88819)

# RatShield OFF (rat ass spam visible)
![image](https://github.com/user-attachments/assets/46549c57-3cd7-4986-9c4d-e65af0f7e8f0)

