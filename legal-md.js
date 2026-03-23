(function () {
  'use strict';

  function renderAllTargets() {
    document.querySelectorAll('[data-md-content]').forEach(function (el) {
      var src = el.getAttribute('data-md-content');
      if (!src) return;

      fetch(src)
        .then(function (res) {
          if (!res.ok) return null;
          return res.text();
        })
        .then(function (md) {
          if (md) {
            el.innerHTML = marked.parse(md);
            el.querySelectorAll('a').forEach(function (a) {
              a.setAttribute('target', '_blank');
              a.setAttribute('rel', 'noopener noreferrer');
            });
          }
        })
        .catch(function () {});
    });
  }

  if (typeof marked !== 'undefined') {
    marked.use({ gfm: true, breaks: false });
    renderAllTargets();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof marked !== 'undefined') {
        marked.use({ gfm: true, breaks: false });
        renderAllTargets();
      }
    });
  }
})();
