// Renders the project reel from window.PROJECTS and keeps it turning: a slow endless drift,
// paused on hover or focus, plus a "Spin the reel" button that spins fast and lands on a project.
(function () {
  var P = window.PROJECTS || [];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
  var reel = document.getElementById('reel'), track = document.getElementById('reelTrack');
  if (!reel || !track) return;
  var head = document.querySelector('.reel-head');
  var spinBtn = document.getElementById('reelSpin'), pauseBtn = document.getElementById('reelPause');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // featured projects lead; the set is drawn twice so the loop never shows a gap
  var list = P.filter(function (p) { return p.featured; }).concat(P.filter(function (p) { return !p.featured; }));
  function card(p, copy) {
    var a = document.createElement('a');
    a.className = 'rc';
    a.href = p.url;
    if (copy) { a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; }
    a.innerHTML = '<div class="im"><img src="covers/' + esc(p.slug) + '.jpg" alt="' + (copy ? '' : esc(p.brand) + ': ' + esc(p.title)) + '" loading="lazy" width="360" height="450" draggable="false">' +
      (p.featured ? '<span class="star" title="Hero project" aria-hidden="true">★</span>' : '') + '</div>' +
      '<p class="tag">' + esc(p.brand) + '</p><h3>' + esc(p.title) + '</h3>';
    return a;
  }
  list.forEach(function (p) { track.appendChild(card(p, false)); });
  if (!reduce) list.forEach(function (p) { track.appendChild(card(p, true)); });
  if (reduce) return; // the reel simply scrolls sideways instead

  var cards = track.children, n = list.length;
  var x = 0, speed = 38, cur = 0, paused = false, hold = 0, visible = true, spin = null, last = 0, restUntil = 0;
  function loopW() { return cards[n].offsetLeft - cards[0].offsetLeft; }

  function frame(t) {
    var dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t;
    var W = loopW();
    if (spin) {
      var k = Math.min(1, (t - spin.t0) / spin.dur), e = 1 - Math.pow(1 - k, 4);
      x = spin.from + spin.dist * e;
      if (k === 1) { land(spin.idx); spin = null; }
    } else {
      var want = paused || hold || !visible || t < restUntil ? 0 : speed;
      cur += (want - cur) * Math.min(1, dt * 5); // ease in and out of stops
      x += cur * dt;
    }
    if (W > 0) x = ((x % W) + W) % W;
    track.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  function clearWin() { reel.classList.remove('landed'); track.querySelectorAll('.win').forEach(function (c) { c.classList.remove('win'); }); }
  function land(i) {
    reel.classList.remove('spinning'); reel.classList.add('landed');
    cur = 0; restUntil = performance.now() + 3500; // hold still so the winner can be read
    cards[i].classList.add('win'); if (cards[i + n]) cards[i + n].classList.add('win');
    spinBtn.disabled = false;
    setTimeout(function () { if (!spin) clearWin(); }, 4000);
  }
  spinBtn.addEventListener('click', function () {
    if (spin) return;
    clearWin();
    var W = loopW(), mid = reel.clientWidth / 2;
    var idx = Math.floor(Math.random() * n);
    var cw = cards[0].offsetWidth;
    var target = cards[idx].offsetLeft - cards[0].offsetLeft + cw / 2 - mid; // centre that card under the pin
    var dist = ((target - x) % W + W) % W + W * 2;                          // at least two full turns
    spin = { from: x, dist: dist, t0: performance.now(), dur: 2600, idx: idx };
    spinBtn.disabled = true; reel.classList.add('spinning');
  });

  function setPaused(p) {
    paused = p; head.classList.toggle('paused', p);
    pauseBtn.setAttribute('aria-label', p ? 'Play the reel' : 'Pause the reel');
  }
  pauseBtn.addEventListener('click', function () { setPaused(!paused); });
  reel.addEventListener('mouseenter', function () { hold++; });
  reel.addEventListener('mouseleave', function () { hold = Math.max(0, hold - 1); });
  track.addEventListener('focusin', function (e) {
    hold++;
    // bring a keyboard-focused card fully into view
    var c = e.target.closest('.rc'); if (!c) return;
    var left = c.offsetLeft - cards[0].offsetLeft - x;
    if (left < 40 || left + c.offsetWidth > reel.clientWidth - 40) x = c.offsetLeft - cards[0].offsetLeft - 60;
    reel.querySelector('.reel-win').scrollLeft = 0;
  });
  track.addEventListener('focusout', function () { hold = Math.max(0, hold - 1); });
  track.addEventListener('touchstart', function () { hold++; setTimeout(function () { hold = Math.max(0, hold - 1); }, 2500); }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(reel);
  }
})();
