
document.addEventListener("DOMContentLoaded", () => {

// HAMBURGER MENU TOGGLE
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


  // SLIDESHOW AUTO ROTATION

  const slides = document.querySelectorAll(".slide");
  let current = 0;

  if (slides.length) {
    setInterval(() => {
      // Hide current slide
      slides[current].classList.remove("active");

      // Move to next slide (loops back to first)
      current = (current + 1) % slides.length;

      // Show new slide
      slides[current].classList.add("active");
    }, 5000); //  5seconds per slide
  }

  // EMAILJS BOOKING FORM

  emailjs.init("FlTXT0UpLcsJWdwa9"); // Your EmailJS public key

  const form = document.getElementById("booking-form");
  const statusMessage = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading message
      statusMessage.textContent = "Sending...";
      statusMessage.style.color = "#a4a3c1";

      // Send form data using EmailJS
      emailjs.sendForm("service_lir7bkp", "template_1ydp3ys", this)
        .then(() => {
          // Success feedback
          statusMessage.textContent = "✅ Booking confirmed! Please check your email.";
          statusMessage.style.color = "limegreen";
          form.reset();
        }, (err) => {
          // Error handling
          console.error("EmailJS Error:", err);
          alert("EmailJS Error: " + JSON.stringify(err));
          statusMessage.textContent = "❌ Oops! Something went wrong. Try again later.";
          statusMessage.style.color = "red";
        });
    });
  }
});


// LIGHTBOX IMAGE VIEWER
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");

  if (lightbox && lightboxImg && closeBtn) {
    // open when clicking an image
    document.querySelectorAll(".gallery-container img").forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      });
    });

    // ✅ close button
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    // ✅ click outside image closes 
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
});
//Collapseable gallery 
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const container = toggle.nextElementSibling.nextElementSibling; // h3 then div
      toggle.classList.toggle("active");
      container.classList.toggle("active");
    });
  });
});

// HIGHLIGHT ACTIVE NAVIGATION LINK

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#nav-menu a");

  // Get current page filename
  let currentPage = window.location.pathname.split("/").pop().toLowerCase();

  // Default to index.html if no page in path
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  // Compare each link with current page
  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").toLowerCase();
    console.log("Comparing:", linkPage, "with", currentPage);

    // Highlight matching link
    if (linkPage === currentPage) {
      link.classList.add("pageactive");
      console.log("✅ Match found →", linkPage);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // --- existing hamburger/lightbox/etc code stays here ---

  // --- FILTER SCRIPT ---
  const filterToggle = document.getElementById("filter-toggle");
  const filterOptions = document.getElementById("filter-options");
  const filterButtons = document.querySelectorAll(".filter-options button");
  const gallerySections = document.querySelectorAll("section[data-category]");
  const filterBar = document.querySelector(".filter-section");

  // Toggle collapsible filter menu
  if (filterToggle && filterOptions) {
    filterToggle.addEventListener("click", () => {
      const open = filterOptions.style.display === "block";
      filterOptions.style.display = open ? "none" : "block";
    });
  }

  // Apply filtering
  function applyFilter(filter) {
    gallerySections.forEach(sec => {
      const category = (sec.dataset.category || "").trim().toLowerCase();
      const show = (filter === "all" || category === filter);
      sec.classList.toggle("is-hidden", !show);
    });

    // scroll to filter bar
    if (filterBar) {
      filterBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
});

