console.log('RATSHIELD: Running...');

// regexes for search‐URL filtering
const ETH_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TICKER_RE = /^\$[A-Za-z]{1,5}$/;

function getXPostText(el) {
  return el.innerText || '';
}

function getUsernameFromXPost(el) {
  const container = el.querySelector("div[data-testid='User-Name']");
  if (container) {
    const spans = container.querySelectorAll('span');
    for (const span of spans) {
      const txt = span.textContent.trim();
      if (txt.startsWith('@')) {
        return txt.slice(1).toLowerCase();
      }
    }
  }
  // fallback
  const header = getXPostText(el).split('\n')[0] || '';
  return header.split(' ')[0].replace(/^@?/, '').toLowerCase();
}

function collapseXPost(el, matched) {
  if (el.dataset.ratshieldWrapped) return;
  el.dataset.ratshieldWrapped = 'true';

  const username = getUsernameFromXPost(el) || 'user';
  const preview = matched.slice(0, 2).join(', ');

  const wrapper = document.createElement('div');
  wrapper.classList.add('ratshield-wrapper', 'collapsed');

  const btn = document.createElement('button');
  btn.classList.add('ratshield-toggle', 'show');
  btn.textContent = `➕ Show @${username} xpost (${preview})`;

  btn.addEventListener('click', () => {
    const isCollapsed = wrapper.classList.toggle('collapsed');
    if (isCollapsed) {
      el.style.display = 'none';
      btn.textContent = `➕ Show @${username} xpost (${preview})`;
      btn.classList.replace('hide', 'show');
    } else {
      el.style.display = '';
      btn.textContent = `➖ Hide @${username} xpost`;
      btn.classList.replace('show', 'hide');
    }
  });

  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(btn);
  el.style.display = 'none';
  wrapper.appendChild(el);
}

function hideSpamXPosts({ keywords, threshold, filterAutomated, whitelist, blacklist }) {
  document.querySelectorAll("article, div[data-testid='tweet']").forEach((el, i) => {
    const username = getUsernameFromXPost(el);

    if (whitelist.includes(username)) {
      return;
    }

    if (blacklist.includes(username)) {
      return collapseXPost(el, ['blacklisted']);
    }

    const text = getXPostText(el).normalize('NFKC').toLowerCase();
    if (filterAutomated && text.includes('automated')) {
      return collapseXPost(el, ['🤖']);
    }

    const matched = keywords.filter((kw) => text.includes(kw.normalize('NFKC').toLowerCase()));
    if (matched.length >= threshold) {
      collapseXPost(el, matched);
    }
  });
}

chrome.storage.sync.get(
  [
    'keywords',
    'threshold',
    'filterSearchOnly',
    'enabled',
    'filterAutomated',
    'whitelist',
    'blacklist'
  ],
  (data) => {
    if (!data.enabled) {
      console.log('RatShield disabled🛑');
      return;
    }

    const config = {
      keywords: data.keywords ?? DEFAULT_KEYWORDS,
      threshold: data.threshold ?? DEFAULT_THRESHOLD,
      filterSearchOnly: data.filterSearchOnly ?? DEFAULT_FILTER_SEARCH_ONLY,
      filterAutomated: data.filterAutomated ?? DEFAULT_FILTER_AUTOMATED,
      whitelist: (data.whitelist || []).map((u) => u.toLowerCase()),
      blacklist: (data.blacklist || []).map((u) => u.toLowerCase())
    };

    function shouldRunOnThisPage() {
      if (!config.filterSearchOnly) return true;
      if (!location.pathname.startsWith('/search')) return false;
      const q = new URLSearchParams(location.search).get('q') || '';
      return ETH_ADDRESS_RE.test(q) || SOL_ADDRESS_RE.test(q) || TICKER_RE.test(q);
    }

    function processPage() {
      if (shouldRunOnThisPage()) {
        hideSpamXPosts(config);
      }
    }

    processPage();
    new MutationObserver(processPage).observe(document.body, {
      childList: true,
      subtree: true
    });
  }
);
