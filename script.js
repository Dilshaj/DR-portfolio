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

    // SERVICES SECTION (Extreme Panorama Slider)
    if (document.querySelector('.services-swiper')) {
        new Swiper('.services-swiper', {
            loop: true,
            speed: 1200,
            centeredSlides: true,
            slidesPerView: 'auto', // Dynamic width for panoramic spread
            grabCursor: true,
            effect: 'creative',
            creativeEffect: {
                limitProgress: 3,
                perspective: true,
                prev: {
                    translate: ['-100%', 0, -1000],
                    rotate: [0, 80, 0],
                },
                next: {
                    translate: ['100%', 0, -1000],
                    rotate: [0, -80, 0],
                },
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.pano-pagination',
                clickable: true,
            },
            mousewheel: {
                forceToAxis: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                }
            }
        });
    }

    // EXPO SLIDER (Swiper.js)
    if (document.querySelector('.products-swiper')) {
        new Swiper('.products-swiper', {
            speed: 1000,
            parallax: true,
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.expo-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.expo-next',
                prevEl: '.expo-prev',
            }
        });
    }

    // TECHNOLOGIES SLIDER LOGIC
    const techTrack = document.querySelector('.tech-track');
    const techWrapper = document.querySelector('.tech-track-wrapper');
    const techNextBtn = document.querySelector('.tech-next');
    const techPrevBtn = document.querySelector('.tech-prev');
    const techCards = document.querySelectorAll('.tech-card');

    if (techTrack && techCards.length > 0) {
        let techIndex = 0;

        const updateTechSlider = () => {
            const cardWidth = techCards[0].offsetWidth;
            const gap = 30;
            const stride = cardWidth + gap;

            const visibleWidth = techWrapper.offsetWidth;
            const visibleCards = Math.round(visibleWidth / stride) || 1;
            const maxIndex = techCards.length - visibleCards;

            if (techIndex > maxIndex) techIndex = 0;
            if (techIndex < 0) techIndex = maxIndex;

            const translateX = -(techIndex * stride);
            techTrack.style.transform = `translateX(${translateX}px)`;
        };

        if (techNextBtn) {
            techNextBtn.addEventListener('click', () => {
                techIndex++;
                updateTechSlider();
            });
        }

        if (techPrevBtn) {
            techPrevBtn.addEventListener('click', () => {
                techIndex--;
                updateTechSlider();
            });
        }

        // Auto slide
        let techAutoSlide = setInterval(() => {
            techIndex++;
            updateTechSlider();
        }, 3000);

        techWrapper.addEventListener('mouseenter', () => clearInterval(techAutoSlide));
        techWrapper.addEventListener('mouseleave', () => {
            techAutoSlide = setInterval(() => {
                techIndex++;
                updateTechSlider();
            }, 3000);
        });

        window.addEventListener('resize', updateTechSlider);
        updateTechSlider();
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
