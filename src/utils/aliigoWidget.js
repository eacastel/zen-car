// src/utils/aliigoWidget.js
export function injectAliigoWidget() {
  if (typeof window === "undefined") return;

  // Prevent duplicates (Gatsby can re-run on route changes)
  if (window.__ALIIGO_WIDGET_LOADED__) return;
  window.__ALIIGO_WIDGET_LOADED__ = true;

   try {
    var parentHost = window.location.hostname;
    var iframe = document.createElement('iframe');
    iframe.src='http://localhost:3000/en/chat?slug=zen-car-buying&brand=Zen%20Car%20Buying&key=220086e5b274cf3e57c0404c328a7dfa&theme=%7B%22headerBg%22%3A%22%23111827%20%23ffffff%22%2C%22headerText%22%3A%22%23ffffff%22%2C%22bubbleUser%22%3A%22%232563eb%20%23ffffff%22%2C%22bubbleBot%22%3A%22%23f3f4f6%20%23111827%22%2C%22sendBg%22%3A%22%232563eb%20%23ffffff%22%2C%22sendText%22%3A%22%23ffffff%22%7D&host=' + encodeURIComponent(parentHost);


     // --- HARDENED POSITIONING (works around transforms / weird stacking contexts) ---
    var mount = document.documentElement; // safer than body on some CMS themes
    iframe.style.position = 'fixed';
    iframe.style.bottom = '24px';
    iframe.style.right = '24px';
    iframe.style.width = '180px';
    iframe.style.height = '56px';
    iframe.style.border = '0';
    iframe.style.borderRadius = '9999px';
    iframe.style.overflow = 'hidden';
    iframe.style.background = 'transparent';
    iframe.style.zIndex = '2147483647'; // max-ish z-index to beat sticky headers
    iframe.style.pointerEvents = 'auto';
    iframe.style.display = 'block';

    // iOS safe-area support (prevents bottom UI overlap)
    iframe.style.bottom = 'calc(24px + env(safe-area-inset-bottom, 0px))';
    iframe.style.right  = 'calc(24px + env(safe-area-inset-right,  0px))';

    iframe.setAttribute('title','Aliigo Widget');
    iframe.setAttribute('scrolling','no');
    iframe.setAttribute('allow','clipboard-write');

    // Create a fixed-position wrapper to avoid parent CSS quirks on some sites
    var wrap = document.createElement('div');
    wrap.style.position = 'fixed';
    wrap.style.bottom = '0';
    wrap.style.right = '0';
    wrap.style.zIndex = '2147483647';
    wrap.style.pointerEvents = 'none'; // iframe will re-enable pointer events
    wrap.appendChild(iframe);

    // ensure iframe can be clicked
    iframe.style.pointerEvents = 'auto';

    mount.appendChild(wrap);

     window.addEventListener('message', function(ev){
      try {
        var d = ev.data;
        if (!d || d.type !== 'ALIIGO_WIDGET_SIZE') return;
        if (typeof d.w === 'number') iframe.style.width = d.w + 'px';
        if (typeof d.h === 'number') iframe.style.height = d.h + 'px';
        if (typeof d.radius === 'string') iframe.style.borderRadius = d.radius;
      } catch(e) {}
    });
  } catch(e) {}
}
