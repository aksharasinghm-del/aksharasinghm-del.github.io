// Renders the project carousel from window.PROJECTS and runs it: auto-rotates, pauses when
// someone is looking or interacting, and can be dragged, swiped, arrowed or paused.
(function () {
  var P = window.PROJECTS || [];
  var LABEL = { campaign: 'Campaign', brand: 'Brand strategy', social: 'Social media', crm: 'CRM & email' };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tags(p) { return p.type.map(function (t) { return LABEL[t] || t; }).join(' · '); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
  var car = document.getElementById('car'), track = document.getElementById('carTrack');
  if (!car || !track) return;

  // featured projects lead the carousel
  var list = P.filter(function (p) { return p.featured; }).concat(P.filter(function (p) { return !p.featured; }));
  list.forEach(function (p, i) {
    var a = document.createElement('a');
    a.className = 'slide' + (p.featured ? ' hero' : '');
    a.href = p.url;
    a.setAttribute('role', 'group');
    a.setAttribute('aria-roledescription', 'slide');
    a.setAttribute('aria-label', (i + 1) + ' of ' + list.length + ': ' + p.brand);
    a.innerHTML = '<div class="im"><img src="covers/' + esc(p.slug) + '.jpg" alt="' + esc(p.brand) + ': ' + esc(p.title) + '" loading="lazy" width="720" height="900" draggable="false">' +
      (p.featured ? '<span class="stk hand">hero project</span>' : '') + '</div>' +
      '<p class="tag">' + esc(p.brand) + (p.market ? ' · ' + esc(p.market) : '') + '</p><h3>' + esc(p.title) + '</h3><p class="sum">' + esc(p.summary) + '</p><p class="type">' + esc(tags(p)) + '</p>';
    track.appendChild(a);
  });
  var slides = track.querySelectorAll('.slide'), n = slides.length;
  document.getElementById('carAll').textContent = pad(n);
  var now = document.getElementById('carNow'), fill = document.getElementById('carFill');
  var play = document.getElementById('carPlay');

  function step() { return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth; }
  function index() { return Math.round(track.scrollLeft / step()); }
  function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }
  function go(i) {
    if (i < 0) i = n - 1;
    if (i >= n || (i > index() && atEnd())) i = 0;
    track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
  }
  function update() {
    var i = Math.min(n - 1, index());
    now.textContent = pad(i + 1);
    var max = track.scrollWidth - track.clientWidth;
    car.classList.toggle('at-end', atEnd());
    fill.style.width = (max > 0 ? 12 + 88 * track.scrollLeft / max : 100) + '%';
    slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
  }
  var raf;
  track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  update();

  document.getElementById('carPrev').addEventListener('click', function () { go(index() - 1); rest(); });
  document.getElementById('carNext').addEventListener('click', function () { go(index() + 1); rest(); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
  });

  // auto-rotate: off for reduced motion, paused by the button, on hover/focus, while dragging and off-screen
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paused = reduce, hold = 0, visible = false, timer, restUntil = 0;
  function setPaused(p) {
    paused = p; car.classList.toggle('paused', p);
    play.setAttribute('aria-label', p ? 'Play the carousel' : 'Pause the carousel');
  }
  function rest() { restUntil = Date.now() + 6000; }
  setPaused(paused);
  play.addEventListener('click', function () { setPaused(!paused); });
  timer = setInterval(function () {
    if (paused || hold || !visible || document.hidden || Date.now() < restUntil) return;
    go(index() + 1);
  }, 3200);
  car.addEventListener('mouseenter', function () { hold++; });
  car.addEventListener('mouseleave', function () { hold = Math.max(0, hold - 1); });
  car.addEventListener('focusin', function () { hold++; });
  car.addEventListener('focusout', function () { hold = Math.max(0, hold - 1); });
  track.addEventListener('touchstart', rest, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: .4 }).observe(track);
  } else visible = true;

  // mouse drag (touch already scrolls natively); a drag never opens a project
  var down = false, sx = 0, sl = 0, moved = false;
  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('dragging'); }
    if (moved) track.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', function () {
    if (!down) return; down = false;
    if (moved) { track.classList.remove('dragging'); go(index()); rest(); }
  });
  track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

  // a small "view case study" bubble follows the pointer over the slides (desktop only)
  var peek = document.getElementById('peek');
  if (peek && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
    track.addEventListener('pointermove', function (e) {
      peek.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      peek.classList.toggle('show', !!e.target.closest('.slide') && !track.classList.contains('dragging'));
    });
    track.addEventListener('pointerleave', function () { peek.classList.remove('show'); });
  }
})();
