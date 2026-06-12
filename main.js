/* ============================================================
   main.js — app entry, state, tab routing
   ============================================================ */
(function () {
  let currentTab = null;

  function route(tab) {
    if (tab === currentTab && tab !== 'profile') {
      // allow re-render of course/tools without flicker; profile re-renders to refresh stats
    }
    currentTab = tab;
    const view = document.getElementById('view');
    view.innerHTML = '';
    if (tab === 'course') window.Course.render(view);
    else if (tab === 'tools') window.Tools.render(view);
    else if (tab === 'profile') window.Profile.render(view);
    try { localStorage.setItem('fb_tab', tab); } catch (e) {}
  }

  function boot() {
    window.Progress.init();

    // decorative inlay dots on the fret strip
    const strip = document.getElementById('fretStrip');
    if (strip) {
      [240, 400, 560, 880].forEach((x) => {
        const dot = document.createElement('span');
        dot.className = 'inlay';
        dot.style.left = x + 'px';
        strip.appendChild(dot);
      });
    }

    window.Nav.init(route);

    let start = 'course';
    try { start = localStorage.getItem('fb_tab') || 'course'; } catch (e) {}
    window.Nav.setTab(start);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
