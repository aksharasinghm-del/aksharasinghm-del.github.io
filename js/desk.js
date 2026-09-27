// The desk: every object is a project (linked by slug from projects.js) or a page section.
// Positions are percentages of the desk (x, y, width) plus a rotation in degrees.
(function () {
  var ART = {
    sneaker: function (col, sole, lace, shine) {
      return '<svg viewBox="0 0 420 200"><path d="M26 150 Q22 182 58 186 L354 186 Q400 184 402 156 Q400 142 386 140 L44 140 Q28 142 26 150Z" fill="' + sole + '"/>' +
        '<path d="M30 164 L398 164" stroke="rgba(0,0,0,.12)" stroke-width="3"/>' +
        '<path d="M46 142 C34 108 42 66 80 54 C98 48 114 60 134 68 C152 74 168 66 186 56 C198 50 210 54 218 64 C244 88 282 98 322 106 C360 112 388 122 392 144Z" fill="' + col + '"/>' +
        '<path d="M80 54 C98 48 114 60 134 68 C116 80 94 80 82 70Z" fill="rgba(0,0,0,.35)"/>' +
        (shine ? '<path d="M250 96 q40 12 90 16" stroke="rgba(255,255,255,.35)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M70 90 q-8 20 -4 40" stroke="rgba(255,255,255,.25)" stroke-width="6" fill="none" stroke-linecap="round"/>' :
          '<path d="M46 142 C38 118 40 96 50 80 L62 84 C56 100 56 120 62 142Z" fill="rgba(0,0,0,.12)"/>') +
        [0, 1, 2, 3, 4].map(function (i) { var x = 196 + i * 16, y = 72 + i * 7; return '<path d="M' + x + ' ' + y + ' l22 -6" stroke="' + lace + '" stroke-width="5" stroke-linecap="round"/>'; }).join('') +
        '<path d="M204 66 q10 -24 32 -28 M204 66 q2 -22 -10 -34" stroke="' + lace + '" stroke-width="5" fill="none" stroke-linecap="round"/></svg>';
    },
    key: function () {
      return '<svg viewBox="0 0 300 130"><defs><linearGradient id="kg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9ECEF"/><stop offset=".5" stop-color="#9AA1A8"/><stop offset="1" stop-color="#6C737A"/></linearGradient></defs>' +
        '<path d="M22 30 H226 Q262 30 262 66 V112" stroke="url(#kg)" stroke-width="24" fill="none"/>' +
        '<path d="M22 22 H226" stroke="rgba(255,255,255,.6)" stroke-width="3"/>' +
        '<rect x="96" y="44" width="92" height="46" rx="6" fill="#FFDB00" transform="rotate(-6 142 67)"/><rect x="104" y="52" width="76" height="30" rx="4" fill="#0058A3" transform="rotate(-6 142 67)"/>' +
        '<text x="142" y="73" font-family="Noto Sans,Arial,sans-serif" font-weight="900" font-size="15" fill="#FFDB00" text-anchor="middle" transform="rotate(-6 142 67)">IKEA</text></svg>';
    },
    cup: function () {
      return '<svg viewBox="0 0 240 220"><circle cx="110" cy="112" r="100" fill="#F4F1EA"/><circle cx="110" cy="112" r="86" fill="none" stroke="#1D2B53" stroke-width="3" opacity=".5"/>' +
        '<rect x="160" y="100" width="62" height="26" rx="13" fill="#FBFAF7"/><circle cx="110" cy="112" r="66" fill="#FBFAF7"/><circle cx="110" cy="112" r="55" fill="#6B4226"/><circle cx="110" cy="112" r="48" fill="#8A5A36"/>' +
        '<path d="M110 136 C84 118 86 94 102 94 C108 94 110 100 110 104 C110 100 112 94 118 94 C134 94 136 118 110 136Z" fill="#F3E3CC"/>' +
        '<g class="steam" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M92 70 q-10 -16 0 -30 q10 -14 0 -30"/><path d="M112 66 q-10 -16 0 -30 q10 -14 0 -30"/><path d="M132 70 q-10 -16 0 -30 q10 -14 0 -30"/></g></svg>';
    },
    pass: function () {
      return '<svg viewBox="0 0 360 150"><rect width="360" height="150" rx="12" fill="#FFFFFF"/><path d="M0 12 A12 12 0 0 1 12 0 H270 V150 H12 A12 12 0 0 1 0 138Z" fill="#FFFFFF"/>' +
        '<path d="M12 0 H270 V40 H0 V12 A12 12 0 0 1 12 0Z" fill="#1B1F6B"/><text x="18" y="27" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="15" fill="#fff" letter-spacing="2">BOARDING PASS</text>' +
        '<text x="18" y="92" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="40" fill="#1B1F6B">DEL</text><text class="plane" x="118" y="88" font-size="26" fill="#1B1F6B">✈</text><text x="160" y="92" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="40" fill="#1B1F6B">BOM</text>' +
        '<text x="18" y="126" font-family="DM Sans,Arial,sans-serif" font-size="13" fill="#555">FLIGHT 6E 2134 · SEAT 14A</text>' +
        '<path d="M270 8 V142" stroke="#BBB" stroke-width="2" stroke-dasharray="5 5"/>' +
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { return '<rect x="' + (288 + i * 5) + '" y="36" width="' + (i % 3 ? 2 : 3.5) + '" height="80" fill="#222"/>'; }).join('') + '</svg>';
    },
    boat: function () {
      return '<svg viewBox="0 0 240 170"><path d="M14 96 L226 96 L186 150 L54 150Z" fill="#F7F3EA"/><path d="M14 96 L120 96 L54 150Z" fill="#E6DFD2"/>' +
        '<path d="M120 10 L180 96 L60 96Z" fill="#FFFDF8"/><path d="M120 10 L120 96 L60 96Z" fill="#EEE8DC"/><path d="M40 128 L200 128" stroke="rgba(0,0,0,.08)" stroke-width="2"/>' +
        '<path d="M70 110 q14 6 30 0" stroke="#5B8DB8" stroke-width="2.5" fill="none" opacity=".6"/></svg>';
    },
    plant: function () {
      var leaves = '';
      for (var i = 0; i < 9; i++) {
        var a = i * 40 + 8, c = i % 2 ? '#5E8C4A' : '#76A85A';
        leaves += '<g transform="rotate(' + a + ' 110 110)"><path d="M110 110 C98 80 100 40 110 6 C120 40 122 80 110 110Z" fill="' + c + '"/><path d="M110 108 L110 20" stroke="#C9D77A" stroke-width="2" opacity=".7"/></g>';
      }
      return '<svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="74" fill="#C96F4A"/><circle cx="110" cy="110" r="62" fill="#4A3526"/><g class="leaves">' + leaves + '</g></svg>';
    },
    tag: function () {
      return '<svg viewBox="0 0 160 250"><path d="M80 0 C60 10 110 30 80 44" stroke="#8C7B63" stroke-width="2.5" fill="none"/>' +
        '<path d="M20 40 H140 V236 Q140 246 130 246 H30 Q20 246 20 236Z" fill="#F2EDE4"/><circle cx="80" cy="60" r="7" fill="#2E5B4B"/>' +
        '<text x="80" y="118" font-family="Instrument Serif,Georgia,serif" font-style="italic" font-size="40" fill="#1B1B1B" text-anchor="middle">Still</text>' +
        '<text x="80" y="160" font-family="Instrument Serif,Georgia,serif" font-size="40" fill="#1B1B1B" text-anchor="middle">Zara.</text>' +
        '<g stroke="#1B1B1B" stroke-width="2" fill="none"><path d="M36 200 h20 l-3 14 h-14z"/><path d="M66 214 l10 -16 l10 16z"/><rect x="96" y="198" width="16" height="16"/><circle cx="104" cy="206" r="5"/></g></svg>';
    },
    phone: function () {
      return '<svg viewBox="0 0 150 300"><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B2143"/><stop offset="1" stop-color="#0E0E14"/></linearGradient></defs>' +
        '<rect width="150" height="300" rx="26" fill="#1A1A1C"/><rect x="7" y="7" width="136" height="286" rx="21" fill="url(#pg)"/><rect x="55" y="16" width="40" height="11" rx="6" fill="#000"/>' +
        '<text x="75" y="100" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="44" fill="#fff" text-anchor="middle">9:41</text>' +
        '<rect x="30" y="116" width="90" height="18" rx="9" fill="#C8F24B"/><text x="75" y="129" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="9.5" fill="#111" text-anchor="middle">Offline Mode is on</text>' +
        '<g class="notif"><rect x="16" y="160" width="118" height="40" rx="10" fill="rgba(255,255,255,.16)"/><circle cx="32" cy="180" r="8" fill="#C8F24B"/><text x="46" y="177" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="8.5" fill="#fff">1 notification held</text><text x="46" y="189" font-family="DM Sans,Arial,sans-serif" font-size="7.5" fill="rgba(255,255,255,.7)">until you\'re back</text></g></svg>';
    },
    lipstick: function () {
      return '<svg viewBox="0 0 300 80"><rect x="8" y="14" width="118" height="52" rx="6" fill="#161616"/><rect x="8" y="18" width="118" height="8" fill="rgba(255,255,255,.12)"/>' +
        '<rect x="126" y="18" width="84" height="44" fill="#C9A45C"/><rect x="126" y="22" width="84" height="7" fill="rgba(255,255,255,.35)"/><rect x="210" y="24" width="18" height="32" fill="#B08D48"/>' +
        '<g class="bullet"><path d="M228 26 H262 L292 40 L262 54 H228Z" fill="#B3122E"/><path d="M228 28 H262 L286 38" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none"/></g></svg>';
    },
    soap: function () {
      return '<svg viewBox="0 0 240 160"><rect x="10" y="20" width="220" height="124" rx="58" fill="#DDE3E8"/><rect x="24" y="32" width="192" height="100" rx="48" fill="#EEF2F5"/>' +
        '<text x="120" y="88" font-family="Instrument Serif,Georgia,serif" font-style="italic" font-size="22" fill="#9AA7B2" text-anchor="middle">shower thoughts</text>' +
        '<g class="bubbles" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="2"><circle cx="206" cy="16" r="10"/><circle cx="226" cy="36" r="6"/><circle cx="20" cy="146" r="7"/><circle cx="60" cy="10" r="5"/></g></svg>';
    },
    skincare: function () {
      return '<svg viewBox="0 0 240 230"><g transform="rotate(-24 80 150)"><rect x="20" y="118" width="160" height="56" rx="26" fill="#F2B593"/><rect x="176" y="126" width="30" height="40" rx="5" fill="#FFFFFF"/>' +
        '<text x="92" y="152" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="15" fill="#7A3E22" text-anchor="middle">goodness</text></g>' +
        '<rect x="150" y="70" width="64" height="118" rx="10" fill="#D7D4E6"/><rect x="156" y="104" width="52" height="64" rx="3" fill="#FFFFFF"/><text x="182" y="146" font-family="DM Sans,Arial,sans-serif" font-weight="700" font-size="19" fill="#111" text-anchor="middle">10%</text>' +
        '<g class="dropper"><rect x="166" y="36" width="32" height="36" rx="6" fill="#161616"/><rect x="176" y="10" width="12" height="30" rx="6" fill="#161616"/></g></svg>';
    },
    envelope: function () {
      return '<svg viewBox="0 0 300 190"><g class="letter"><rect x="30" y="-10" width="240" height="120" rx="3" fill="#FFFDF7"/><text x="150" y="30" font-family="Caveat,cursive" font-size="26" fill="#2F5E4E" text-anchor="middle">let\'s work together!</text></g><rect width="300" height="190" rx="6" fill="#F4EBD9"/><path d="M0 6 L150 108 L300 6" fill="none" stroke="#D9CBB0" stroke-width="3"/><path d="M0 190 L118 86 M300 190 L182 86" stroke="#E3D6BE" stroke-width="3"/>' +
        '<g class="wax"><circle cx="150" cy="108" r="24" fill="#B8322A"/><circle cx="150" cy="108" r="17" fill="none" stroke="#8E2019" stroke-width="2"/><text x="150" y="116" font-family="Instrument Serif,Georgia,serif" font-size="24" fill="#F4EBD9" text-anchor="middle">A</text></g></svg>';
    },
    pencil: function () {
      return '<svg viewBox="0 0 320 40"><rect x="40" y="8" width="230" height="24" fill="#F2B33D"/><rect x="40" y="8" width="230" height="8" fill="rgba(255,255,255,.3)"/><rect x="270" y="8" width="16" height="24" fill="#B9B9B9"/><rect x="286" y="8" width="26" height="24" rx="4" fill="#E88A8A"/>' +
        '<path d="M40 8 L6 20 L40 32Z" fill="#E8C9A0"/><path d="M16 16 L6 20 L16 24Z" fill="#333"/></svg>';
    }
  };

  // what sits on the desk, and where
  var DESK = [
    { slug: 'allbirds', anim: 'walk', art: ART.sneaker('#8E9189', '#F7F4EE', '#FAF7F2'), x: 2, y: 36, w: 17, r: -9, note: 'worn in, not worn out' },
    { slug: 'bata', anim: 'hop', art: ART.sneaker('#1D1D1F', '#2C2C2E', '#3A3A3C', true), x: 3, y: 68, w: 16, r: 7, note: 'your next step' },
    { slug: 'blue-tokai', anim: 'cup', art: ART.cup(), x: 4, y: 15, w: 9.5, r: 0, note: 'an inbox, one cup at a time' },
    { slug: 'indigo', anim: 'flutter', art: ART.pass(), x: 42, y: 3, w: 18, r: -4, note: 'say it before they ask' },
    { slug: 'ikea', anim: 'twist', art: ART.key(), x: 64, y: 5, w: 14, r: 10, note: 'home, for now' },
    { slug: 'ugaoo', anim: 'sway', art: ART.plant(), x: 84, y: 2, w: 12, r: 0, note: 'ugaoo bhidu' },
    { slug: 'paper-boat', anim: 'bob', art: ART.boat(), x: 85, y: 33, w: 10, r: -6, note: 'every generation had one' },
    { slug: 'mamaearth-minimalist', anim: 'drop', art: ART.skincare(), x: 71, y: 40, w: 10.5, r: 4, note: 'nature vs proof' },
    { slug: 'zara', anim: 'swing', art: ART.tag(), x: 89, y: 53, w: 6.5, r: 9, note: 'still zara' },
    { slug: 'loreal', anim: 'lip', art: ART.lipstick(), x: 59, y: 80, w: 13, r: -16, note: 'unrated' },
    { slug: 'dove', anim: 'soap', art: ART.soap(), x: 46, y: 82, w: 10, r: 5, note: 'shower thoughts' },
    { slug: 'apple', anim: 'buzz', art: ART.phone(), x: 35.5, y: 79, w: 5.6, r: 12, note: 'apple offline' },
    { href: '#contact', anim: 'mail', art: ART.envelope(), x: 76, y: 77, w: 13, r: -5, brand: 'Contact me', note: 'say hi' }
  ];

  var P = {};
  (window.PROJECTS || []).forEach(function (p) { P[p.slug] = p; });
  var desk = document.getElementById('desk');
  if (!desk) return;

  DESK.forEach(function (d) {
    var p = d.slug ? P[d.slug] : null;
    if (d.slug && !p) return;
    var a = document.createElement('a');
    a.className = 'obj' + (d.anim ? ' a-' + d.anim : '');
    a.href = p ? p.url : d.href;
    a.style.cssText = '--x:' + d.x + '%;--y:' + d.y + '%;--w:' + d.w + '%;--r:' + d.r + 'deg;--d:' + (Math.random() * -6).toFixed(2) + 's';
    a.setAttribute('aria-label', (p ? p.brand + ': ' + p.title : d.brand));
    a.innerHTML = '<span class="art">' + d.art + '</span><span class="lbl"><b>' + (p ? p.brand : d.brand) + '</b>' + d.note + '</span>';
    desk.appendChild(a);
  });
})();
