/* =========================
   HAMBURGER MENU TOGGLE
   - Opens and closes the navigation menu on mobile.
   - Also swaps the icon between "bars" and "times".
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger"); // Menu button
  const navMenu = document.getElementById("nav-menu"); // Navigation menu

  if (hamburger && navMenu) {
    // When hamburger is clicked, toggle the menu visibility
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from closing immediately
      navMenu.classList.toggle("active"); // Show/hide menu

      // Change icon between bars and X (close)
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") && // If menu is open
        !navMenu.contains(e.target) && // and click not inside menu
        !hamburger.contains(e.target) // and not on hamburger
      ) {
        navMenu.classList.remove("active"); // Close menu

        // Reset hamburger icon to bars
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
     - Automatically cycles through slideshow images every 5 seconds.
  ========================= */
  const slides = document.querySelectorAll(".slide");
  let current = 0; // Track current active slide

  if (slides.length) {
    setInterval(() => {
      slides[current].classList.remove("active"); // Hide current slide
      current = (current + 1) % slides.length; // Move to next slide
      slides[current].classList.add("active"); // Show next slide
    }, 5000); // Rotate every 5 seconds
  }

  /* =========================
     EMAILJS BOOKING FORM
     - Sends form submissions to EmailJS for processing.
     - Displays success or error messages.
  ========================= */
  emailjs.init("FlTXT0UpLcsJWdwa9"); // Initialize EmailJS with public key

  const form = document.getElementById("booking-form"); // Booking form
  const statusMessage = document.getElementById("form-status"); // Status text element

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Stop normal form submission
      statusMessage.textContent = "Sending..."; // Feedback message
      statusMessage.style.color = "#a4a3c1";

      // Send form data using EmailJS service and template IDs
      emailjs.sendForm("service_lir7bkp", "template_1ydp3ys", this)
        .then(() => {
          // On success
          statusMessage.textContent = "✅ Booking confirmed! Please check your email.";
          statusMessage.style.color = "limegreen";
          form.reset(); // Clear form
        }, (err) => {
          // On error
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
   - Opens an enlarged version of a gallery image when clicked.
   - Closes when user clicks outside image or presses close button.
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");

  if (lightbox && lightboxImg && closeBtn) {
    // For each image in gallery
    document.querySelectorAll(".gallery-container img").forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex"; // Show lightbox
        lightboxImg.src = img.src; // Display clicked image
        lightboxImg.alt = img.alt;
      });
    });

    // Close when clicking close button
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    // Close when clicking outside image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
});


/* =========================
   COLLAPSIBLE GALLERY
   - Expands/collapses sections when toggle is clicked.
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const container = toggle.nextElementSibling.nextElementSibling; // Finds related content
      toggle.classList.toggle("active"); // Highlight toggle
      container.classList.toggle("active"); // Show/hide content
    });
  });
});


/* =========================
   HIGHLIGHT ACTIVE NAV LINK
   - Highlights current page link in the navigation bar.
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#nav-menu a");
  let currentPage = window.location.pathname.split("/").pop().toLowerCase(); // Get current filename

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html"; // Default to homepage
  }

  // Compare each link to current page and highlight if matched
  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").toLowerCase();
    if (linkPage === currentPage) {
      link.classList.add("pageactive"); // Apply active class
    }
  });
});


/* =========================
   FILTER SCRIPT
   - Filters gallery images by category (Nature, Weddings, etc.)
   - Includes toggle button for mobile filter view.
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const filterToggle = document.getElementById("filter-toggle");
  const filterOptions = document.getElementById("filter-options");
  const filterButtons = document.querySelectorAll(".filter-options button");
  const gallerySections = document.querySelectorAll("section[data-category]");
  const filterBar = document.querySelector(".filter-section");

  // Show/hide filter options when toggle button is clicked
  if (filterToggle && filterOptions) {
    filterToggle.addEventListener("click", () => {
      const open = filterOptions.style.display === "block";
      filterOptions.style.display = open ? "none" : "block";
    });
  }

  // Function to apply selected filter
  function applyFilter(filter) {
    gallerySections.forEach(sec => {
      const category = (sec.dataset.category || "").trim().toLowerCase();
      const show = (filter === "all" || category === filter);
      sec.classList.toggle("is-hidden", !show); // Hide non-matching categories
    });

    // Scroll back to top of filter section for better UX
    if (filterBar) {
      filterBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Add click event to each filter button
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active")); // Remove previous active
      btn.classList.add("active"); // Highlight selected button
      applyFilter(btn.getAttribute("data-filter")); // Apply filter
    });
  });
});


/* =========================
   DIGITAL CLOCK
   - Displays live digital time and date on the page.
========================= */
function updateClock() {
  const now = new Date(); // Get current date/time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Add leading zeros if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Display time
  document.getElementById("time").textContent =
    `${hours}:${minutes}:${seconds} ${ampm}`;

  // Display date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("Date").textContent =
    now.toLocaleDateString(undefined, options);
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Run immediately on load
