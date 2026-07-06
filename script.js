// ===============================
// Footer Year
// ===============================

document.getElementById("year").textContent = new Date().getFullYear();


// ===============================
// Navbar Shadow on Scroll
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 20){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});


// ===============================
// Active Navigation Link
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// ===============================
// Fade In Sections
// ===============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


// ===============================
// Back To Top Button
// ===============================

const backBtn = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        backBtn.style.display="block";

    }else{

        backBtn.style.display="none";

    }

});

backBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});