/* ============================================================
   nav.js — top nav, tab routing, metronome popover
   Exposes window.Nav.init(onTab)
   ============================================================ */
(function () {
  let onTab = function () {};
  let popOpen = false;

  function render() {
    const nav = document.getElementById('nav');
    nav.innerHTML = `
      <div class="nav__brand">
        <span class="nav__logo">\u25C8</span>
        <span class="nav__wordmark">FRETBOARD</span>
      </div>
      <div class="nav__tabs" id="navTabs">
        <button class="nav__tab" data-tab="course">Course</button>
        <button class="nav__tab" data-tab="tools">Tools</button>
        <button class="nav__tab" data-tab="profile">Profile</button>
      </div>
      <div class="nav__right">
        <button class="metro-trigger" id="metroTrigger" title="Metronome" aria-label="Metronome">
          <i class="ti ti-metronome"></i>
        </button>
      </div>`;

    document.getElementById('navTabs').addEventListener('click', (e) => {
      const b = e.target.closest('.nav__tab');
      if (b) setTab(b.dataset.tab);
    });

    // bottom nav (mobile)
    const bn = document.getElementById('bottomNav');
    bn.innerHTML = `
      <button class="bottom-nav__tab" data-tab="course"><i class="ti ti-book-2"></i>Course</button>
      <button class="bottom-nav__tab" data-tab="tools"><i class="ti ti-tools"></i>Tools</button>
      <button class="bottom-nav__tab" data-tab="profile"><i class="ti ti-user"></i>Profile</button>`;
    bn.addEventListener('click', (e) => {
      const b = e.target.closest('.bottom-nav__tab');
      if (b) setTab(b.dataset.tab);
    });

    setupMetronome();
  }

  function setTab(tab) {
    document.querySelectorAll('.nav__tab').forEach((t) =>
      t.classList.toggle('is-active', t.dataset.tab === tab));
    document.querySelectorAll('.bottom-nav__tab').forEach((t) =>
      t.classList.toggle('is-active', t.dataset.tab === tab));
    onTab(tab);
  }

  /* ---------- Metronome popover ---------- */
  function setupMetronome() {
    const trigger = document.getElementById('metroTrigger');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      popOpen ? closePop() : openPop();
    });

    // beat pulse on nav icon
    window.Metronome.on('beat', (b) => {
      trigger.classList.add('beat');
      setTimeout(() => trigger.classList.remove('beat'), 80);
      // update dots if open
      const dots = document.querySelectorAll('.metro-dot');
      dots.forEach((d, i) => d.classList.toggle('is-on', i === b.beat));
      setTimeout(() => {
        document.querySelectorAll('.metro-dot').forEach((d) => d.classList.remove('is-on'));
      }, 90);
    });
    window.Metronome.on('state', (s) => {
      trigger.classList.toggle('is-playing', s.playing);
      const btn = document.getElementById('metroPlay');
      if (btn) updatePlayBtn(btn, s.playing);
    });
  }

  function openPop() {
    if (document.getElementById('metroPop')) return;
    popOpen = true;
    const pop = document.createElement('div');
    pop.className = 'metro-pop';
    pop.id = 'metroPop';
    const bpm = window.Metronome.getBpm();
    const beats = window.Metronome.getBeats();
    let dots = '';
    for (let i = 0; i < beats; i++) dots += '<span class="metro-dot"></span>';
    pop.innerHTML = `
      <div class="metro-pop__title">METRONOME</div>
      <div class="metro-pop__rule"></div>
      <div class="metro-bpm">
        <span class="metro-note">\u2669</span>
        <button class="metro-step" id="bpmDown">\u2212</button>
        <input class="metro-bpm__input" id="bpmInput" type="number" value="${bpm}" min="40" max="240" />
        <button class="metro-step" id="bpmUp">+</button>
      </div>
      <div class="metro-dots">${dots}</div>
      <button class="metro-play" id="metroPlay"></button>`;
    document.getElementById('app').appendChild(pop);
    pop.addEventListener('click', (e) => e.stopPropagation());

    const input = pop.querySelector('#bpmInput');
    const clamp = (v) => Math.max(40, Math.min(240, v | 0));
    const setBpm = (v) => { v = clamp(v); input.value = v; window.Metronome.setBpm(v); };
    pop.querySelector('#bpmDown').addEventListener('click', () => setBpm(window.Metronome.getBpm() - 1));
    pop.querySelector('#bpmUp').addEventListener('click', () => setBpm(window.Metronome.getBpm() + 1));
    input.addEventListener('change', () => setBpm(parseInt(input.value, 10) || 120));
    input.addEventListener('input', () => {
      const v = parseInt(input.value, 10);
      if (!isNaN(v) && v >= 40 && v <= 240) window.Metronome.setBpm(v);
    });

    const playBtn = pop.querySelector('#metroPlay');
    updatePlayBtn(playBtn, window.Metronome.isPlaying());
    playBtn.addEventListener('click', () => window.Metronome.toggle());

    setTimeout(() => document.addEventListener('click', outside), 0);
  }

  function updatePlayBtn(btn, playing) {
    btn.innerHTML = playing
      ? '<i class="ti ti-player-pause-filled"></i> PAUSE'
      : '<i class="ti ti-player-play-filled"></i> PLAY';
  }

  function outside() {
    closePop();
  }
  function closePop() {
    const pop = document.getElementById('metroPop');
    if (pop) pop.remove();
    popOpen = false;
    document.removeEventListener('click', outside);
  }

  window.Nav = {
    init(cb) {
      onTab = cb || onTab;
      render();
    },
    setTab
  };
})();
