document.addEventListener("DOMContentLoaded", function () {
  // Scroll animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });
  // ... existing code scrollTopBtn...
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  // ... existing code ...
  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.padding = "15px 0";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)";
    }
  });
  // navbar close automatically when a nav-item is clicked in mobile view
  document.querySelectorAll(".nav-item .nav-link").forEach(function (navLink) {
    navLink.addEventListener("click", function () {
      var navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        // Bootstrap collapse
        var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
  // Auto update copyright year
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  const defaultProjectImages = [
    'image/nahid.jpg',
    'image/nahid2.jpg',
    'image/p1.png',
    'image/p2.png',
    'image/p3.png',
  ];

  const projectCardImages = [
    ['image/p1.png', 'image/p2.png'],
    ['image/p2.png', 'image/p3.png'],
    ['image/p3.png', 'image/p4.png'],
    ['image/p4.png', 'image/p5.png'],
    ['image/p5.png', 'image/p6.png'],
    ['image/p6.png', 'image/p7.png'],
    ['image/p1.png', 'image/p4.png'],
    ['image/p2.png', 'image/p5.png'],
    ['image/nahid.jpg', 'image/nahid2.jpg'],
  ];

  document.querySelectorAll('.project-card').forEach((card, index) => {
    if (!card.dataset.images) {
      card.dataset.images = projectCardImages[index]
        ? projectCardImages[index].join(',')
        : defaultProjectImages.join(',');
    }

    const projectContent = card.querySelector('.project-content');
    if (projectContent && !projectContent.querySelector('.project-footer')) {
      const footer = document.createElement('div');
      footer.className = 'project-footer';
      footer.innerHTML =
        '<button type="button" class="project-button">View Screenshots</button>';
      projectContent.appendChild(footer);
    }

    card.addEventListener('click', () => {
      const imageList = card.dataset.images
        ? card.dataset.images.split(',').map((src) => src.trim())
        : defaultProjectImages;
      showProjectImages(imageList);
    });
  });
});

// ... existing code pop up project image slider...
let currentSlide = 0;
let sliderImages = [];
function showProjectImages(images) {
  sliderImages = images;
  currentSlide = 0;
  renderSliderImages();
  const modal = document.getElementById("projectModal");
  modal.style.display = "flex";
  modal.classList.add("show");
}
function renderSliderImages() {
  const modalImages = document.getElementById("modalImages");
  const activeImage = sliderImages[currentSlide] || "";
  modalImages.innerHTML = `
    <div class="slider-container">
      <button id="prevSlide" ${currentSlide === 0 ? "disabled" : ""} aria-label="Previous image">
        <i class="fas fa-chevron-left"></i>
      </button>
      <img src="${activeImage}" alt="Project screenshot" class="slider-image" />
      <button id="nextSlide" ${currentSlide === sliderImages.length - 1 ? "disabled" : ""} aria-label="Next image">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="thumbnail-row">
      ${sliderImages
        .map(
          (src, index) =>
            `<img src="${src}" alt="Thumbnail ${index + 1}" class="${
              index === currentSlide ? "active" : ""
            }" data-index="${index}" />`
        )
        .join("")}
    </div>
  `;

  document.getElementById("prevSlide")?.addEventListener("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
      renderSliderImages();
    }
  });

  document.getElementById("nextSlide")?.addEventListener("click", function () {
    if (currentSlide < sliderImages.length - 1) {
      currentSlide++;
      renderSliderImages();
    }
  });

  modalImages.querySelectorAll(".thumbnail-row img").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.index);
      if (!Number.isNaN(index)) {
        currentSlide = index;
        renderSliderImages();
      }
    });
  });
}
document.getElementById("closeModal").onclick = function () {
  document.getElementById("projectModal").style.display = "none";
};

const projectModal = document.getElementById("projectModal");
projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    projectModal.style.display = "none";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    projectModal?.style.display === "flex" && (projectModal.style.display = "none");
  }
});
// ... existing code ...
