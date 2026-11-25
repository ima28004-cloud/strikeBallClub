export function startAnalytics() {
  const counter = document
    .querySelector('meta[name="yandex-metrika-id"]')
    .content.trim();
  if (!/^[1-9][0-9]*$/.test(counter) || !/^https?:$/.test(location.protocol))
    return;
  window.ym =
    window.ym ||
    function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
  window.ym.l = Date.now();
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.append(script);
  window.ym(Number(counter), "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
}
