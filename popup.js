document.addEventListener('DOMContentLoaded', () => {
  const keywordsInput = document.getElementById('keywords');
  const thresholdInput = document.getElementById('threshold');
  const filterCheckbox = document.getElementById('filterSearchOnly');
  const enableToggle = document.getElementById('enableToggle');
  const enableLabel = document.getElementById('enableLabel');
  const automatedCheckbox = document.getElementById('filterAutomated');
  const blacklistInput = document.getElementById('blacklist');
  const whitelistInput = document.getElementById('whitelist');
  const status = document.getElementById('status');

  chrome.storage.sync.get(
    [
      'keywords',
      'threshold',
      'filterSearchOnly',
      'enabled',
      'filterAutomated',
      'blacklist',
      'whitelist'
    ],
    (data) => {
      const kws = data.keywords?.length ? data.keywords : DEFAULT_KEYWORDS;
      const thr = data.threshold || DEFAULT_THRESHOLD;
      const fso = data.filterSearchOnly ?? DEFAULT_FILTER_SEARCH_ONLY;
      const on = data.enabled ?? true;
      const auto = data.filterAutomated ?? DEFAULT_FILTER_AUTOMATED;
      const bl = data.blacklist?.join(', ') || '';
      const wl = data.whitelist?.join(', ') || '';

      keywordsInput.value = kws.join(', ') || '';
      thresholdInput.value = thr;
      filterCheckbox.checked = fso;
      enableToggle.checked = on;
      enableLabel.textContent = `RatShield: ${on ? 'ON' : 'OFF'}`;
      automatedCheckbox.checked = auto;
      blacklistInput.value = bl;
      whitelistInput.value = wl;
    }
  );

  // Save
  document.getElementById('save').addEventListener('click', () => {
    const keywords = keywordsInput.value
      .split(/[\r\n,]+/)
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    const threshold = Math.max(parseInt(thresholdInput.value) || DEFAULT_THRESHOLD, 2);
    const filterSearchOnly = filterCheckbox.checked;
    const filterAutomated = automatedCheckbox.checked;
    const enabled = enableToggle.checked;
    const blacklist = blacklistInput.value
      .split(/[\r\n,]+/)
      .map((b) => b.trim().replace(/^@/, '').toLowerCase())
      .filter(Boolean);

    const whitelist = whitelistInput.value
      .split(/[\r\n,]+/)
      .map((w) => w.trim().replace(/^@/, '').toLowerCase())
      .filter(Boolean);

    chrome.storage.sync.set(
      { keywords, threshold, filterSearchOnly, filterAutomated, enabled, blacklist, whitelist },
      () => {
        status.textContent = 'Settings saved!';
        status.classList.add('visible');
        setTimeout(() => status.classList.remove('visible'), 2000);
        console.log('Saved all settings:', {
          keywords,
          threshold,
          filterSearchOnly,
          filterAutomated,
          enabled,
          blacklist,
          whitelist
        });
      }
    );
  });
});
