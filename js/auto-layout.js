(() => {
  const applySectionTitles = () => {
    document.querySelectorAll(".slides section").forEach((section) => {
      const h3 = section.querySelector(":scope > h3");
      if (!h3) return;
      if (h3.classList.contains("subtitle")) return;
      if (h3.closest(".title-box")) return;
      h3.classList.add("section-title");
    });
  };

  const applyGridHelpers = () => {
    document.querySelectorAll("[style*='grid-template-columns']").forEach((el) => {
      const style = el.getAttribute("style") || "";
      if (style.includes("grid-template-columns: 1fr 1fr 1fr")) {
        el.classList.add("grid-3");
      } else if (style.includes("grid-template-columns: 1fr 1fr")) {
        el.classList.add("grid-2");
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    applySectionTitles();
    applyGridHelpers();
  });
})();
