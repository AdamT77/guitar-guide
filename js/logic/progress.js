/* ============================================================
   progress.js — localStorage persistence + streak tracking
   Exposes window.Progress
   ============================================================ */
(function () {
  const K = {
    completed: 'fb_completed',
    streak: 'fb_streak',
    tools: 'fb_tools_used',
    since: 'fb_member_since'
  };

  function read(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }
  function daysBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  // Initialise member-since + touch streak on first call each session
  function init() {
    if (!localStorage.getItem(K.since)) {
      write(K.since, today());
    }
    touchStreak();
  }

  function touchStreak() {
    const s = read(K.streak, null);
    const t = today();
    if (!s) {
      write(K.streak, { lastDate: t, count: 1 });
      return;
    }
    if (s.lastDate === t) return; // already counted today
    const gap = daysBetween(s.lastDate, t);
    if (gap === 1) {
      write(K.streak, { lastDate: t, count: s.count + 1 });
    } else {
      write(K.streak, { lastDate: t, count: 1 });
    }
  }

  window.Progress = {
    init,
    isDone(id) {
      return read(K.completed, []).indexOf(id) >= 0;
    },
    completed() {
      return read(K.completed, []);
    },
    setDone(id, done) {
      const list = read(K.completed, []);
      const i = list.indexOf(id);
      if (done && i < 0) list.push(id);
      if (!done && i >= 0) list.splice(i, 1);
      write(K.completed, list);
      return list;
    },
    toggleDone(id) {
      return this.setDone(id, !this.isDone(id));
    },
    countInSection(sectionId, lessons) {
      const list = read(K.completed, []);
      return lessons.filter((l) => list.indexOf(l.id) >= 0).length;
    },
    markToolUsed(name) {
      const list = read(K.tools, []);
      if (list.indexOf(name) < 0) {
        list.push(name);
        write(K.tools, list);
      }
      return list;
    },
    toolsUsed() {
      return read(K.tools, []);
    },
    streak() {
      return read(K.streak, { lastDate: today(), count: 1 });
    },
    memberSince() {
      return read(K.since, today());
    },
    reset() {
      Object.values(K).forEach((k) => localStorage.removeItem(k));
      init();
    }
  };
})();
