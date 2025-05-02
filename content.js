// regex
const ETH_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TICKER_RE = /^\$[A-Za-z]{1,5}$/;

function getTweetText(el) {
  return el.innerText || '';
}

function hideSpamTweets({ keywords, threshold }) {
  const tweets = document.querySelectorAll("article, div[data-testid='tweet']");
  tweets.forEach((tweet) => {
    const text = getTweetText(tweet).toLowerCase();
    const hits = keywords.filter((kw) => text.includes(kw.toLowerCase())).length;
    if (hits >= threshold) {
      tweet.style.display = 'none';
    }
  });
}

chrome.storage.sync.get(['keywords', 'threshold', 'filterSearchOnly'], (data) => {
  const keywords = data.keywords && data.keywords.length ? data.keywords : DEFAULT_KEYWORDS;
  const threshold = data.threshold || DEFAULT_THRESHOLD;
  const filterSearchOnly = data.filterSearchOnly ?? DEFAULT_FILTER_SEARCH_ONLY;

  const config = { keywords, threshold, filterSearchOnly };

  function shouldRunOnThisPage() {
    if (!filterSearchOnly) return true;
    // only on /search?q=...
    if (!location.pathname.startsWith('/search')) return false;
    const q = new URLSearchParams(location.search).get('q') || '';
    return ETH_ADDRESS_RE.test(q) || SOL_ADDRESS_RE.test(q) || TICKER_RE.test(q);
  }

  function processPage() {
    if (shouldRunOnThisPage()) {
      hideSpamTweets(config);
    }
  }

  // run once now
  processPage();

  // watch for DOM changes
  new MutationObserver(processPage).observe(document.body, {
    childList: true,
    subtree: true
  });
});
