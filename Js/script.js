let slides = document.querySelectorAll(".slide");
    let current = 0;

    function showNextSlide() {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }

    setInterval(showNextSlide, 4000); // Change every 4 seconds


    document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close');

    // Open lightbox when an image is clicked
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        });
    });

    // Close lightbox when clicking X
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
});
