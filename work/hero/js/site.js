// Builds the creative galleries from data-kit JSON, runs the lightbox and scroll reveals.
(function () {
  var shots = [], idx = 0;
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  function show(i) { idx = (i + shots.length) % shots.length; lbImg.src = shots[idx].src; lbImg.alt = shots[idx].alt; lb.classList.add('on'); }
  lb.querySelector('.x').onclick = function () { lb.classList.remove('on'); };
  lb.querySelector('.p').onclick = function (e) { e.stopPropagation(); show(idx - 1); };
  lb.querySelector('.n').onclick = function (e) { e.stopPropagation(); show(idx + 1); };
  lb.onclick = function (e) { if (e.target === lb) lb.classList.remove('on'); };
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') lb.classList.remove('on');
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  document.querySelectorAll('[data-kit]').forEach(function (host) {
    var brand = host.getAttribute('data-kit');
    JSON.parse(host.querySelector('script').textContent).forEach(function (k) {
      var row = document.createElement('article');
      row.className = 'krow rv';
      var html = '<header><div><h3>' + k.t + '</h3><p>' + k.d + '</p></div><div class="acts">' +
        '<a class="btn fill" href="https://www.canva.com/d/' + k.canva + '" target="_blank" rel="noopener">View in Canva · p. ' + k.pages + ' ↗</a>' +
        '<a class="btn" href="assets/pdf/' + brand + '-' + k.dir + '.pdf" target="_blank" rel="noopener">PDF</a></div></header>' +
        '<div class="strip" style="--h:' + k.h + 'px">';
      for (var i = 1; i <= k.n; i++) {
        var src = 'assets/' + brand + '/' + k.dir + '/' + (i < 10 ? '0' : '') + i + '.jpg';
        html += '<button data-i="' + shots.length + '"><img loading="lazy" width="' + Math.round(k.h * k.ar) + '" height="' + k.h + '" style="aspect-ratio:' + k.ar + '" src="' + src + '" alt="' + k.t + ' ' + i + '"></button>';
        shots.push({ src: src, alt: k.t + ' ' + i });
      }
      row.innerHTML = html + '</div>';
      host.appendChild(row);
    });
  });
  document.querySelectorAll('.strip button').forEach(function (b) {
    b.onclick = function () { show(+b.getAttribute('data-i')); };
  });

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  document.querySelectorAll('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
})();
