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