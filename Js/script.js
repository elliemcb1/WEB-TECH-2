
/* =========================
   HAMBURGER MENU TOGGLE
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); 
      navMenu.classList.toggle("active");

      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navMenu.classList.remove("active");

        const icon = hamburger.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      }
    });
  }

  /* =========================
     SLIDESHOW AUTO ROTATION
  ========================= */
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  if (slides.length) {
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 5000); // 5s per slide
  }

  /* =========================
     EMAILJS BOOKING FORM
  ========================= */
  emailjs.init("FlTXT0UpLcsJWdwa9"); // Your EmailJS public key

  const form = document.getElementById("booking-form");
  const statusMessage = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusMessage.textContent = "Sending...";
      statusMessage.style.color = "#a4a3c1";

      emailjs.sendForm("service_lir7bkp", "template_1ydp3ys", this)
        .then(() => {
          statusMessage.textContent = "✅ Booking confirmed! Please check your email.";
          statusMessage.style.color = "limegreen";
          form.reset();
        }, (err) => {
          console.error("EmailJS Error:", err);
          alert("EmailJS Error: " + JSON.stringify(err));
          statusMessage.textContent = "❌ Oops! Something went wrong. Try again later.";
          statusMessage.style.color = "red";
        });
    });
  }
});


/* =========================
   LIGHTBOX IMAGE VIEWER
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");

  if (lightbox && lightboxImg && closeBtn) {
    document.querySelectorAll(".gallery-container img").forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
});


/* =========================
   COLLAPSIBLE GALLERY
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const container = toggle.nextElementSibling.nextElementSibling; 
      toggle.classList.toggle("active");
      container.classList.toggle("active");
    });
  });
});


/* =========================
   HIGHLIGHT ACTIVE NAV LINK
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#nav-menu a");
  let currentPage = window.location.pathname.split("/").pop().toLowerCase();

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").toLowerCase();
    if (linkPage === currentPage) {
      link.classList.add("pageactive");
    }
  });
});


/* =========================
   FILTER SCRIPT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const filterToggle = document.getElementById("filter-toggle");
  const filterOptions = document.getElementById("filter-options");
  const filterButtons = document.querySelectorAll(".filter-options button");
  const gallerySections = document.querySelectorAll("section[data-category]");
  const filterBar = document.querySelector(".filter-section");

  if (filterToggle && filterOptions) {
    filterToggle.addEventListener("click", () => {
      const open = filterOptions.style.display === "block";
      filterOptions.style.display = open ? "none" : "block";
    });
  }

  function applyFilter(filter) {
    gallerySections.forEach(sec => {
      const category = (sec.dataset.category || "").trim().toLowerCase();
      const show = (filter === "all" || category === filter);
      sec.classList.toggle("is-hidden", !show);
    });

    if (filterBar) {
      filterBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
});


/* =========================
   DIGITAL CLOCK
========================= */
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("time").textContent =
    `${hours}:${minutes}:${seconds} ${ampm}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("Date").textContent =
    now.toLocaleDateString(undefined, options);
}

setInterval(updateClock, 1000);
updateClock();
