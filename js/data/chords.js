/* ============================================================
   chords.js — real, playable guitar voicings
   Curated open chords + movable barre templates (E/A shape)
   Exposes window.Chords.voicing(root, type) -> {frets, fingers, base}
   frets/fingers arrays are string6..string1 (low E .. high E)
   value -1 = muted, 0 = open, n = fret
   ============================================================ */
(function () {
  const M = window.Music;

  const ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const TYPES = ['maj', 'min', '7', 'maj7', 'min7', 'dim', 'aug', 'sus2', 'sus4'];

  const TYPE_LABEL = {
    maj: 'maj', min: 'min', '7': '7', maj7: 'maj7', min7: 'min7',
    dim: 'dim', aug: 'aug', sus2: 'sus2', sus4: 'sus4'
  };

  // --- Curated open voicings (familiar shapes) ---
  // key = root + type
  const OPEN = {
    'Cmaj':  { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
    'Dmaj':  { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
    'Emaj':  { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    'Gmaj':  { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
    'Amaj':  { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },

    'Amin':  { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    'Emin':  { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
    'Dmin':  { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },

    'A7':    { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
    'D7':    { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 3, 1, 2] },
    'E7':    { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
    'G7':    { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
    'C7':    { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
    'B7':    { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] },

    'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
    'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 1, 1] },
    'Fmaj7': { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0] },
    'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1] },
    'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0] },
    'Emaj7': { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0] },

    'Em7':   { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0] },
    'Am7':   { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] },
    'Dm7':   { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1] },

    'Asus2': { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] },
    'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0] },
    'Esus4': { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0] },
    'Asus4': { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0] },
    'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4] }
  };

  // --- Movable templates. Offsets relative to barre/root fret. ---
  // E-shape: root on 6th string (index 0). A-shape: root on 5th string (index 1).
  const E_SHAPE = {
    maj:  { off: [0, 2, 2, 1, 0, 0], fingers: [1, 3, 4, 2, 1, 1] },
    min:  { off: [0, 2, 2, 0, 0, 0], fingers: [1, 3, 4, 1, 1, 1] },
    '7':  { off: [0, 2, 0, 1, 0, 0], fingers: [1, 3, 1, 2, 1, 1] },
    maj7: { off: [0, 2, 1, 1, 0, 0], fingers: [1, 3, 2, 1, 1, 1] },
    min7: { off: [0, 2, 0, 0, 0, 0], fingers: [1, 3, 1, 1, 1, 1] },
    sus4: { off: [0, 2, 2, 2, 0, 0], fingers: [1, 2, 3, 4, 1, 1] }
  };
  const A_SHAPE = {
    maj:  { off: [-1, 0, 2, 2, 2, 0], fingers: [0, 1, 3, 3, 3, 1] },
    min:  { off: [-1, 0, 2, 2, 1, 0], fingers: [0, 1, 3, 4, 2, 1] },
    '7':  { off: [-1, 0, 2, 0, 2, 0], fingers: [0, 1, 3, 1, 4, 1] },
    maj7: { off: [-1, 0, 2, 1, 2, 0], fingers: [0, 1, 3, 2, 4, 1] },
    min7: { off: [-1, 0, 2, 0, 1, 0], fingers: [0, 1, 3, 1, 2, 1] },
    sus2: { off: [-1, 0, 2, 2, 0, 0], fingers: [0, 1, 3, 4, 1, 1] },
    sus4: { off: [-1, 0, 2, 2, 3, 0], fingers: [0, 1, 2, 3, 4, 1] },
    dim:  { off: [-1, 0, 1, 2, 1, -1], fingers: [0, 1, 2, 4, 3, 0] },
    aug:  { off: [-1, 0, 3, 2, 2, 1], fingers: [0, 1, 4, 2, 3, 1] }
  };

  function buildFromTemplate(rootStringIdx, rootPc, tpl) {
    // root fret on that string
    const open = M.TUNING[rootStringIdx];
    let barre = ((rootPc - open) % 12 + 12) % 12;
    if (barre === 0) barre = 12; // avoid open-position collision for movable
    // keep within playable range
    if (barre > 11) barre -= 12;
    if (barre < 1) barre += 12;
    const frets = tpl.off.map((o) => (o < 0 ? -1 : o + barre));
    return { frets, fingers: tpl.fingers.slice(), base: barre };
  }

  function voicing(root, type) {
    const key = root + type;
    if (OPEN[key]) {
      return Object.assign({ base: 0 }, OPEN[key]);
    }
    const rootPc = M.pcIndex(root);
    let tpl, stringIdx;
    if (type === 'dim' || type === 'aug') {
      tpl = A_SHAPE[type]; stringIdx = 1;
    } else if (type === 'sus2') {
      tpl = A_SHAPE.sus2; stringIdx = 1;
    } else {
      // choose E-shape vs A-shape by lowest barre
      const eShape = E_SHAPE[type];
      const aShape = A_SHAPE[type];
      const eBarre = (((rootPc - M.TUNING[0]) % 12) + 12) % 12 || 12;
      const aBarre = (((rootPc - M.TUNING[1]) % 12) + 12) % 12 || 12;
      if (eShape && (eBarre <= aBarre || !aShape)) { tpl = eShape; stringIdx = 0; }
      else { tpl = aShape; stringIdx = 1; }
    }
    return buildFromTemplate(stringIdx, rootPc, tpl);
  }

  window.Chords = { ROOTS, TYPES, TYPE_LABEL, voicing, notes: (r, t) => M.chordNotes(r, t) };
})();
