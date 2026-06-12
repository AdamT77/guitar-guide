/* ============================================================
   profile.js — avatar, stats, progress bars
   Exposes window.Profile.render(container)
   ============================================================ */
(function () {
  function fmtDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return iso; }
  }

  function render(container) {
    const P = window.Progress;
    const sections = window.Lessons.sections;
    const allDone = P.completed();

    const lessonsDone = allDone.length;
    const totalLessons = window.Lessons.totalCount;
    const sectionsUnlocked = sections.filter((s) =>
      s.lessons.some((l) => P.isDone(l.id))).length;
    const toolsUsed = P.toolsUsed().length;
    const streak = P.streak().count;

    container.innerHTML = `
      <div class="profile">
        <div class="profile__head">
          <div class="profile__avatar"><i class="ti ti-guitar-pick"></i></div>
          <div>
            <div class="profile__name">GUITARIST</div>
            <div class="profile__since">Member since ${fmtDate(P.memberSince())}</div>
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-card__num">${lessonsDone}<span class="muted" style="font-size:16px">/${totalLessons}</span></div>
            <div class="stat-card__label">Lessons done</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__num">${sectionsUnlocked}<span class="muted" style="font-size:16px">/${sections.length}</span></div>
            <div class="stat-card__label">Sections unlocked</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__num">${toolsUsed}<span class="muted" style="font-size:16px">/3</span></div>
            <div class="stat-card__label">Tools used</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__num"><span class="flame">\u{1F525}</span>${streak}</div>
            <div class="stat-card__label">Day streak</div>
          </div>
        </div>

        <div class="progress-block">
          <div class="progress-block__title">Progress by Section</div>
          ${sections.map((s) => {
            const done = s.lessons.filter((l) => P.isDone(l.id)).length;
            const total = s.lessons.length;
            const pct = Math.round((done / total) * 100);
            return `<div class="prog-row">
              <span class="prog-row__name">${s.name}</span>
              <span class="prog-row__track"><span class="prog-row__fill" data-pct="${pct}"></span></span>
              <span class="prog-row__count">${done}/${total} lessons</span>
            </div>`;
          }).join('')}
        </div>

        <div class="profile__reset">
          Practice data is stored locally on this device.
          <button id="resetBtn">Reset progress</button>
        </div>
      </div>`;

    // animate bars
    requestAnimationFrame(() => {
      container.querySelectorAll('.prog-row__fill').forEach((f) => {
        f.style.width = f.dataset.pct + '%';
      });
    });

    const reset = container.querySelector('#resetBtn');
    reset.addEventListener('click', () => {
      if (confirm('Reset all lesson progress, streak and tool history?')) {
        window.Progress.reset();
        render(container);
      }
    });
  }

  window.Profile = { render };
})();
