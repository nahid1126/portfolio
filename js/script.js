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
  const modal = document.getElementById("projectModal");
  const modalImages = document.getElementById("modalImages");
  renderSliderImages();
  modal.style.display = "flex";
}
function renderSliderImages() {
  const modalImages = document.getElementById("modalImages");
  let visibleImages = sliderImages.slice(currentSlide, currentSlide + 3);
  modalImages.innerHTML = `
    <div style="margin-top:12px; display:flex; align-items:center; justify-content:center; gap:10px; width:100%; max-width:800px; margin: 0 auto;">
      <button id="nextSlide" ${
        currentSlide + 3 >= sliderImages.length ? "disabled" : ""
      }>
        <i class="fas fa-arrow-left"></i>
      </button>
      <div style="display: flex; gap: 10px; justify-content: center; align-items: center; flex: 1;">
        ${visibleImages
          .map(
            (src) =>
              `<img src="${src}" style="max-height: 160px; max-width: 160px; object-fit: cover; border-radius: 10px;" />`
          )
          .join("")}
      </div>
      <button id="prevSlide" ${
        currentSlide === 0 ? "disabled" : ""
      }>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;
  document.getElementById("prevSlide")?.addEventListener("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
      renderSliderImages();
    }
  });
  document.getElementById("nextSlide")?.addEventListener("click", function () {
    if (currentSlide + 3 < sliderImages.length) {
      currentSlide++;
      renderSliderImages();
    }
  });
}
document.getElementById("closeModal").onclick = function () {
  document.getElementById("projectModal").style.display = "none";
};
// ... existing code ...
