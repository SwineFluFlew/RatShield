document.addEventListener('DOMContentLoaded', () => {
  const keywordsInput = document.getElementById('keywords');
  const thresholdInput = document.getElementById('threshold');
  const filterCheckbox = document.getElementById('filterSearchOnly');

  chrome.storage.sync.get(['keywords', 'threshold', 'filterSearchOnly'], (data) => {
    // populate with stored or defaults
    const kws = data.keywords && data.keywords.length ? data.keywords : DEFAULT_KEYWORDS;
    const thr = data.threshold || DEFAULT_THRESHOLD;
    const fso = data.filterSearchOnly ?? DEFAULT_FILTER_SEARCH_ONLY;

    keywordsInput.value = kws.join(', ');
    thresholdInput.value = thr;
    filterCheckbox.checked = fso;
  });

  document.getElementById('save').addEventListener('click', () => {
    const keywords = keywordsInput.value
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    const threshold = parseInt(thresholdInput.value) || 1;
    const filterSearchOnly = filterCheckbox.checked;

    chrome.storage.sync.set({ keywords, threshold, filterSearchOnly }, () => {
      const status = document.getElementById('status');
      status.textContent = 'Settings saved!';
      status.classList.add('visible');
      setTimeout(() => {
        status.classList.remove('visible');
      }, 2000);
    });
  });
});
