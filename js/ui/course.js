/* ============================================================
   course.js — sidebar + lesson reader
   Exposes window.Course.render(container)
   ============================================================ */
(function () {
  const sections = () => window.Lessons.sections;
  let current = { sec: 0, lesson: 0 };
  let openSec = 0;

  function load() {
    try {
      const v = JSON.parse(localStorage.getItem('fb_pos'));
      if (v && typeof v.sec === 'number') { current = v; openSec = v.sec; }
    } catch (e) {}
  }
  function save() {
    localStorage.setItem('fb_pos', JSON.stringify(current));
  }

  function render(container) {
    load();
    container.innerHTML = `
      <div class="course">
        <aside class="course__sidebar" id="courseSidebar"></aside>
        <div class="course__main"><div class="lesson" id="lessonView"></div></div>
      </div>`;
    renderSidebar();
    renderLesson();
  }

  function renderSidebar() {
    const sb = document.getElementById('courseSidebar');
    if (!sb) return;
    let html = '';
    sections().forEach((sec, si) => {
      const total = sec.lessons.length;
      const done = sec.lessons.filter((l) => window.Progress.isDone(l.id)).length;
      const active = si === current.sec;
      const open = si === openSec;
      html += `<div class="sidebar-sec ${active ? 'is-active' : ''} ${open ? 'is-open' : ''}" data-sec="${si}">
          <span class="sidebar-sec__chev"><i class="ti ti-chevron-right"></i></span>
          <span class="sidebar-sec__name">${sec.name}</span>
          <span class="sidebar-sec__count">${done}/${total}</span>
        </div>`;
      html += `<div class="sidebar-lessons" data-lessons="${si}" ${open ? '' : 'style="display:none"'}>`;
      sec.lessons.forEach((l, li) => {
        const isCur = si === current.sec && li === current.lesson;
        const isDone = window.Progress.isDone(l.id);
        html += `<div class="sidebar-lesson ${isCur ? 'is-current' : ''} ${isDone ? 'done' : ''}" data-sec="${si}" data-lesson="${li}">
            <span class="sidebar-lesson__tick">${isDone ? '<i class="ti ti-check"></i>' : ''}</span>
            <span>${l.title}</span>
          </div>`;
      });
      html += `</div>`;
    });
    sb.innerHTML = html;

    sb.querySelectorAll('.sidebar-sec').forEach((s) => {
      s.addEventListener('click', () => {
        const si = +s.dataset.sec;
        openSec = openSec === si ? -1 : si;
        renderSidebar();
      });
    });
    sb.querySelectorAll('.sidebar-lesson').forEach((l) => {
      l.addEventListener('click', () => {
        goTo(+l.dataset.sec, +l.dataset.lesson);
      });
    });
  }

  function goTo(si, li) {
    current = { sec: si, lesson: li };
    openSec = si;
    save();
    renderSidebar();
    transitionLesson();
  }

  function transitionLesson() {
    const view = document.getElementById('lessonView');
    if (!view) return renderLesson();
    view.classList.add('fade-out');
    setTimeout(() => {
      renderLesson();
      const v2 = document.getElementById('lessonView');
      if (v2) {
        v2.classList.add('fade-out');
        requestAnimationFrame(() => v2.classList.remove('fade-out'));
      }
    }, 150);
  }

  // expand [[scale:..]], [[chord:..]], [[tab:..]] tokens
  function expandBody(html) {
    // tab blocks first (may contain colons)
    html = html.replace(/\[\[tab:([\s\S]*?)\]\]/g, (m, body) =>
      `<div class="tab-block">${body.trim().replace(/</g, '&lt;')}</div>`);
    return html;
  }

  function injectDiagrams(root) {
    // find placeholder spans we created and replace with svg
    root.querySelectorAll('[data-diagram]').forEach((slot) => {
      const [kind, r, t] = slot.dataset.diagram.split('|');
      const fig = document.createElement('div');
      fig.className = 'lesson__figure';
      let node, cap;
      if (kind === 'scale') {
        node = window.Diagrams.scale(r, t, 12);
        cap = `${r} ${t} \u2014 amber = root`;
      } else {
        node = window.Diagrams.chord(r, t);
        cap = `${r}${window.Chords.TYPE_LABEL[t] || t} \u2014 ${window.Music.chordNotes(r, t).join(' ')}`;
      }
      fig.appendChild(node);
      const c = document.createElement('div');
      c.className = 'lesson__figcaption';
      c.textContent = cap;
      fig.appendChild(c);
      slot.replaceWith(fig);
    });
  }

  function renderLesson() {
    const sec = sections()[current.sec];
    const lesson = sec.lessons[current.lesson];
    const view = document.getElementById('lessonView');
    if (!view) return;

    // body with diagram placeholders
    let body = lesson.body
      .replace(/\[\[(scale|chord):([^:]+):([^\]]+)\]\]/g,
        (m, kind, r, t) => `<div data-diagram="${kind}|${r}|${t}"></div>`);
    body = expandBody(body);

    let takeaways = '';
    if (lesson.takeaways && lesson.takeaways.length) {
      takeaways = `<div class="takeaways"><div class="takeaways__title">Key Takeaways</div><ul>${
        lesson.takeaways.map((t) => `<li>${t}</li>`).join('')}</ul></div>`;
    }

    const isDone = window.Progress.isDone(lesson.id);
    const total = sec.lessons.length;
    let dots = '';
    for (let i = 0; i < total; i++) {
      const cls = i < current.lesson ? 'done' : (i === current.lesson ? 'current' : '');
      dots += `<span class="lesson__dot ${cls}"></span>`;
    }

    const flat = window.Lessons.allLessons();
    const flatIdx = flat.findIndex((l) => l.id === lesson.id);
    const hasPrev = flatIdx > 0;
    const hasNext = flatIdx < flat.length - 1;

    view.innerHTML = `
      <div class="lesson__eyebrow eyebrow">${lesson.eyebrow}</div>
      <h1 class="lesson__title">${lesson.title}</h1>
      <div class="lesson__divider"></div>
      <div class="lesson__body">${body}</div>
      ${takeaways}
      <div style="display:flex;justify-content:flex-end;margin-top:24px">
        <button class="mark-done ${isDone ? 'is-done' : ''}" id="markDone">
          <i class="ti ti-${isDone ? 'circle-check-filled' : 'circle-check'}"></i>
          ${isDone ? 'Completed' : 'Mark complete'}
        </button>
      </div>
      <div class="lesson__footer">
        <button class="btn-ghost" id="prevBtn" ${hasPrev ? '' : 'disabled'}>
          <i class="ti ti-arrow-left"></i> Prev
        </button>
        <div class="lesson__dots">${dots}</div>
        <button class="btn-ghost" id="nextBtn" ${hasNext ? '' : 'disabled'}>
          Next <i class="ti ti-arrow-right"></i>
        </button>
      </div>`;

    injectDiagrams(view);

    view.querySelector('#markDone').addEventListener('click', () => {
      window.Progress.toggleDone(lesson.id);
      renderLesson();
      renderSidebar();
    });
    const prev = view.querySelector('#prevBtn');
    const next = view.querySelector('#nextBtn');
    if (hasPrev) prev.addEventListener('click', () => jumpFlat(flatIdx - 1));
    if (hasNext) next.addEventListener('click', () => jumpFlat(flatIdx + 1));

    // scroll content area to top
    const area = document.querySelector('.content-area');
    if (area) area.scrollTop = 0;
  }

  function jumpFlat(idx) {
    const flat = window.Lessons.allLessons();
    const l = flat[idx];
    const si = sections().findIndex((s) => s.id === l.sectionId);
    goTo(si, l.index);
  }

  window.Course = { render };
})();
