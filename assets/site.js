// AroraMSP — shared nav, footer, tweaks
(function () {
  const defaults = { accent: "#0078d4", density: "comfortable", showGridBg: true };
  const state = Object.assign({}, defaults, (window.TWEAKS || {}));

  const nav = `
    <nav class="nav">
      <div class="wrap nav-inner">
        <a href="index.html" class="brand" aria-label="AroraMSP home">
         <img src="uploads/arora_msp_logo_navbar.svg" alt="AroraMSP" style="width:160px; height:48px;">
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
