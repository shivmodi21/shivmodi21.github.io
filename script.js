// ===============================
// Footer Year
// ===============================
document.getElementById("year").textContent = new Date().getFullYear();

// ===============================
// DOM Elements
// ===============================
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul a");
const navMenu = document.querySelector("nav ul");
const menuToggle = document.querySelector(".menu-toggle");
const menuIcon = menuToggle.querySelector("i");
const backBtn = document.getElementById("backToTop");

// ===============================
// Scroll Events
// ===============================
window.addEventListener("scroll", () => {
    // Navbar Shadow
    header.classList.toggle("scrolled", window.scrollY > 20);

    // Active Navigation Link
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });

    // Back To Top Button
    backBtn.classList.toggle("show", window.scrollY > 400);
});


// ===============================
// Mobile Navigation
// ===============================
menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
});


// Close mobile menu when a navigation link is clicked
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
    });

});

// ===============================
// Fade In Sections
// ===============================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });

}, {
    threshold: 0.15
});

sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});


// ===============================
// Back To Top
// ===============================
backBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===============================
// Projects Carousel
// ===============================

const track = document.querySelector(".projects-track");
const cards = document.querySelectorAll(".project-card");
const viewport = document.querySelector(".projects-viewport");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const indicatorContainer = document.querySelector(".project-indicator");

let currentIndex = 0;


// ===============================
// Create Indicators
// ===============================

function createIndicators(){

    indicatorContainer.innerHTML = "";

    cards.forEach((_, index) => {

        const dot = document.createElement("span");

        if(index === 0){
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentIndex = index;
            updateCarousel();

        });

        indicatorContainer.appendChild(dot);

    });

}


// ===============================
// Set Carousel Side Padding
// ===============================

function setCarouselPadding(){

    const viewportWidth = viewport.clientWidth;
    const cardWidth = cards[0].getBoundingClientRect().width;

    const sidePadding = (viewportWidth - cardWidth) / 2;

    track.style.paddingLeft = `${sidePadding}px`;
    track.style.paddingRight = `${sidePadding}px`;

}


// ===============================
// Update Carousel
// ===============================

function updateCarousel(){

    const cardWidth = cards[0].getBoundingClientRect().width;

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.gap) || 0;

    const moveAmount = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${moveAmount}px)`;

    // Update active indicator

    const indicators =
        indicatorContainer.querySelectorAll("span");

    indicators.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

    // Disable buttons at boundaries

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;

}


// ===============================
// Navigation Buttons
// ===============================

nextBtn.addEventListener("click", () => {

    if(currentIndex < cards.length - 1){

        currentIndex++;
        updateCarousel();

    }

});


prevBtn.addEventListener("click", () => {

    if(currentIndex > 0){

        currentIndex--;
        updateCarousel();

    }

});


// ===============================
// Handle Resize
// ===============================

window.addEventListener("resize", () => {

    setCarouselPadding();
    updateCarousel();

});


// ===============================
// Initialize Carousel
// ===============================

createIndicators();
setCarouselPadding();
updateCarousel();

// ===============================
// Mobile Swipe Navigation
// ===============================

let touchStartX = 0;
let touchStartY = 0;

const swipeThreshold = 50;

viewport.addEventListener("touchstart", (event) => {

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;

}, { passive: true });


viewport.addEventListener("touchend", (event) => {

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;


    // Ignore primarily vertical gestures
    if(Math.abs(deltaY) > Math.abs(deltaX)){
        return;
    }


    // Swipe left → next project
    if(deltaX < -swipeThreshold){

        if(currentIndex < cards.length - 1){
            currentIndex++;
            updateCarousel();
        }

    }


    // Swipe right → previous project
    else if(deltaX > swipeThreshold){

        if(currentIndex > 0){
            currentIndex--;
            updateCarousel();
        }

    }

}, { passive: true });

// ===============================
// Achievements Accordion
// ===============================

const certCards = document.querySelectorAll(".cert-card");

certCards.forEach((card) => {

    const header = card.querySelector(".cert-header");

    header.addEventListener("click", () => {

        // Remember whether the clicked card is already active
        const isActive = card.classList.contains("active");

        // Close all cards
        certCards.forEach((otherCard) => {
            otherCard.classList.remove("active");
        });

        // Open clicked card only if it was previously closed
        if (!isActive) {
            card.classList.add("active");
        }

    });

});