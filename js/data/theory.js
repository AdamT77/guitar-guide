/* ============================================================
   theory.js — Circle of Fifths data + diatonic chord sets
   Exposes window.Theory
   ============================================================ */
(function () {
  // Outer ring (major) clockwise from C; inner ring = relative minor
  const MAJORS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
  const MINORS = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];

  // Key signatures: positive = sharps, negative = flats
  const SIG = {
    C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, 'F#': 6, Db: -5, Ab: -4, Eb: -3, Bb: -2, F: -1
  };
  const MINOR_SIG = {
    Am: 0, Em: 1, Bm: 2, 'F#m': 3, 'C#m': 4, 'G#m': 5, 'D#m': 6,
    Bbm: -5, Fm: -4, Cm: -3, Gm: -2, Dm: -1
  };

  const SHARP_ORDER = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'];
  const FLAT_ORDER = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];

  function sigText(count) {
    if (count === 0) return 'No sharps or flats';
    if (count > 0) {
      const list = SHARP_ORDER.slice(0, count).join(' ');
      return count + (count === 1 ? ' sharp' : ' sharps') + ' (' + list + ')';
    }
    const n = -count;
    const list = FLAT_ORDER.slice(0, n).join(' ');
    return n + (n === 1 ? ' flat' : ' flats') + ' (' + list + ')';
  }

  // Roman numerals for major key diatonic triads
  const MAJ_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00B0'];
  const MIN_NUMERALS = ['i', 'ii\u00B0', 'III', 'iv', 'v', 'VI', 'VII'];
  const MAJ_QUALITIES = ['', 'm', 'm', '', '', 'm', 'dim'];
  const MIN_QUALITIES = ['m', 'dim', '', 'm', 'm', '', ''];

  function diatonic(root, isMinor) {
    const type = isMinor ? 'natural minor' : 'major';
    const notes = window.Music.scaleNotes(root.replace('m', ''), type);
    const nums = isMinor ? MIN_NUMERALS : MAJ_NUMERALS;
    const quals = isMinor ? MIN_QUALITIES : MAJ_QUALITIES;
    return notes.map((n, i) => ({
      numeral: nums[i],
      name: n + quals[i]
    }));
  }

  function info(label) {
    const isMinor = label.endsWith('m');
    const sig = isMinor ? MINOR_SIG[label] : SIG[label];
    return {
      label,
      isMinor,
      sig,
      sigText: sigText(sig || 0),
      chords: diatonic(label, isMinor)
    };
  }

  window.Theory = { MAJORS, MINORS, SIG, MINOR_SIG, info, sigText };
})();
