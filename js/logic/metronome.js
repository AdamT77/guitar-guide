/* ============================================================
   metronome.js — Web Audio click with accented downbeat
   Exposes window.Metronome (event-driven)
   ============================================================ */
(function () {
  let ctx = null;
  let bpm = 120;
  let beatsPerBar = 4;
  let playing = false;
  let current = 0;          // beat index within bar
  let nextNoteTime = 0;
  let timer = null;
  const lookahead = 25;     // ms
  const scheduleAhead = 0.1; // s
  const listeners = { beat: [], state: [] };

  function emit(name, payload) {
    (listeners[name] || []).forEach((fn) => fn(payload));
  }

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
  }

  function click(time, accent) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    // Accented downbeat: higher pitch + louder
    osc.frequency.value = accent ? 1500 : 900;
    const peak = accent ? 0.5 : 0.28;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
    osc.start(time);
    osc.stop(time + 0.06);
  }

  function scheduler() {
    while (nextNoteTime < ctx.currentTime + scheduleAhead) {
      const beat = current;
      click(nextNoteTime, beat === 0);
      // Notify UI slightly in sync using setTimeout offset
      const delayMs = Math.max(0, (nextNoteTime - ctx.currentTime) * 1000);
      setTimeout(() => emit('beat', { beat, accent: beat === 0 }), delayMs);
      nextNoteTime += 60.0 / bpm;
      current = (current + 1) % beatsPerBar;
    }
  }

  function start() {
    if (playing) return;
    ensureCtx();
    playing = true;
    current = 0;
    nextNoteTime = ctx.currentTime + 0.06;
    timer = setInterval(scheduler, lookahead);
    emit('state', { playing: true });
  }

  function stop() {
    if (!playing) return;
    playing = false;
    clearInterval(timer);
    timer = null;
    emit('state', { playing: false });
  }

  window.Metronome = {
    toggle() { playing ? stop() : start(); },
    start, stop,
    isPlaying() { return playing; },
    setBpm(v) {
      bpm = Math.max(40, Math.min(240, v | 0));
      return bpm;
    },
    getBpm() { return bpm; },
    getBeats() { return beatsPerBar; },
    on(name, fn) {
      if (listeners[name]) listeners[name].push(fn);
    }
  };
})();
