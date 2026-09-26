// Small delights: drag objects around the desk, a desk-lamp glow, counting results,
// hand-drawn circles and a signature that writes itself. All skipped for reduced motion.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // desk lamp: a warm light that follows the pointer over the mat
  var mat = document.querySelector('.mat');
  if (mat && !reduce) {
    mat.addEventListener('pointermove', function (e) {
      var r = mat.getBoundingClientRect();
      mat.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      mat.style.setProperty('--my', (e.clientY - r.top) + 'px');
      mat.classList.add('lit');
    });
    mat.addEventListener('pointerleave', function () { mat.classList.remove('lit'); });
  }

  // pick things up: drag objects on the desk (desktop layout only); a click still opens them
  var desk = document.getElementById('desk');
  var wide = window.matchMedia('(min-width: 761px)');
  if (desk) {
    var top = 10;
    desk.querySelectorAll('.obj').forEach(function (o) {
      var sx, sy, ox, oy, moved = false, down = false;
      o.addEventListener('pointerdown', function (e) {
        if (!wide.matches || e.button !== 0) return;
        down = true; moved = false; sx = e.clientX; sy = e.clientY;
        ox = parseFloat(o.style.getPropertyValue('--x')); oy = parseFloat(o.style.getPropertyValue('--y'));
        o.setPointerCapture(e.pointerId);
      });
      o.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 6) return;
        if (!moved) { moved = true; o.classList.add('held'); o.style.zIndex = ++top; desk.classList.add('touched'); }
        var r = desk.getBoundingClientRect();
        var nx = Math.max(-4, Math.min(96, ox + dx / r.width * 100));
        var ny = Math.max(-4, Math.min(94, oy + dy / r.height * 100));
        o.style.setProperty('--x', nx + '%'); o.style.setProperty('--y', ny + '%');
      });
      function end() { if (!down) return; down = false; o.classList.remove('held'); }
      o.addEventListener('pointerup', end);
      o.addEventListener('pointercancel', end);
      o.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } });
      o.addEventListener('dragstart', function (e) { e.preventDefault(); });
    });
  }

  // results: count up and draw the circles when the section comes into view
  function countUp(el) {
    var txt = el.textContent.trim(), m = txt.match(/^([\d.]+)(.*)$/);
    if (!m) return;
    var end = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length, suf = m[2], t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = txt;
    }
    requestAnimationFrame(step);
  }
  var watch = document.querySelectorAll('.results, .contact');
  if ('IntersectionObserver' in window && !reduce) {
    document.documentElement.classList.add('anim');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('seen');
        e.target.querySelectorAll('.circ').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: .3 });
    watch.forEach(function (s) { io.observe(s); });
  }
})();
