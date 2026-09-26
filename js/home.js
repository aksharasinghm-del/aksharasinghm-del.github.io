// Renders the featured row, the project grid, the stats and the filters from window.PROJECTS.
(function () {
  var P = window.PROJECTS || [];
  var LABEL = { campaign: 'Campaign', brand: 'Brand strategy', social: 'Social media', crm: 'CRM & email' };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tags(p) { return p.type.map(function (t) { return LABEL[t] || t; }).join(' · '); }

  var feat = document.getElementById('featured');
  P.filter(function (p) { return p.featured; }).forEach(function (p) {
    var t = p.theme || {};
    var a = document.createElement('a');
    a.className = 'fc' + (t.font === 'sans' ? ' sans' : '');
    a.href = p.url;
    a.style.cssText = '--fbg:' + (t.bg || '#1B1B19') + ';--ffg:' + (t.fg || '#F5F2EC') + ';--fac:' + (t.accent || '#E9B872');
    a.innerHTML = '<div class="im"><img src="covers/' + esc(p.slug) + '.jpg" alt="' + esc(p.brand) + ': ' + esc(p.title) + '" loading="lazy" width="720" height="900"></div>' +
      '<div class="meta"><p class="tag">' + esc(p.brand) + ' · ' + esc(p.market) + '</p><h3>' + esc(p.title) + '</h3><p>' + esc(p.summary) + '</p><span class="go">Read the case study →</span></div>';
    feat.appendChild(a);
  });

  var grid = document.getElementById('grid');
  P.forEach(function (p) {
    var a = document.createElement('a');
    a.className = 'card';
    a.href = p.url;
    a.setAttribute('data-type', p.type.join(' '));
    a.innerHTML = '<div class="im"><img src="covers/' + esc(p.slug) + '.jpg" alt="' + esc(p.brand) + ': ' + esc(p.title) + '" loading="lazy" width="720" height="900"></div>' +
      '<p class="tag">' + esc(p.brand) + (p.market ? ' · ' + esc(p.market) : '') + '</p><h3>' + esc(p.title) + '</h3><p class="sum">' + esc(p.summary) + '</p><p class="type">' + esc(tags(p)) + '</p>';
    grid.appendChild(a);
  });

  var brands = P.length, markets = {};
  P.forEach(function (p) { (p.market || '').split(/[·+]/).forEach(function (m) { m = m.trim(); if (m && m !== 'Global') markets[m] = 1; }); });
  var st = document.getElementById('stats');
  if (st) st.innerHTML =
    '<div><b>' + brands + '</b><span>brand projects</span></div>' +
    '<div><b>' + Object.keys(markets).length + '</b><span>markets, plus global work</span></div>' +
    '<div><b>4</b><span>disciplines: campaigns, brand, social, CRM</span></div>' +
    '<div><b>100+</b><span>finished creative assets</span></div>';

  // show 6 projects first; the rest on request (and whenever a filter is used)
  var workSec = document.getElementById('work'), more = document.getElementById('moreBtn');
  grid.querySelectorAll('.card').forEach(function (c, i) { if (i >= 6) c.classList.add('extra'); });
  if (more) more.addEventListener('click', function () { workSec.classList.add('all'); more.setAttribute('aria-expanded', 'true'); });

  var btns = document.querySelectorAll('.filters button');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      workSec.classList.add('all');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      grid.querySelectorAll('.card').forEach(function (c) {
        c.hidden = !(f === 'all' || c.getAttribute('data-type').split(' ').indexOf(f) > -1);
      });
    });
  });
  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
