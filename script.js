// --- Default Data Initialization (Simulated DB) ---
const defaultData = {
    skills: [
        { id: "1", name: "HTML", icon: "fab fa-html5", color: "#E34F26" },
        { id: "2", name: "CSS", icon: "fab fa-css3-alt", color: "#1572B6" },
        { id: "3", name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
        { id: "4", name: "Python", icon: "fab fa-python", color: "#3776AB" },
        { id: "5", name: "Java", icon: "fab fa-java", color: "#007396" },
        { id: "6", name: "SQL", icon: "fas fa-database", color: "#4479A1" },
        { id: "7", name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
        { id: "8", name: "Problem Solving", icon: "fas fa-brain", color: "#FF6B6B" },
        { id: "9", name: "Responsive Design", icon: "fas fa-mobile-alt", color: "#4ECDC4" },
        { id: "10", name: "AI Tools", icon: "fas fa-robot", color: "#A55EEA" }
    ],
    certs: [
        {
            id: "1",
            title: "IBM SQL Certification",
            icon: "fas fa-certificate",
            docLink: "certifiactions/sql ibm certificate.pdf"
        },
        {
            id: "2",
            title: "Cisco Python Essentials 1",
            icon: "fas fa-certificate",
            docLink: "certifiactions/PythonEssentials1.pdf"
        },
        {
            id: "3",
            title: "Cisco Python Essentials 2",
            icon: "fas fa-certificate",
            docLink: "certifiactions/PythonEssentials2.pdf"
        },
        {
            id: "4",
            title: "C Programming Level 1",
            icon: "fas fa-certificate",
            docLink: "certifiactions/CEssentials1.pdf"
        },
        {
            id: "5",
            title: "C Programming Level 2",
            icon: "fas fa-certificate",
            docLink: "certifiactions/CEssentials2.pdf"
        }
    ],
    projects: [
        {
            id: "1",
            sliderId: "slider-mediq",
            title: "MEDIQ+ Medicine Tracking App",
            desc: "An AI-based medicine management and tracking application that helps users monitor medicines, expiry dates, and medicine schedules efficiently.",
            tags: "React, Node.js, AI",
            images: [
                "images/mediq+/Screenshot 2026-04-27 145954.png"
            ],
            github: "https://github.com/tiruamballa/MEDIQPLUS",
            demo: "#"
        },
        {
            id: "2",
            sliderId: "slider-quiz",
            title: "QuizLive",
            desc: "An interactive quiz platform designed for engaging live quiz experiences with a modern UI and dynamic real-time features.",
            tags: "DJango,python,Sockets",
            images: [
                "images/quizlive/2045.png",
                "images/quizlive/07.png"
            ],
            github: "https://github.com/tiruamballa/quizlive.errorists",
            demo: "#"
        },
        {
            id: "3",
            sliderId: "slider-arogyacare",
            title: "ArogyaCare",
            desc: "Arogyacare is a multilingual AI-powered healthcare chatbot that helps users get reliable health information in their preferred language.It uses Google’s Gemini AI model through a Node.js backend to understand natural language queries and generate medically aware, human-like answers.",
            tags: "DJango,python,Sockets",
            images: [
                "images/ArogyaCare/01.jpeg"
            ],
            github: "https://github.com/tiruamballa/Arogyacare",
            demo: "#"
        }
    ],
    volunteering: [
        { id: "1", name: "Udbhav Event", image: "images/voulnteer/udbhav voulnteer 1.jpeg" },
        { id: "2", name: "Community Activity", image: "images/voulnteer/udbhav volnteer 2.jpeg" },
        { id: "3", name: "CSI Volunteers", image: "images/voulnteer/volntters csi group photo.jpeg" },
        { id: "4", name: "Fun Clock Event (Organized by Me)", image: "images/voulnteer/fun clock organiser 2.jpeg" },
        { id: "5", name: "Fun Clock Event Poster (Organized by Me)", image: "images/voulnteer/funclock.png" }
    ]
};

// Read directly from the code, no local storage used
const currentData = defaultData;

// Global Slider State
const sliders = {};

document.addEventListener("DOMContentLoaded", () => {
    // Typing effect
    if (roles.length) setTimeout(typeEffect, 1000);

    // Render dynamic data directly from defaultData
    renderPortfolio();

    // Auto-slide projects
    setInterval(() => {
        Object.keys(sliders).forEach(sliderId => moveSlide(sliderId, 1));
    }, 4000);
});

function renderPortfolio() {
    const data = defaultData;

    // Render Skills
    const skillsGrid = document.getElementById("dynamic-skills");
    if (skillsGrid) {
        skillsGrid.innerHTML = data.skills.map((s, index) => `
            <div class="skill-card glass-card reveal" style="transition-delay: ${(index * 0.1).toFixed(1)}s;">
                <i class="${s.icon} skill-icon" style="color: ${s.color};"></i>
                <h3>${s.name}</h3>
            </div>
        `).join("");
    }

    // Render Certifications
    const certsGrid = document.getElementById("dynamic-certs");
    if (certsGrid) {
        certsGrid.innerHTML = data.certs.map(c => `
            <div class="cert-card glass-card reveal clickable" onclick="openDocument('${c.docLink}')" title="Open ${c.title}">
                <i class="${c.icon} cert-icon"></i>
                <div>
                    <h3>${c.title}</h3>
                    <p class="cert-note">Click to view certificate</p>
                    <span class="pdf-badge">View PDF</span>
                </div>
            </div>
        `).join("");
    }

    // Render Projects
    const projectsGrid = document.getElementById("dynamic-projects");
    if (projectsGrid) {
        projectsGrid.innerHTML = data.projects.map(p => {
            // Filter out any images containing problematic characters like '<' or '>'
            let imagesToUse = (p.images || []).filter(img => typeof img === 'string' && !(/[<>]/.test(img)) && img.trim() !== '');
            if (!imagesToUse || imagesToUse.length === 0) imagesToUse = ['images/mine.png'];

            const imgCount = imagesToUse.length;
            // Only initialize slider state for multi-image sliders
            if (imgCount > 1) sliders[p.sliderId] = { currentIndex: 0, length: imgCount };

            const slidesHtml = imagesToUse.map((img, i) => `
                <img src="${img}" alt="${p.title}" class="slide ${i === 0 ? 'active' : ''}">
            `).join("");

            const tagsHtml = (p.tags || '').split(',').map(tag => `<span>${tag.trim()}</span>`).join("");

            // Only render controls if there are multiple images
            const controlsHtml = imgCount > 1 ? `
                    <button class="slider-btn prev" onclick="moveSlide('${p.sliderId}', -1)"><i class="fas fa-chevron-left"></i></button>
                    <button class="slider-btn next" onclick="moveSlide('${p.sliderId}', 1)"><i class="fas fa-chevron-right"></i></button>
                    <div class="slider-dots"></div>
                ` : '';

            return `
            <div class="project-card glass-card reveal">
                <div class="project-slider" id="${p.sliderId}">
                    <div class="slides">
                        ${slidesHtml}
                    </div>
                    ${controlsHtml}
                </div>
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <div class="project-links" style="margin-top:15px; display:flex; gap:10px;">
                        ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-secondary btn-sm"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${p.demo ? `<a href="${p.demo}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                    </div>
                </div>
            </div>`;
        }).join("");
    }

    // Render Volunteering
    const volGrid = document.getElementById("dynamic-volunteering");
    if (volGrid) {
        volGrid.innerHTML = data.volunteering.map(v => `
            <div class="gallery-item glass-card reveal">
                <img src="${v.image}" alt="${v.name}">
                <div class="gallery-overlay">
                    <span>${v.name}</span>
                </div>
            </div>
        `).join("");
    }

    // Re-trigger scroll reveal for newly added DOM elements
    reveal();
}

function openDocument(link) {
    if (!link || typeof link !== 'string') return;
    window.open(encodeURI(link), '_blank');
}

// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// --- Active Link Highlight on Scroll ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Typing Effect ---
const typingText = document.querySelector('.typing-text');
const roles = ["B.Tech SRKR IT Student", "CSI STUDENT CLUB EXECUTIVE BODY MEMBER", "Web Developer", "AI Enthusiast", "Full Stack Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// --- Scroll Reveal Animation ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// --- Project Image Sliders ---
function moveSlide(sliderId, direction) {
    const sliderDiv = document.getElementById(sliderId);
    if (!sliderDiv) return;

    const slides = sliderDiv.querySelectorAll('.slide');
    if (slides.length <= 1) return; // nothing to slide

    if (!sliders[sliderId]) sliders[sliderId] = { currentIndex: 0 };
    let currentIndex = sliders[sliderId].currentIndex;

    // Hide current slide
    slides[currentIndex].classList.remove('active');

    // Update index
    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    // Show new slide
    slides[currentIndex].classList.add('active');

    // Save state
    sliders[sliderId].currentIndex = currentIndex;
}

// --- Particles.js Configuration ---
if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#00ffcc", "#7b2cbf", "#ffffff"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00ffcc",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}
