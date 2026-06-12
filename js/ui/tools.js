/* ============================================================
   tools.js — chord viewer, scale viewer, circle of fifths
   Exposes window.Tools.render(container)
   ============================================================ */
(function () {
  const D = () => window.Diagrams;
  let chordRoot = 'C', chordType = 'maj';
  let scaleRoot = 'A', scaleType = 'pentatonic minor';
  let cofSel = 'C';

  function opt(val, label, sel) {
    return `<option value="${val}" ${val === sel ? 'selected' : ''}>${label}</option>`;
  }

  function render(container) {
    container.innerHTML = `
      <div class="tools">
        <div class="tools__head">
          <h1>TOOLS</h1>
          <p>Interactive references \u2014 build chords, map scales, and explore key relationships.</p>
        </div>
        <div class="tools__grid">
          <div class="tool-card" id="chordCard"></div>
          <div class="tool-card" id="scaleCard"></div>
          <div class="tool-card" id="cofCard"></div>
        </div>
      </div>`;
    renderChord();
    renderScale();
    renderCof();
  }

  /* ---------- Chord viewer ---------- */
  function renderChord() {
    const card = document.getElementById('chordCard');
    const roots = window.Chords.ROOTS;
    const types = window.Chords.TYPES;
    card.innerHTML = `
      <div class="tool-card__title">Chord Diagrams</div>
      <div class="tool-card__controls">
        <select class="select" id="chRoot">${roots.map((r) => opt(r, r, chordRoot)).join('')}</select>
        <select class="select" id="chType">${types.map((t) => opt(t, window.Chords.TYPE_LABEL[t], chordType)).join('')}</select>
      </div>
      <div class="tool-card__stage" id="chStage"></div>
      <div class="note-list" id="chNotes"></div>`;

    const stage = card.querySelector('#chStage');
    stage.appendChild(D().chord(chordRoot, chordType));
    const notes = window.Music.chordNotes(chordRoot, chordType);
    card.querySelector('#chNotes').innerHTML = notes.map((n) => `<span class="pill">${n}</span>`).join('');

    card.querySelector('#chRoot').addEventListener('change', (e) => { chordRoot = e.target.value; window.Progress.markToolUsed('chords'); renderChord(); });
    card.querySelector('#chType').addEventListener('change', (e) => { chordType = e.target.value; window.Progress.markToolUsed('chords'); renderChord(); });
  }

  /* ---------- Scale viewer ---------- */
  function renderScale() {
    const card = document.getElementById('scaleCard');
    const roots = window.Scales.ROOTS;
    const types = window.Scales.TYPES;
    card.innerHTML = `
      <div class="tool-card__title">Scale Viewer</div>
      <div class="tool-card__controls">
        <select class="select" id="scRoot">${roots.map((r) => opt(r, r, scaleRoot)).join('')}</select>
        <select class="select" id="scType">${types.map((t) => opt(t.id, t.label, scaleType)).join('')}</select>
      </div>
      <div class="tool-card__stage" id="scStage" style="overflow-x:auto"></div>
      <div class="formula-label">Formula</div>
      <div class="formula" id="scFormula"></div>
      <div class="note-list" id="scNotes"></div>`;

    card.querySelector('#scStage').appendChild(D().scale(scaleRoot, scaleType, 12));
    card.querySelector('#scFormula').textContent = window.Scales.formula(scaleType);
    const notes = window.Scales.notes(scaleRoot, scaleType);
    card.querySelector('#scNotes').innerHTML = notes.map((n, i) =>
      `<span class="pill ${i === 0 ? '' : 'neutral'}">${n}</span>`).join('');

    card.querySelector('#scRoot').addEventListener('change', (e) => { scaleRoot = e.target.value; window.Progress.markToolUsed('scales'); renderScale(); });
    card.querySelector('#scType').addEventListener('change', (e) => { scaleType = e.target.value; window.Progress.markToolUsed('scales'); renderScale(); });
  }

  /* ---------- Circle of fifths ---------- */
  function renderCof() {
    const card = document.getElementById('cofCard');
    card.innerHTML = `
      <div class="tool-card__title">Circle of Fifths</div>
      <div class="tool-card__stage" id="cofStage"></div>
      <div class="cof-info" id="cofInfo"></div>`;
    card.querySelector('#cofStage').appendChild(buildWheel());
    renderCofInfo();
  }

  function buildWheel() {
    const el = D().el, txt = D().txt;
    const size = 280, cx = size / 2, cy = size / 2;
    const rOuter = 130, rMid = 92, rInner = 54;
    const s = D().svg(size, size);
    const majors = window.Theory.MAJORS;
    const minors = window.Theory.MINORS;
    const n = 12;
    const seg = (Math.PI * 2) / n;

    function arcPath(r1, r2, a0, a1) {
      const p = (r, a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
      const [x0, y0] = p(r2, a0);
      const [x1, y1] = p(r2, a1);
      const [x2, y2] = p(r1, a1);
      const [x3, y3] = p(r1, a0);
      const large = (a1 - a0) > Math.PI ? 1 : 0;
      return `M ${x0} ${y0} A ${r2} ${r2} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r1} ${r1} 0 ${large} 0 ${x3} ${y3} Z`;
    }

    function ring(labels, r1, r2, isMinor) {
      labels.forEach((label, i) => {
        const a0 = i * seg - seg / 2;
        const a1 = a0 + seg;
        const g = el('g', { class: 'cof-seg' + (label === cofSel ? ' is-sel' : '') });
        g.dataset.key = label;
        g.appendChild(el('path', { class: 'cof-seg__bg', d: arcPath(r1, r2, a0, a1) }));
        const mid = (r1 + r2) / 2;
        const am = a0 + seg / 2;
        const tx = cx + mid * Math.sin(am);
        const ty = cy - mid * Math.cos(am);
        g.appendChild(el('text', { class: 'cof-seg__txt' + (isMinor ? ' minor' : ''), x: tx, y: ty }, [txt(label)]));
        g.addEventListener('click', () => { cofSel = label; window.Progress.markToolUsed('circle'); renderCof(); });
        s.appendChild(g);
      });
    }

    ring(majors, rMid, rOuter, false);
    ring(minors, rInner, rMid, true);
    // center label
    s.appendChild(el('circle', { cx, cy, r: rInner, fill: '#1C1C1C', stroke: '#2E2E2E', 'stroke-width': 1 }));
    s.appendChild(el('text', {
      x: cx, y: cy - 6, fill: '#888580', 'font-size': 10, 'font-family': 'Inter, sans-serif',
      'text-anchor': 'middle', 'letter-spacing': '1.5'
    }, [txt('KEY')]));
    s.appendChild(el('text', {
      x: cx, y: cy + 12, fill: '#E8A838', 'font-size': 20, 'font-family': 'Bebas Neue, sans-serif',
      'text-anchor': 'middle', 'letter-spacing': '1'
    }, [txt(cofSel)]));
    return s;
  }

  function renderCofInfo() {
    const info = window.Theory.info(cofSel);
    const box = document.getElementById('cofInfo');
    box.innerHTML = `
      <div class="cof-info__key">
        <h4>${cofSel}${info.isMinor ? ' minor' : ' major'}</h4>
        <span class="cof-info__sig">${info.sigText}</span>
      </div>
      <div class="cof-info__chords-label">Diatonic chords</div>
      <div class="cof-chords">
        ${info.chords.map((c) => `<div class="cof-chord"><span class="cof-chord__num">${c.numeral}</span><span class="cof-chord__name">${c.name}</span></div>`).join('')}
      </div>`;
  }

  window.Tools = { render };
})();
