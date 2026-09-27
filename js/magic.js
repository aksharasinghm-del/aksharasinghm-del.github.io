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

  // price tags: flip to reveal the starting price
  document.querySelectorAll('.ptag').forEach(function (t) {
    t.addEventListener('click', function () {
      var open = t.classList.toggle('open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // folding sections: open on click, or when a menu link points at them
  function openFold(sec, on) {
    if (!sec || !sec.classList.contains('fold')) return;
    var open = on === undefined ? !sec.classList.contains('open') : on;
    sec.classList.toggle('open', open);
    var b = sec.querySelector('.fold-btn');
    if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  document.querySelectorAll('.fold-btn').forEach(function (b) {
    b.addEventListener('click', function () { openFold(b.closest('.fold')); });
  });
  function fromHash() {
    var id = location.hash.slice(1), el = id && document.getElementById(id);
    if (el) openFold(el.classList.contains('fold') ? el : el.closest('.fold'), true);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) openFold(el.classList.contains('fold') ? el : el.closest('.fold'), true);
    });
  });
  window.addEventListener('hashchange', fromHash);
  fromHash();

  // campaign tabs
  var tabs = document.querySelectorAll('.tabs [role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  // enquiry form: send without leaving the page, and pre-pick a package when a pricing link asks for one
  var enq = document.getElementById('enquire');
  if (enq) {
    var sel = document.getElementById('enqInterest'), status = enq.querySelector('.enq-status'), btn = enq.querySelector('button');
    document.querySelectorAll('[data-interest]').forEach(function (a) {
      a.addEventListener('click', function () { sel.value = a.getAttribute('data-interest'); });
    });
    enq.addEventListener('submit', function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      if (enq._honey.value) return;
      btn.disabled = true; status.className = 'enq-status'; status.textContent = 'Sending…';
      fetch(enq.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(enq)
      }).then(function (r) { return r.json().then(function (d) { if (!r.ok || String(d.success) === 'false') throw d; }); })
        .then(function () {
          enq.classList.add('sent'); status.className = 'enq-status ok';
          status.textContent = "Thank you, your enquiry is on its way. I'll reply within one working day.";
        })
        .catch(function () {
          btn.disabled = false; status.className = 'enq-status err';
          status.innerHTML = 'Something went wrong. Please email me at <a href="mailto:Akshara.singh.marketing@gmail.com">Akshara.singh.marketing@gmail.com</a>.';
        });
    });
    if (location.hash === '#enquiry-sent') { enq.classList.add('sent'); status.className = 'enq-status ok'; status.textContent = "Thank you, your enquiry is on its way. I'll reply within one working day."; }
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
  var watch = document.querySelectorAll('.proof, .results, .contact');
  if ('IntersectionObserver' in window && !reduce) {
    document.documentElement.classList.add('anim');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('seen');
        e.target.querySelectorAll('.circ, .pnum').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: .3 });
    watch.forEach(function (s) { io.observe(s); });
  }
})();
