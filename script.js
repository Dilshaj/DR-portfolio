document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Animate Hamburger
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');

            // Reset Hamburger
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // PREMIUM 3D SERVICES CAROUSEL (Auto + Manual)
    const sliderContainer = document.querySelector('.services-slider');
    const servicePrevBtn = document.querySelector('.services-wrapper .prev-btn');
    const serviceNextBtn = document.querySelector('.services-wrapper .next-btn');

    if (sliderContainer && serviceNextBtn && servicePrevBtn) {
        let currAngle = 0;
        const theta = 45; // 360 / 8 cards
        let autoRotateTimer;

        const rotateCarousel = () => {
            sliderContainer.style.transform = `rotateY(${currAngle}deg)`;
        };

        const startAutoRotate = () => {
            clearInterval(autoRotateTimer);
            autoRotateTimer = setInterval(() => {
                currAngle -= theta;
                rotateCarousel();
            }, 4000); // Rotate every 4 seconds
        };

        const resetAutoRotate = () => {
            clearInterval(autoRotateTimer);
            startAutoRotate();
        };

        serviceNextBtn.addEventListener('click', () => {
            currAngle -= theta;
            rotateCarousel();
            resetAutoRotate();
        });

        servicePrevBtn.addEventListener('click', () => {
            currAngle += theta;
            rotateCarousel();
            resetAutoRotate();
        });

        // Pause on Hover
        sliderContainer.parentElement.addEventListener('mouseenter', () => clearInterval(autoRotateTimer));
        sliderContainer.parentElement.addEventListener('mouseleave', startAutoRotate);

        // Init
        startAutoRotate();
    }

    // PREMIUM PRODUCTS INFINITE SLIDER (Auto + Manual)
    const prodTrack = document.querySelector('.products-track');
    const prodContainer = document.querySelector('.products-slider-container');
    const prodNextBtn = document.querySelector('.prod-next');
    const prodPrevBtn = document.querySelector('.prod-prev');
    const prodProgressBar = document.querySelector('.progress-fill');
    const prodCards = document.querySelectorAll('.product-card');

    if (prodTrack && prodCards.length > 0) {
        let prodIndex = 0;
        const cardWidth = 320;
        const gap = 30;
        const stride = cardWidth + gap;
        const totalCards = prodCards.length;

        const updateSlider = () => {
            // Responsive Calculation
            const containerWidth = prodContainer.offsetWidth;
            const visibleCards = Math.floor(containerWidth / stride) || 1;
            const maxIndex = totalCards - visibleCards;

            // Loop Logic
            if (prodIndex > maxIndex) prodIndex = 0;
            if (prodIndex < 0) prodIndex = maxIndex;

            const translateX = -(prodIndex * stride);
            prodTrack.style.transform = `translateX(${translateX}px)`;

            // Progress Bar
            const progress = ((prodIndex + 1) / (maxIndex + 1)) * 100;
            if (prodProgressBar) {
                prodProgressBar.style.width = `${Math.min(100, progress)}%`;
            }
        };

        let autoSlideInterval;

        const startAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                prodIndex++;
                updateSlider();
            }, 3500);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        if (prodNextBtn) {
            prodNextBtn.addEventListener('click', () => {
                prodIndex++;
                updateSlider();
                resetAutoSlide();
            });
        }

        if (prodPrevBtn) {
            prodPrevBtn.addEventListener('click', () => {
                prodIndex--;
                updateSlider();
                resetAutoSlide();
            });
        }

        // Pause on hover
        prodContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        prodContainer.addEventListener('mouseleave', startAutoSlide);

        // Initial
        updateSlider();
        startAutoSlide();
        window.addEventListener('resize', updateSlider);
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Form Submission Handler (Visual feedback only)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sent Successfully!';
            btn.style.backgroundColor = '#03DAC6';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }
});
