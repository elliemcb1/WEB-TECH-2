// Run scripts only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // HAMBURGER MENU TOGGLE

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      // Toggle navigation menu visibility
      navMenu.classList.toggle("active");

      // Change icon between hamburger (☰) and close (×)
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
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
    }, 4000); // 4 seconds per slide
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

  const galleryImages = document.querySelectorAll(".gallery-container img");

  // Open lightbox with clicked image
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  // Close lightbox when "X" button clicked
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
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
