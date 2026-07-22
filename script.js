document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // Navbar Scroll Effect
    // =====================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =====================
    // Mobile Menu Toggle
    // =====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // =====================
    // Smooth Scrolling
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 85,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================
    // Countdown Timer
    // =====================
    const eventDate = new Date('2026-08-13T18:00:00+05:30').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // =====================
    // Animated Stats Counter
    // =====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statsAnimated = true;
            statNumbers.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 1800;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run on load in case section is visible

    // =====================
    // Form Submission → Google Sheets
    // =====================
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .btn-close-modal');
    const submitBtn = form.querySelector('button[type="submit"]');

    const scriptURL = 'https://script.google.com/macros/s/AKfycbx1Tr8k7Td31e7YP4A8bRpo5-ed4zjwh_EoCKBzleBDelvvFffgNpY3Czb7d4dxsuEU/exec';

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                modal.classList.add('show');
                form.reset();
                submitBtn.innerHTML = 'Submit Registration';
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was a problem submitting your registration. Please try again.');
                submitBtn.innerHTML = 'Submit Registration';
                submitBtn.disabled = false;
            });
    });

    // =====================
    // Modal Close Handlers
    // =====================
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

});
