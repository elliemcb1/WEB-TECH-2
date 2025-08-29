document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = hamburger.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
    }

    // Slideshow
    const slides = document.querySelectorAll(".slide");
    let current = 0;
    if (slides.length) {
        setInterval(() => {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
        }, 4000);
    }

    // EmailJS Booking Form
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
