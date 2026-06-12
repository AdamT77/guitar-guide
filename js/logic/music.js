/* ============================================================
   music.js — core music theory engine (correct by construction)
   Exposes window.Music
   ============================================================ */
(function () {
  // Chromatic scale with sharp spelling (index 0 = C)
  const SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  // Standard tuning, low(6th) -> high(1st). MIDI-ish pitch class index.
  // E A D G B E  => semitone indices from C
  const TUNING = [4, 9, 2, 7, 11, 4]; // string 6..1 (low E ... high E)

  function pcIndex(note) {
    let i = SHARP.indexOf(note);
    if (i >= 0) return i;
    i = FLAT.indexOf(note);
    return i;
  }

  function noteName(pc, useFlats) {
    pc = ((pc % 12) + 12) % 12;
    return useFlats ? FLAT[pc] : SHARP[pc];
  }

  // Scale formulas as semitone steps between consecutive notes
  const SCALE_STEPS = {
    major:            [2, 2, 1, 2, 2, 2, 1],
    'natural minor':  [2, 1, 2, 2, 1, 2, 2],
    'pentatonic major': [2, 2, 3, 2, 3],
    'pentatonic minor': [3, 2, 2, 3, 2],
    blues:            [3, 2, 1, 1, 3, 2],
    dorian:           [2, 1, 2, 2, 2, 1, 2],
    phrygian:         [1, 2, 2, 2, 1, 2, 2],
    lydian:           [2, 2, 2, 1, 2, 2, 1],
    mixolydian:       [2, 2, 1, 2, 2, 1, 2],
    aeolian:          [2, 1, 2, 2, 1, 2, 2],
    locrian:          [1, 2, 2, 1, 2, 2, 2],
    ionian:           [2, 2, 1, 2, 2, 2, 1]
  };

  const SCALE_FORMULA_TEXT = {
    major: 'W – W – H – W – W – W – H',
    'natural minor': 'W – H – W – W – H – W – W',
    'pentatonic major': 'W – W – m3 – W – m3',
    'pentatonic minor': 'm3 – W – W – m3 – W',
    blues: 'm3 – W – H – H – m3 – W',
    dorian: 'W – H – W – W – W – H – W',
    phrygian: 'H – W – W – W – H – W – W',
    lydian: 'W – W – W – H – W – W – H',
    mixolydian: 'W – W – H – W – W – H – W',
    aeolian: 'W – H – W – W – H – W – W',
    locrian: 'H – W – W – H – W – W – W'
  };

  // Keys that conventionally use flats
  const FLAT_KEYS = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Dm', 'Gm', 'Cm', 'Fm', 'Bbm', 'Ebm'];

  function usesFlats(root) {
    return FLAT_KEYS.indexOf(root) >= 0 || root.indexOf('b') >= 0;
  }

  // Build absolute pitch classes for a scale
  function scalePCs(root, type) {
    const steps = SCALE_STEPS[type] || SCALE_STEPS.major;
    const start = pcIndex(root);
    const out = [start];
    let cur = start;
    for (let i = 0; i < steps.length - 1; i++) {
      cur += steps[i];
      out.push(cur % 12);
    }
    return out;
  }

  function scaleNotes(root, type) {
    const flats = usesFlats(root);
    return scalePCs(root, type).map((pc) => noteName(pc, flats));
  }

  // Chord interval recipes (semitones from root)
  const CHORD_INTERVALS = {
    maj:  [0, 4, 7],
    min:  [0, 3, 7],
    dim:  [0, 3, 6],
    aug:  [0, 4, 8],
    '7':  [0, 4, 7, 10],
    maj7: [0, 4, 7, 11],
    min7: [0, 3, 7, 10],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7]
  };

  function chordNotes(root, type) {
    const ivals = CHORD_INTERVALS[type] || CHORD_INTERVALS.maj;
    const start = pcIndex(root);
    const flats = usesFlats(root);
    return ivals.map((iv) => noteName(start + iv, flats));
  }

  // Note at a given string/fret. string: 0=low E (6th) .. 5=high E (1st)
  function noteAt(stringIdx, fret, useFlats) {
    return noteName(TUNING[stringIdx] + fret, useFlats);
  }

  // For a scale, return fretboard map: for each string, list {fret, note, isRoot}
  function scaleFretboard(root, type, frets) {
    frets = frets || 12;
    const pcs = scalePCs(root, type);
    const rootPc = pcIndex(root);
    const flats = usesFlats(root);
    const board = [];
    for (let s = 0; s < 6; s++) {
      const row = [];
      for (let f = 0; f <= frets; f++) {
        const pc = (TUNING[s] + f) % 12;
        if (pcs.indexOf(pc) >= 0) {
          row.push({ fret: f, note: noteName(pc, flats), isRoot: pc === rootPc });
        }
      }
      board.push(row);
    }
    return board;
  }

  window.Music = {
    SHARP, FLAT, TUNING,
    pcIndex, noteName, usesFlats,
    scalePCs, scaleNotes, chordNotes, noteAt, scaleFretboard,
    SCALE_STEPS, SCALE_FORMULA_TEXT, CHORD_INTERVALS
  };
})();
