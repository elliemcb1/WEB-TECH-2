document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // change icon
    const icon = hamburger.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });
});


// Slideshow
let slides = document.querySelectorAll(".slide");
let current = 0;

function showNextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}
setInterval(showNextSlide, 4000);

// Gallery Lightbox
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-container img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");

  if (galleryImages.length && lightbox) {
    galleryImages.forEach((img) => {
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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    });
  }


  // --- Booking Form with EmailJS ---
  emailjs.init("FlTXT0UpLcsJWdwa9"); // replace with your EmailJS Public Key

  const form = document.getElementById("booking-form");
  const statusMessage = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      statusMessage.textContent = "Sending...";
      statusMessage.style.color = "#a4a3c1";

      emailjs.sendForm("service_lir7bkp", "template_1ydp3ys", this).then(
        () => {
          statusMessage.textContent =
            "✅ Booking confirmed! Please check your email.";
          statusMessage.style.color = "limegreen";
          form.reset();
        },
        (err) => {
          statusMessage.textContent =
            "❌ Oops! Something went wrong. Try again later.";
          statusMessage.style.color = "red";
          console.error("EmailJS Error:", err);
        }
      );
    });
  }
});
