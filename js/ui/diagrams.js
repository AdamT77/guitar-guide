/* ============================================================
   diagrams.js — SVG renderers for chords, scales, circle of fifths
   Exposes window.Diagrams
   ============================================================ */
(function () {
  const AMBER = '#E8A838';
  const CREAM = '#F2EDE4';
  const MUTED = '#888580';
  const STRING = '#3A3A3A';
  const FRET = '#2E2E2E';
  const INK = '#111111';

  function el(tag, attrs, children) {
    const ns = 'http://www.w3.org/2000/svg';
    const e = document.createElementNS(ns, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    (children || []).forEach((c) => e.appendChild(c));
    return e;
  }
  function svg(w, h) {
    return el('svg', { viewBox: '0 0 ' + w + ' ' + h, width: w, height: h, fill: 'none' });
  }

  /* ---------- Chord diagram ----------
     voicing: { frets:[6], fingers:[6], base } string6..string1
  */
  function chord(root, type) {
    const v = window.Chords.voicing(root, type);
    const W = 150, H = 190;
    const left = 28, right = W - 22, top = 38;
    const strings = 6, fretsShown = 5;
    const colW = (right - left) / (strings - 1);
    const rowH = 26;
    const s = svg(W, H);

    // determine starting fret window
    const fretted = v.frets.filter((f) => f > 0);
    const minFret = fretted.length ? Math.min(...fretted) : 1;
    const maxFret = fretted.length ? Math.max(...fretted) : 1;
    let startFret = 1;
    let showNut = true;
    if (maxFret > fretsShown) {
      startFret = minFret;
      showNut = false;
    }

    // nut or position label
    if (showNut) {
      s.appendChild(el('rect', { x: left - 1, y: top - 5, width: right - left + 2, height: 5, rx: 1, fill: CREAM }));
    } else {
      s.appendChild(el('text', {
        x: left - 10, y: top + rowH * 0.7, fill: MUTED, 'font-size': 11,
        'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'end'
      }, [txt(startFret + 'fr')]));
    }

    // fret lines
    for (let f = 0; f <= fretsShown; f++) {
      const y = top + f * rowH;
      s.appendChild(el('line', { x1: left, y1: y, x2: right, y2: y, stroke: FRET, 'stroke-width': 1 }));
    }
    // string lines
    for (let st = 0; st < strings; st++) {
      const x = left + st * colW;
      s.appendChild(el('line', { x1: x, y1: top, x2: x, y2: top + fretsShown * rowH, stroke: STRING, 'stroke-width': 1.2 }));
    }

    // markers above nut + dots
    v.frets.forEach((fret, idx) => {
      // idx 0 = string6 (low E) on the LEFT
      const x = left + idx * colW;
      if (fret === -1) {
        s.appendChild(el('text', { x: x, y: top - 12, fill: MUTED, 'font-size': 13, 'font-family': 'Inter, sans-serif', 'text-anchor': 'middle' }, [txt('\u00D7')]));
      } else if (fret === 0) {
        s.appendChild(el('circle', { cx: x, cy: top - 14, r: 4.5, stroke: CREAM, 'stroke-width': 1.4, fill: 'none' }));
      } else {
        const rel = fret - startFret + 1; // 1-based row
        const y = top + (rel - 0.5) * rowH;
        s.appendChild(el('circle', { cx: x, cy: y, r: 8.5, fill: AMBER }));
        const fng = v.fingers && v.fingers[idx];
        if (fng) {
          s.appendChild(el('text', { x: x, y: y + 0.5, fill: INK, 'font-size': 11, 'font-weight': 500, 'font-family': 'Inter, sans-serif', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, [txt(String(fng))]));
        }
      }
    });

    return s;
  }

  /* ---------- Scale fretboard ----------
     horizontal: 6 strings rows, frets columns 0..N
  */
  function scale(root, type, fretCount) {
    fretCount = fretCount || 12;
    const board = window.Music.scaleFretboard(root, type, fretCount);
    const padL = 26, padT = 16, padR = 12, padB = 22;
    const colW = 30, rowH = 22;
    const W = padL + colW * fretCount + padR;
    const H = padT + rowH * 5 + padB;
    const s = svg(W, H);

    // fret lines (vertical)
    for (let f = 0; f <= fretCount; f++) {
      const x = padL + f * colW;
      const isNut = f === 0;
      s.appendChild(el('line', { x1: x, y1: padT, x2: x, y2: padT + rowH * 5, stroke: isNut ? CREAM : FRET, 'stroke-width': isNut ? 2.5 : 1 }));
    }
    // string lines (horizontal) — row 0 = high E at top for readability
    for (let r = 0; r < 6; r++) {
      const y = padT + r * rowH;
      s.appendChild(el('line', { x1: padL, y1: y, x2: padL + colW * fretCount, y2: y, stroke: STRING, 'stroke-width': 1 }));
    }
    // inlay markers
    [3, 5, 7, 9, 12].forEach((f) => {
      if (f > fretCount) return;
      const x = padL + (f - 0.5) * colW;
      s.appendChild(el('text', { x: x, y: H - 7, fill: MUTED, 'font-size': 9, 'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle' }, [txt(String(f))]));
    });

    // board is string6(low E)..string1(high E); draw high E (string index5) on top
    for (let sIdx = 0; sIdx < 6; sIdx++) {
      const rowFromTop = 5 - sIdx; // string1 (idx5) -> row 0 top
      const y = padT + rowFromTop * rowH;
      board[sIdx].forEach((n) => {
        const x = padL + (n.fret === 0 ? 0 : (n.fret - 0.5) * colW + colW * 0.5);
        const cx = n.fret === 0 ? padL : padL + (n.fret - 0.5) * colW;
        const r = n.isRoot ? 8 : 6.5;
        s.appendChild(el('circle', {
          cx: cx, cy: y, r: r,
          fill: n.isRoot ? AMBER : CREAM,
          stroke: n.isRoot ? 'none' : FRET, 'stroke-width': 1
        }));
        s.appendChild(el('text', {
          x: cx, y: y + 0.5, fill: n.isRoot ? INK : INK,
          'font-size': 8, 'font-weight': 500, 'font-family': 'Inter, sans-serif',
          'text-anchor': 'middle', 'dominant-baseline': 'central'
        }, [txt(n.note)]));
      });
    }
    return s;
  }

  function txt(str) {
    return document.createTextNode(str);
  }

  window.Diagrams = { chord, scale, el, svg, txt, colors: { AMBER, CREAM, MUTED, STRING, FRET, INK } };
})();
