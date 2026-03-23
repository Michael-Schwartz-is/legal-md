(function () {
  'use strict';

  // Pre-process DOCX-exported Markdown before parsing
  function cleanMarkdown(md) {
    var lines = md.split('\n');
    var foundH1 = false;
    var result = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Strip tabs from headings (DOCX exports produce "# \t **Title**")
      line = line.replace(/^(#{1,6})\s*\t+\s*/, '$1 ');

      // Fix heading hierarchy: only first # stays as H1, demote the rest
      var headingMatch = line.match(/^(#{1,6})\s/);
      if (headingMatch && headingMatch[1] === '#') {
        if (foundH1) {
          line = '#' + line; // demote to H2
        } else {
          foundH1 = true;
        }
      }

      // Fix 4+ space indentation that creates code blocks from legal sub-clauses
      // Only fix lines that look like numbered items (not actual code)
      var indentMatch = line.match(/^(\s{4,})(\d+[\.\)])\s/);
      if (indentMatch) {
        line = '   ' + line.trimStart(); // reduce to 3 spaces (valid list nesting)
      }

      result.push(line);
    }

    return result.join('\n');
  }

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
            md = cleanMarkdown(md);
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
