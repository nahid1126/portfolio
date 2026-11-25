// Screenshot filenames are generated from each project's folder, prefix, and count.
// Preview numbers are one-based; omit them to use the first two screenshots.
const projectGalleries = {
  tma: { prefix: "tma", count: 8 },
  smart_leaf: { count: 0 },
  employee_attendance: { count: 0 },
  cross_check: { count: 0 },
  akg_astha: { count: 0 },
  expense_tracker: {
    filenames: [
      "et1.png", "et2.png", "et3.png", "et4.png", "et5.png",
      "et1.1.png", "et2.2.png", "et3.3.png", "et4.4.png", "et5.5.png",
      "Screenshot_20261125_153532.png",
    ],
    preview: [2, 7],
  },
  warehouse_transfer: { prefix: "wt", count: 5, preview: [2, 3] },
  smart_cultivation: { count: 0 },
  leaf_support: { count: 0 },
  book_orbit: { prefix: "bo", count: 8, preview: [2, 6] },
};

function getProjectImages(projectId) {
  const config = projectGalleries[projectId];
  if (!config) return [];
  const filenames = config.filenames || Array.from({ length: config.count }, (_, index) =>
    `${config.prefix || ""}${index + 1}.${config.extension || "png"}`
  );
  return filenames.map((filename) => `image/${projectId}/${filename}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animated = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animated.forEach((element) => observer.observe(element));
  } else {
    animated.forEach((element) => element.classList.add("visible"));
  }

  const navbar = document.querySelector(".navbar");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = navLinks.map((link) => document.getElementById(link.hash.slice(1)));
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  function updateScrollState() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    let active = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= navbar.offsetHeight + 80) active = index;
    });
    navLinks.forEach((link, index) => {
      link.classList.toggle("active", index === active);
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  let scrollPending = false;
  function scheduleScrollUpdate() {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      updateScrollState();
      scrollPending = false;
    });
  }
  window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
  window.addEventListener("resize", scheduleScrollUpdate);
  updateScrollState();
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "instant" : "smooth" });
  });
  navLinks.forEach((link) => link.addEventListener("click", () => {
    const collapse = document.getElementById("navbarNav");
    if (collapse.classList.contains("show") && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }
  }));
  document.getElementById("current-year").textContent = new Date().getFullYear();

  const projectItems = [...document.querySelectorAll(".project-item")];
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCount = document.getElementById("projectCount");
  document.querySelector('[data-filter="all"] span').textContent = projectItems.length;
  projectCount.textContent = `${projectItems.length} projects`;
  document.getElementById("projectToolbar").hidden = false;
  filterButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let count = 0;
    projectItems.forEach((item) => {
      const matches = filter === "all" || item.dataset.category.split(" ").includes(filter);
      item.hidden = !matches;
      if (matches) count++;
    });
    filterButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    projectCount.textContent = `${count} ${count === 1 ? "project" : "projects"}`;
  }));

  // Bootstrap manages focus trapping, Escape, backdrop dismissal, and body scroll.
  const modalElement = document.getElementById("projectModal");
  const gallery = document.getElementById("modalImages");
  const title = document.getElementById("projectModalTitle");
  const status = document.getElementById("slideStatus");
  let images = [];
  let current = 0;
  let projectName = "";
  let trigger = null;
  let mainImage;
  let previous;
  let next;

  function updateSlide() {
    mainImage.src = images[current];
    mainImage.alt = `${projectName} screenshot ${current + 1} of ${images.length}`;
    previous.disabled = current === 0;
    next.disabled = current === images.length - 1;
    gallery.querySelectorAll(".thumbnail-button").forEach((button, index) => {
      button.classList.toggle("active", index === current);
      button.setAttribute("aria-pressed", String(index === current));
    });
    status.textContent = `${current + 1} / ${images.length}`;
  }
  function changeSlide(offset) {
    const target = current + offset;
    if (target < 0 || target >= images.length) return;
    const focused = document.activeElement;
    current = target;
    updateSlide();
    if (focused === previous && previous.disabled) next.focus();
    if (focused === next && next.disabled) previous.focus();
  }
  document.querySelectorAll(".project-card").forEach((card) => {
    const projectId = card.dataset.project;
    const sources = getProjectImages(projectId);
    const header = card.querySelector(".project-img");
    if (sources.length && header) {
      const preview = document.createElement("div");
      preview.className = "project-preview";
      preview.setAttribute("aria-hidden", "true");
      const previewNumbers = projectGalleries[projectId].preview || [1, 2];
      previewNumbers.forEach((number) => {
        const src = sources[number - 1];
        if (!src) return;
        const image = document.createElement("img");
        image.src = src;
        image.alt = "";
        image.loading = "lazy";
        image.width = 100;
        image.height = 200;
        preview.append(image);
      });
      if (preview.childElementCount) {
        header.querySelector("i")?.replaceWith(preview);
        header.classList.add("has-screenshots");
      }
    }
    const footer = document.createElement("div");
    footer.className = "project-footer";
    if (!sources.length) {
      footer.classList.add("small", "text-muted");
      footer.textContent = "Screenshots coming soon";
    } else {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "project-button";
      button.textContent = "View screenshots";
      button.setAttribute("aria-label", `View ${card.querySelector("h3").textContent} screenshots`);
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "projectModal");
      button.addEventListener("click", () => {
        if (!window.bootstrap) {
          // Screenshots remain reachable if the Bootstrap CDN is unavailable.
          window.location.assign(sources[0]);
          return;
        }
        trigger = button;
        images = sources;
        current = 0;
        projectName = card.querySelector("h3").textContent;
        title.textContent = `${projectName} screenshots`;
        gallery.replaceChildren();
        const slider = document.createElement("div");
        slider.className = "slider-container";
        previous = document.createElement("button");
        next = document.createElement("button");
        previous.type = next.type = "button";
        previous.textContent = "‹";
        next.textContent = "›";
        previous.setAttribute("aria-label", "Previous screenshot");
        next.setAttribute("aria-label", "Next screenshot");
        previous.addEventListener("click", () => changeSlide(-1));
        next.addEventListener("click", () => changeSlide(1));
        mainImage = document.createElement("img");
        mainImage.className = "slider-image";
        mainImage.addEventListener("error", () => {
          status.textContent = "This screenshot could not load. Try another image.";
        });
        slider.append(previous, mainImage, next);
        const thumbnails = document.createElement("div");
        thumbnails.className = "thumbnail-row";
        sources.forEach((src, index) => {
          const thumbnail = document.createElement("button");
          thumbnail.type = "button";
          thumbnail.className = "thumbnail-button";
          thumbnail.setAttribute("aria-label", `Show screenshot ${index + 1}`);
          const image = document.createElement("img");
          image.src = src;
          image.alt = "";
          image.loading = "lazy";
          thumbnail.append(image);
          thumbnail.addEventListener("click", () => { current = index; updateSlide(); });
          thumbnails.append(thumbnail);
        });
        gallery.append(slider, thumbnails);
        updateSlide();
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
      });
      footer.append(button);
    }
    card.querySelector(".project-content").append(footer);
  });
  modalElement.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changeSlide(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  modalElement.addEventListener("hidden.bs.modal", () => trigger?.focus());
});
