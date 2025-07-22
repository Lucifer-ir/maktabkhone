(async () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const links = Array.from(document.querySelectorAll('a[href*="/course/"]'))
    .map((a) => a.href)
    .filter((href, i, arr) => arr.indexOf(href) === i);

  const resultWindow = window.open('', '_blank');
  resultWindow.document.write('<h2>🎬 لینک‌ ویدیوها:</h2><ul style="font-family:monospace;">');

  for (let i = 0; i < links.length; i++) {
    try {
      const response = await fetch(links[i]);
      const text = await response.text();
      const tempDoc = new DOMParser().parseFromString(text, 'text/html');
      const src = tempDoc.querySelector('source.js-player__source')?.src;

      if (src) {
        resultWindow.document.write(`<li><a href="${src}" target="_blank">${src}</a></li>`);
      } else {
        resultWindow.document.write(`<li>⚠️ ویدیو یافت نشد در <a href="${links[i]}" target="_blank">${links[i]}</a></li>`);
      }

      await delay(1000);
    } catch (err) {
      resultWindow.document.write(`<li>⛔️ خطا در بارگذاری <a href="${links[i]}" target="_blank">${links[i]}</a></li>`);
    }
  }

  resultWindow.document.write('</ul><p>✅ تمام شد.</p>');
})();
