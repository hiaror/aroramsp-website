// AroraMSP — shared nav, footer, tweaks
(function () {
  const defaults = { accent: "#0078d4", density: "comfortable", showGridBg: true };
  const state = Object.assign({}, defaults, (window.TWEAKS || {}));

  const nav = `
    <nav class="nav">
      <div class="wrap nav-inner">
        <a href="index.html" class="brand" aria-label="AroraMSP home">
        <svg viewBox="0 0 690 210" height="70" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle"><rect width="680" height="200" fill="#0f1117" rx="12"/><g transform="translate(55, 50)"><rect x="0" y="0" width="90" height="90" rx="18" fill="#1a1f2e"/><rect x="18" y="38" width="54" height="14" rx="3" fill="none" stroke="#0078d4" stroke-width="1.5"/><line x1="25" y1="38" x2="25" y2="28" stroke="#0078d4" stroke-width="1.5"/><circle cx="25" cy="24" r="4" fill="none" stroke="#0078d4" stroke-width="1.5"/><line x1="38" y1="38" x2="38" y2="22" stroke="#00b4d8" stroke-width="1.5"/><rect x="34" y="16" width="8" height="6" rx="1" fill="#00b4d8"/><line x1="52" y1="38" x2="52" y2="28" stroke="#0078d4" stroke-width="1.5"/><circle cx="52" cy="24" r="4" fill="none" stroke="#0078d4" stroke-width="1.5"/><line x1="65" y1="38" x2="65" y2="22" stroke="#00b4d8" stroke-width="1.5"/><rect x="61" y="16" width="8" height="6" rx="1" fill="#00b4d8"/><line x1="25" y1="52" x2="25" y2="62" stroke="#0078d4" stroke-width="1.5"/><line x1="25" y1="62" x2="38" y2="62" stroke="#0078d4" stroke-width="1.5"/><line x1="38" y1="62" x2="38" y2="70" stroke="#0078d4" stroke-width="1.5"/><circle cx="38" cy="73" r="3" fill="#0078d4"/><line x1="52" y1="52" x2="52" y2="62" stroke="#00b4d8" stroke-width="1.5"/><line x1="52" y1="62" x2="65" y2="62" stroke="#00b4d8" stroke-width="1.5"/><line x1="65" y1="62" x2="65" y2="70" stroke="#00b4d8" stroke-width="1.5"/><circle cx="65" cy="73" r="3" fill="#00b4d8"/><circle cx="25" cy="45" r="2" fill="#ffffff"/><circle cx="38" cy="45" r="2" fill="#ffffff"/><circle cx="52" cy="45" r="2" fill="#ffffff"/><circle cx="65" cy="45" r="2" fill="#ffffff"/></g><text x="170" y="95" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#ffffff" letter-spacing="-1">Arora</text><text x="170" y="138" font-family="Arial,sans-serif" font-size="42" font-weight="300" fill="#0078d4" letter-spacing="2">MSP</text><line x1="170" y1="150" x2="560" y2="150" stroke="#ffffff" stroke-width="0.5" opacity="0.2"/><text x="170" y="172" font-family="Arial,sans-serif" font-size="15" fill="#ffffff" letter-spacing="3">MICROSOFT 365 CONSULTING</text></svg>
        </a>
        <div class="nav-links" id="navLinks">
          <a href="services.html" data-page="services">services</a>
          <a href="process.html" data-page="process">process</a>
          <a href="pricing.html" data-page="pricing">pricing</a>
          <a href="about.html" data-page="about">about</a>
        </div>
        <a href="contact.html" class="nav-cta" data-page="contact">contact →</a>
      </div>
    </nav>
  `;

  const foot = `
    <footer>
      <div class="wrap">
        <div class="foot-top">
          <div class="foot-copy">
            <div>© 2026 AroraMSP</div>
            <div class="sm">Microsoft 365 consulting</div>
          </div>
          <div class="foot-links">
            <a href="services.html">services</a>
            <a href="pricing.html">pricing</a>
            <a href="about.html">about</a>
          </div>
        </div>
        <div class="foot-bottom">
          <span class="dot">●</span> all systems operational
        </div>
      </div>
    </footer>
  `;

  const tweaks = `
    <div class="tweaks" id="tweaks">
      <div class="tweaks-head">
        <span>// tweaks</span>
        <span class="close" id="tweaksClose">✕</span>
      </div>
      <div class="tweaks-body">
        <div class="tweak-group">
          <label>Accent color</label>
          <div class="swatch-row" id="accentSwatches">
            <div class="swatch" data-color="#0078d4" style="background:#0078d4"></div>
            <div class="swatch" data-color="#22d3ee" style="background:#22d3ee"></div>
            <div class="swatch" data-color="#2ea043" style="background:#2ea043"></div>
            <div class="swatch" data-color="#a371f7" style="background:#a371f7"></div>
            <div class="swatch" data-color="#f0883e" style="background:#f0883e"></div>
            <div class="swatch" data-color="#f85149" style="background:#f85149"></div>
          </div>
        </div>
        <div class="tweak-group">
          <label>Density</label>
          <div class="seg" id="densitySeg">
            <button data-val="comfortable">Comfortable</button>
            <button data-val="compact">Compact</button>
          </div>
        </div>
        <div class="tweak-toggle" id="gridToggle" data-on="true">
          <span>Background grid</span>
          <span class="tg"></span>
        </div>
      </div>
    </div>
  `;

  const gridEl = document.createElement('div');
  gridEl.className = 'grid-bg';
  document.body.prepend(gridEl);

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', foot);
  document.body.insertAdjacentHTML('beforeend', tweaks);

  const page = document.body.dataset.page;
  if (page) {
    const link = document.querySelector(`.nav-links a[data-page="${page}"], .nav-cta[data-page="${page}"]`);
    if (link) link.setAttribute('aria-current', 'page');
  }

  const body = document.body;
  const applyTweaks = (t) => {
    document.documentElement.style.setProperty('--accent', t.accent);
    body.setAttribute('data-density', t.density);
    body.setAttribute('data-grid', t.showGridBg ? 'on' : 'off');
    document.querySelectorAll('#accentSwatches .swatch').forEach(s =>
      s.classList.toggle('active', s.dataset.color.toLowerCase() === (t.accent || '').toLowerCase()));
    document.querySelectorAll('#densitySeg button').forEach(b =>
      b.classList.toggle('active', b.dataset.val === t.density));
    const gt = document.getElementById('gridToggle');
    if (gt) gt.setAttribute('data-on', String(!!t.showGridBg));
  };
  applyTweaks(state);

  const persist = (patch) => {
    Object.assign(state, patch);
    applyTweaks(state);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  document.querySelectorAll('#accentSwatches .swatch').forEach(s =>
    s.addEventListener('click', () => persist({ accent: s.dataset.color })));
  document.querySelectorAll('#densitySeg button').forEach(b =>
    b.addEventListener('click', () => persist({ density: b.dataset.val })));
  document.getElementById('gridToggle').addEventListener('click', () =>
    persist({ showGridBg: !state.showGridBg }));
  document.getElementById('tweaksClose').addEventListener('click', () => {
    document.getElementById('tweaks').classList.remove('open');
    window.parent.postMessage({ type: '__deactivate_edit_mode' }, '*');
  });

  window.addEventListener('message', (e) => {
    const data = e.data || {};
    if (data.type === '__activate_edit_mode') document.getElementById('tweaks').classList.add('open');
    if (data.type === '__deactivate_edit_mode') document.getElementById('tweaks').classList.remove('open');
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');
})();
