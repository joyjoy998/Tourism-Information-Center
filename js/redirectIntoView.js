document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    const hash = window.location.hash; // 例如 #para
    const targetElement = document.querySelector(hash);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (document.querySelector(hash)) {
            document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
            observer.disconnect();
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
});
