document.addEventListener('DOMContentLoaded', () => {
    // Reviews carousel functionality
    const initializeReviewsCarousel = () => {
        const inputs = document.querySelectorAll('.reviewsCarousel-input');
        const carousel = document.querySelector('.reviewsCarousel');

        if (!carousel || inputs.length === 0) return;

        const middleIndex = Math.floor(inputs.length / 2);
        inputs[middleIndex].checked = true;
        carousel.style.setProperty('--position', middleIndex + 1);

        inputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                carousel.style.setProperty('--position', index + 1);
            });
        });
    };

    initializeReviewsCarousel();

    // Services carousel functionality
    const initializeServicesCarousel = () => {
        const inputs = document.querySelectorAll('.servicesCarousel-input');
        const carousel = document.querySelector('.servicesCarousel');

        if (!carousel || inputs.length === 0) return;

        const middleIndex = Math.floor(inputs.length / 2);
        inputs[middleIndex].checked = true;
        carousel.style.setProperty('--position', middleIndex + 1);

        inputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                carousel.style.setProperty('--position', index + 1);
            });
        });
    };

    initializeServicesCarousel();

    let lastScrollTop = 0;
    const header = document.querySelector('header'); // Declare header once

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Popup functionality
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const popup = document.getElementById('login-popup');
    const closePopup = document.getElementById('close-popup');
    const popupTitle = document.querySelector('.login-popup-content h2');
    const popupBottomText = document.getElementById('popup-bottom-text');

    function showPopup(type) {
        popup.style.display = 'flex';
        if (type === 'login') {
            popupTitle.textContent = 'Login';
            popupBottomText.innerHTML = 'Don\'t have an account? <a href="#">Sign Up</a>';
        } else if (type === 'signup') {
            popupTitle.textContent = 'Sign Up';
            popupBottomText.innerHTML = 'Already have an account? <a href="#">Log In</a>';
        }
    }

    function closePopupHandler() {
        popup.style.display = 'none';
    }

    loginBtn.addEventListener('click', () => showPopup('login'));
    signupBtn.addEventListener('click', () => showPopup('signup'));
    closePopup.addEventListener('click', closePopupHandler);

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopupHandler();
        }
    });

    window.addEventListener('scroll', () => {
        if (popup.style.display === 'flex') {
            closePopupHandler();
        }
    });

    function navigateTo(section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const learnMoreButton = document.querySelector('.learn-more-button');
    const contactButton = document.querySelector('.contactButton');
    const aboutBtn = document.querySelector('.aboutBtn'); 

    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', () => navigateTo('about'));
    }

    if (aboutBtn) {
        aboutBtn.addEventListener("click", () => navigateTo('services'));
    }

    if (contactButton) {
        contactButton.addEventListener('click', () => navigateTo('contact'));
    }

    // Service item functionality
    document.querySelectorAll('.service-details-button').forEach(button => {
        button.addEventListener('click', function () {
            const serviceItem = this.closest('.servicesItem');
            const carouselInputs = document.querySelectorAll('.servicesCarousel-input');

            serviceItem.classList.toggle('expanded');

            document.querySelectorAll('.servicesItem.expanded').forEach(item => {
                if (item !== serviceItem) {
                    item.classList.remove('expanded');
                }
            });

            const buttonText = serviceItem.classList.contains('expanded') ? 'Close' : 'Find out more';
            this.textContent = buttonText;

            carouselInputs.forEach(input => input.disabled = serviceItem.classList.contains('expanded'));

            const allButtons = document.querySelectorAll('.service-details-button');
            allButtons.forEach(btn => btn.disabled = false);
            if (serviceItem.classList.contains('expanded')) {
                this.enabled = true;
            }
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (contactForm && nameInput && emailInput && messageInput) {
        nameInput.value = localStorage.getItem('contact-name') || '';
        emailInput.value = localStorage.getItem('contact-email') || '';
        messageInput.value = localStorage.getItem('contact-message') || '';

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                alert('All fields are required!');
                return;
            }

            localStorage.setItem('contact-name', name);
            localStorage.setItem('contact-email', email);
            localStorage.setItem('contact-message', message);

            emailjs.init('KJTLhsc10r0byAuof');

            emailjs.send('service_zycpvg9', 'template_dapms5f', {
                from_name: name,
                from_email: email,
                message: message
            }).then(response => {
                alert('Message sent successfully!');
                contactForm.reset();
                localStorage.clear();
            }).catch(error => {
                console.error('EmailJS Error:', error);
                alert('Failed to send the message. Please try again.');
            });
        });
    } else {
        console.error('Contact form elements are missing.');
    }

    const themeToggleButton = document.querySelector('.theme-toggle-btn');
    const body = document.body;
    const footer = document.querySelector('footer');
    
    const homeSection = document.querySelector('.home');
    const aboutSection = document.querySelector('.about');
    const servicesSection = document.querySelector('.services');
    const contactSection = document.querySelector('.contact');

    body.classList.add('dark-theme');
    header.classList.add('dark-theme');
    footer.classList.add('dark-theme');

    if (localStorage.getItem('theme') === 'dark-theme') {
        body.classList.add('light-theme');
        header.classList.add('light-theme');
        footer.classList.add('light-theme');
        homeSection.classList.add('light-theme');
        aboutSection.classList.add('light-theme');
        servicesSection.classList.add('light-theme');
        contactSection.classList.add('light-theme');
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        header.classList.toggle('dark-theme');
        footer.classList.toggle('dark-theme');
        
        body.classList.toggle('light-theme');
        header.classList.toggle('light-theme');
        footer.classList.toggle('light-theme');

        homeSection.classList.toggle('light-theme');
        aboutSection.classList.toggle('light-theme');
        servicesSection.classList.toggle('light-theme');
        contactSection.classList.toggle('light-theme');

        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    const stripe = Stripe('sk_test_51QD7CMHJhQPqYtpYOGxZAssLUcFGkWmoShOZ44mAwrv8hBPl42NK1gnM6t5JoYwphVL6OInfdtR9oxACTNraeDh800NFZdZ65s'); // Replace with your Stripe public key

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async (event) => {
        const magazineId = event.target.dataset.magazineId;
        const price = event.target.dataset.price;

        try {

            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ magazineId, price }),
            });

            if (!response.ok) throw new Error('Failed to create checkout session');

            const session = await response.json();

            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {

                const notification = document.getElementById('notification');
                notification.textContent = result.error.message;
            }
        } catch (error) {
            console.error('Error:', error);
            const notification = document.getElementById('notification');
            notification.textContent = 'An error occurred. Please try again.';
        }
    });
});

});
