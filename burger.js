document.addEventListener("DOMContentLoaded", function() {
    const burgerButton = document.getElementById("hamburger-button");
    const mobileNav = document.getElementById("mobile-nav");

    console.log('burgerButton:', burgerButton, 'mobileNav:', mobileNav);

    burgerButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log('Toggling mobile menu');
        mobileNav.classList.toggle("activeNav");
    });
});