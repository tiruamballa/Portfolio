// =========================================================================
// 🚀 INSTRUCTIONS FOR UPDATING YOUR PORTFOLIO:
// 
// 1. TO ADD A NEW CERTIFICATION:
//    - Scroll down to the `certs` array in `defaultData`.
//    - Copy an existing certification entry, and paste it at the end.
//    - Update the `id` to be unique (e.g., "6").
//    - Place your certificate PDF in the `certifiactions/` directory.
//    - Set `docLink` to the exact filename path, e.g. "certifiactions/my-new-cert.pdf".
//    - Choose a nice 3D emoji from jsDelivr:
//      e.g. "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/scroll.webp"
// 
// 2. TO ADD A NEW PROJECT:
//    - Scroll down to the `projects` array in `defaultData`.
//    - Copy an existing project entry, and paste it at the end.
//    - Ensure `id` and `sliderId` are unique (e.g. "4", "slider-new").
//    - Set details: `title`, `desc`, `tags`, `github`, and `demo`.
//    - Add your project opinion reaction (displayed when hovered) in `opinion`.
//    - Save screenshots inside `images/` and place paths in the `images` list.
// =========================================================================

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduction-motion: reduce)").matches
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Simulated Database ---
  const defaultData = {
    skills: [
      { id: "1", name: "HTML", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/globe-with-meridians.webp", proficiency: "expert", opinion: "Foundational log structure. Keep it clean and accessible." },
      { id: "2", name: "CSS", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/artist-palette.webp", proficiency: "expert", opinion: "Vanilla is my design space. Variables over templates." },
      { id: "3", name: "JavaScript", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/gear.webp", proficiency: "expert", opinion: "Where the signals loop. Async promises keep it running." },
      { id: "4", name: "Python", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/snake.webp", proficiency: "expert", opinion: "Clean syntax. Invaluable for scripting, automation, and AI pipelines." },
      { id: "5", name: "Java", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/hot-beverage.webp", proficiency: "expert", opinion: "Heavy but stable. Essential for backend data processing." },
      { id: "6", name: "SQL", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/card-index-dividers.webp", proficiency: "expert", opinion: "Querying relational data coordinates precisely." },
      { id: "7", name: "GitHub", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/octopus.webp", proficiency: "expert", opinion: "Control version trees. Merge and deploy." },
      { id: "8", name: "Problem Solving", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/brain.webp", proficiency: "expert", opinion: "Logical glitch debugging. Slaying bugs." },
      { id: "9", name: "Responsive Design", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/mobile-phone.webp", proficiency: "expert", opinion: "Adapting layouts to all receiver screen ratios." },
      { id: "10", name: "AI Tools", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/robot.webp", proficiency: "learning", opinion: "Integrating LLM promts, agents, and custom models." }
    ],
    certs: [
      { id: "1", title: "IBM SQL Certification", docLink: "certifiactions/sql ibm certificate.pdf", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/scroll.webp" },
      { id: "2", title: "Cisco Python Essentials 1", docLink: "certifiactions/PythonEssentials1.pdf", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/snake.webp" },
      { id: "3", title: "Cisco Python Essentials 2", docLink: "certifiactions/PythonEssentials2.pdf", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/snake.webp" },
      { id: "4", title: "C Programming Level 1", docLink: "certifiactions/CEssentials1.pdf", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/scroll.webp" },
      { id: "5", title: "C Programming Level 2", docLink: "certifiactions/CEssentials2.pdf", emojiUrl: "https://cdn.jsdelivr.net/npm/@lobehub/assets-emoji/assets/scroll.webp" }
    ],
    projects: [
      {
        id: "project-1",
        title: "MEDIQ+ Medicine Tracking App",
        desc: "An AI-based medicine management and tracking application designed to help patients monitor medication schedules and expiry logs efficiently.",
        tags: "React, Node.js, AI Integration",
        thumb: "images/mediq+/Screenshot 2026-04-27 145954.png",
        images: ["images/mediq+/Screenshot 2026-04-27 145954.png"],
        github: "https://github.com/tiruamballa/MEDIQPLUS",
        demo: "#",
        opinion: "Designed to keep health updates running with zero packet loss."
      },
      {
        id: "project-2",
        title: "QuizLive",
        desc: "An interactive, real-time quiz portal built for multi-user engaging quiz streams using modern sockets.",
        tags: "Django, Python, WebSockets",
        thumb: "images/quizlive/2045.png",
        images: ["images/quizlive/2045.png", "images/quizlive/07.png"],
        github: "https://github.com/tiruamballa/quizlive.errorists",
        demo: "#",
        opinion: "Real-time socket data streams. Sockets are incredibly fun."
      },
      {
        id: "project-3",
        title: "ArogyaCare",
        desc: "A multilingual AI-powered healthcare assistant chatbot that outputs reliable medical suggestions in multiple regional languages.",
        tags: "Django, Python, Gemini API",
        thumb: "images/ArogyaCare/01.jpeg",
        images: ["images/ArogyaCare/01.jpeg"],
        github: "https://github.com/tiruamballa/Arogyacare",
        demo: "#",
        opinion: "Translating natural language medical vectors across diverse channels."
      }
    ],
    volunteering: [
      { id: "1", name: "Udbhav Event Organizer", image: "images/voulnteer/udbhav voulnteer 1.jpeg" },
      { id: "2", name: "Community Support Activity", image: "images/voulnteer/udbhav volnteer 2.jpeg" },
      { id: "3", name: "CSI Active Committee Group", image: "images/voulnteer/volntters csi group photo.jpeg" },
      { id: "4", name: "Fun Clock Event Organizer", image: "images/voulnteer/fun clock organiser 2.jpeg" }
    ]
  };

  /* ------------------------------------------------------------------
     1. SOUND ENGINE
     Dynamically synthesized sounds via WebAudio. Clicks, hums, crackles.
     ------------------------------------------------------------------ */
  let audioCtx = null;
  let soundEnabled = false;

  function ensureAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playTone({ freq = 440, duration = 0.15, type = "sine", gain = 0.05 }) {
    if (!soundEnabled) return;
    const ctx = ensureAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  function playStaticCrackle() {
    if (!soundEnabled) return;
    const ctx = ensureAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.12;
    
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    g.gain.value = 0.03;
    
    src.connect(g).connect(ctx.destination);
    src.start();
  }

  const soundToggle = document.getElementById("soundToggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) ensureAudioContext();
      soundToggle.setAttribute("aria-pressed", String(soundEnabled));
      soundToggle.textContent = soundEnabled ? "🔊 Sound on" : "🔇 Sound off";
    });
  }

  /* ------------------------------------------------------------------
     2. SIGNAL LOCK ENTRY SEQUENCE
     Ghost name overlays align into place as the tune slider drags.
     ------------------------------------------------------------------ */
  const signalLock = document.getElementById("signal-lock");
  const lockStage = document.querySelector(".lock-stage");
  const tuneRange = document.getElementById("tuneRange");
  const signalFill = document.getElementById("signalFill");
  const lockStatus = document.getElementById("lock-status");
  const skipLock = document.getElementById("skipLock");
  const site = document.getElementById("site");
  const headerFrequency = document.getElementById("header-frequency");

  let locked = false;

  function setLockLevel(value) {
    const clamped = Math.max(0, Math.min(100, value));
    const ratio = clamped / 100;
    
    if (lockStage) lockStage.style.setProperty("--lock", ratio.toFixed(3));
    if (signalFill) signalFill.style.width = `${clamped}%`;
    
    // Map slider to frequency readout: 87.5 to 100.0 MHz
    const currentFrequencyMHz = 87.5 + (ratio * 12.5);
    if (headerFrequency) headerFrequency.textContent = `${currentFrequencyMHz.toFixed(1)} MHz`;

    // Audio click detent feedback on values shift
    const discreteValue = Math.floor(clamped);
    if (!setLockLevel.lastVal) setLockLevel.lastVal = discreteValue;
    if (discreteValue !== setLockLevel.lastVal) {
      playTone({ freq: 900, duration: 0.03, type: "sine", gain: 0.02 });
      setLockLevel.lastVal = discreteValue;
    }

    if (clamped < 30) {
      if (lockStatus) lockStatus.textContent = "Multiple signals detected. Tune in.";
    } else if (clamped < 80) {
      if (lockStatus) lockStatus.textContent = "Signal strengthening…";
      if (clamped % 8 === 0) playStaticCrackle();
    } else if (clamped < 100) {
      if (lockStatus) lockStatus.textContent = "Almost locked.";
    } else {
      if (lockStatus) lockStatus.textContent = "Signal locked.";
    }

    if (clamped === 100 && !locked) {
      unlockSite();
    }
  }

  function unlockSite() {
    locked = true;
    playTone({ freq: 650, duration: 0.22, type: "triangle", gain: 0.05 });
    if (signalLock) signalLock.classList.add("is-unlocked");
    if (site) site.hidden = false;
    
    // Focus nav link
    window.setTimeout(() => {
      document.querySelector(".site-header nav a")?.focus();
    }, 450);
  }

  if (tuneRange) {
    tuneRange.addEventListener("input", (e) => setLockLevel(Number(e.target.value)));
  }

  if (skipLock) {
    skipLock.addEventListener("click", () => {
      if (tuneRange) tuneRange.value = 100;
      setLockLevel(100);
    });
  }

  if (prefersReducedMotion) {
    if (signalLock) signalLock.style.display = "none";
    if (site) site.hidden = false;
  }

  /* ------------------------------------------------------------------
     3. SCROLL DEPTH-OF-FIELD
     ------------------------------------------------------------------ */
  const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const isSmallViewport = window.matchMedia("(max-width: 720px)").matches;
  const enableDepth = !prefersReducedMotion && !isLowPower && !isSmallViewport;

  if (enableDepth) {
    document.body.classList.add("enable-depth");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting && entry.intersectionRatio > 0.4);
        });
      },
      { threshold: [0, 0.4, 1] }
    );
    
    document.querySelectorAll(".panel").forEach((panel) => observer.observe(panel));
  }

  /* ------------------------------------------------------------------
     4. PORTFOLIO DYNAMIC RENDERER
     ------------------------------------------------------------------ */
  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;
    
    grid.innerHTML = defaultData.skills.map(s => `
      <li class="skill-card reveal" data-proficiency="${s.proficiency}">
        <img class="skill-icon" src="${s.emojiUrl}" alt="${s.name}" width="48" height="48" loading="lazy">
        <span class="skill-name">${s.name}</span>
        <svg class="skill-wave" viewBox="0 0 120 32" aria-hidden="true">
          <polyline points="" />
        </svg>
        <span class="skill-opinion">${s.opinion}</span>
      </li>
    `).join("");
  }

  function renderCertifications() {
    const grid = document.getElementById("certs-grid");
    if (!grid) return;
    
    grid.innerHTML = defaultData.certs.map(c => `
      <div class="cert-card reveal" onclick="window.open('${encodeURI(c.docLink)}', '_blank')">
        <img class="cert-icon" src="${c.emojiUrl}" alt="${c.title}" width="32" height="32" loading="lazy">
        <div>
          <h4>${c.title}</h4>
          <span>View Verified PDF</span>
        </div>
      </div>
    `).join("");
  }

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    
    grid.innerHTML = defaultData.projects.map(p => `
      <li class="packet reveal" tabindex="0" role="button" aria-expanded="false" data-project="${p.id}">
        <img class="packet-thumb" src="${p.thumb}" alt="${p.title}" loading="lazy">
        <h3>${p.title}</h3>
        <p class="packet-meta">${p.tags}</p>
      </li>
    `).join("");
  }

  function renderVolunteering() {
    const grid = document.getElementById("volunteering-grid");
    if (!grid) return;
    
    grid.innerHTML = defaultData.volunteering.map(v => `
      <div class="gallery-card reveal">
        <img class="gallery-img" src="${v.image}" alt="${v.name}" loading="lazy">
        <div class="gallery-overlay">
          <span>${v.name}</span>
        </div>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------
     5. SKILLS WAVEFORMS ANIMATION
     Dynamic oscillation calculations driven by requestAnimationFrame.
     ------------------------------------------------------------------ */
  function animateWaves() {
    if (prefersReducedMotion) return;
    
    const phase = Date.now() * 0.004;
    document.querySelectorAll(".skill-card").forEach((card) => {
      const isExpert = card.dataset.proficiency === "expert";
      const polyline = card.querySelector(".skill-wave polyline");
      if (polyline) {
        const amplitude = isExpert ? 6 : 5;
        const noise = isExpert ? 0 : 3;
        const pointsCount = 20;
        const step = 120 / pointsCount;
        const pts = [];
        
        for (let i = 0; i <= pointsCount; i++) {
          const x = i * step;
          const jitter = noise ? (Math.random() - 0.5) * noise : 0;
          const y = 16 + Math.sin(i * 0.55 + phase) * amplitude + jitter;
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        polyline.setAttribute("points", pts.join(" "));
      }
    });
    
    requestAnimationFrame(animateWaves);
  }

  /* ------------------------------------------------------------------
     6. PROJECTS DETAIL OVERLAYS
     ------------------------------------------------------------------ */
  const packetDetail = document.getElementById("packetDetail");
  const packetDetailBody = document.getElementById("packetDetailBody");
  const packetClose = document.getElementById("packetClose");

  function openPacket(projectId) {
    const project = defaultData.projects.find(p => p.id === projectId);
    if (!project) return;
    
    packetDetailBody.innerHTML = `
      <h2>${project.title}</h2>
      <div class="packet-tags-container">
        ${project.tags.split(",").map(t => `<span>${t.trim()}</span>`).join("")}
      </div>
      <p>${project.desc}</p>
      <p style="font-style: italic; color: var(--signal-amber); font-family: var(--font-mono); font-size: 0.9rem;">
        "${project.opinion}"
      </p>
      <div class="packet-button-group">
        ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> Source Code</a>` : ''}
        ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
      </div>
    `;
    
    if (packetDetail) packetDetail.hidden = false;
    if (packetClose) packetClose.focus();
    
    playTone({ freq: 620, duration: 0.12, type: "sine", gain: 0.04 });
  }

  function closePacket() {
    if (packetDetail) packetDetail.hidden = true;
  }

  function setupProjectsListener() {
    document.addEventListener("click", (e) => {
      const packet = e.target.closest(".packet");
      if (packet) {
        openPacket(packet.dataset.project);
      }
    });

    document.addEventListener("keydown", (e) => {
      const packet = e.target.closest(".packet");
      if (packet && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openPacket(packet.dataset.project);
      }
    });

    if (packetClose) {
      packetClose.addEventListener("click", closePacket);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && packetDetail && !packetDetail.hidden) {
        closePacket();
      }
    });
  }

  /* ------------------------------------------------------------------
     7. CONTACT — drag-to-transmit
     ------------------------------------------------------------------ */
  const transmitRange = document.getElementById("transmitRange");
  const transmitStatus = document.getElementById("transmitStatus");
  const contactForm = document.getElementById("contactForm");
  let transmitted = false;

  function sendTransmission() {
    if (transmitted) return;
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      if (transmitRange) transmitRange.value = 0;
      return;
    }
    
    transmitted = true;
    playTone({ freq: 580, duration: 0.28, type: "triangle", gain: 0.06 });
    if (transmitStatus) {
      transmitStatus.textContent = "Transmission successful! Message packets sent into space. 📡";
    }
    
    setTimeout(() => {
      contactForm.reset();
      if (transmitRange) transmitRange.value = 0;
      transmitted = false;
    }, 4000);
  }

  if (transmitRange) {
    transmitRange.addEventListener("input", (e) => {
      if (Number(e.target.value) >= 100) {
        sendTransmission();
      }
    });
    
    transmitRange.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        transmitRange.value = 100;
        sendTransmission();
      }
    });
  }

  /* ------------------------------------------------------------------
     8. DYNAMIC TELEMETRY SIMULATION LOOP
     ------------------------------------------------------------------ */
  function runTelemetryLoop() {
    const caffeineVal = document.getElementById("telemetry-caffeine");
    setInterval(() => {
      if (caffeineVal) {
        const next = 92 + Math.floor(Math.random() * 8);
        caffeineVal.textContent = `${next}%`;
      }
    }, 2800);
  }

  // --- Active Nav Link highlighting on scroll ---
  function highlightNavLink() {
    const navLinksItems = document.querySelectorAll(".site-header nav a");
    const sections = document.querySelectorAll(".panel");
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 250) {
        current = section.getAttribute("id");
      }
    });
    
    navLinksItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }

  // --- Simple Reveal Elements ---
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderCertifications();
    renderProjects();
    renderVolunteering();
    setupProjectsListener();
    runTelemetryLoop();
    
    setTimeout(() => {
      animateWaves();
    }, 200);
    
    window.addEventListener("scroll", () => {
      highlightNavLink();
      reveal();
    });
  });

})();
