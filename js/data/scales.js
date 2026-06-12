/* ============================================================
   scales.js — scale catalogue for the Scale Viewer
   Exposes window.Scales
   ============================================================ */
(function () {
  const TYPES = [
    { id: 'major', label: 'Major' },
    { id: 'natural minor', label: 'Natural Minor' },
    { id: 'pentatonic major', label: 'Pentatonic Major' },
    { id: 'pentatonic minor', label: 'Pentatonic Minor' },
    { id: 'blues', label: 'Blues' },
    { id: 'dorian', label: 'Dorian' },
    { id: 'phrygian', label: 'Phrygian' },
    { id: 'lydian', label: 'Lydian' },
    { id: 'mixolydian', label: 'Mixolydian' },
    { id: 'aeolian', label: 'Aeolian' },
    { id: 'locrian', label: 'Locrian' }
  ];

  const ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  window.Scales = {
    TYPES, ROOTS,
    formula: (type) => window.Music.SCALE_FORMULA_TEXT[type] || '',
    notes: (root, type) => window.Music.scaleNotes(root, type),
    fretboard: (root, type, frets) => window.Music.scaleFretboard(root, type, frets)
  };
})();
