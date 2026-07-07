// ===============================
// Footer Year
// ===============================
document.getElementById("year").textContent = new Date().getFullYear();

// ===============================
// DOM Elements
// ===============================
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
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

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const indicatorContainer = document.querySelector(".project-indicator");

let currentIndex = 0;

function getVisibleCards(){

    if(window.innerWidth <= 768) return 1;

    if(window.innerWidth <= 992) return 2;

    return 3;

}

function createIndicators(){

    indicatorContainer.innerHTML = "";

    cards.forEach((_, index) => {

        const dot = document.createElement("span");

        if(index === 0){
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentIndex = index;

            const maxIndex = cards.length - visibleCards;

            if(currentIndex > maxIndex){
                currentIndex = maxIndex;
            }

            updateCarousel();

        });

        indicatorContainer.appendChild(dot);

    });

}

createIndicators();

function updateCarousel(){

    const cardWidth = cards[0].offsetWidth;
    const gap = 24;

    track.style.transform =
        `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    const indicators = indicatorContainer.querySelectorAll("span");

    indicators.forEach(dot=>{
        dot.classList.remove("active");
    });

    indicators[currentIndex].classList.add("active");

    prevBtn.disabled = currentIndex === 0;

    nextBtn.disabled = currentIndex >= cards.length - visibleCards;

}

const visibleCards = getVisibleCards();

window.addEventListener("resize",()=>{

    visibleCards = getVisibleCards();

    const maxIndex = cards.length - visibleCards;

    if(currentIndex > maxIndex){
        currentIndex = maxIndex;
    }

    updateCarousel();

});

nextBtn.addEventListener("click",()=>{

    if(currentIndex < cards.length - visibleCards){

        currentIndex++;

        updateCarousel();

    }

});

prevBtn.addEventListener("click",()=>{

    if(currentIndex > 0){

        currentIndex--;

        updateCarousel();

    }

});