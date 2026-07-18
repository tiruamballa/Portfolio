import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  FileDown, 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  BookOpen, 
  Send,
  Terminal as TermIcon,
  ChevronRight,
  ExternalLink,
  Lock,
  Cpu,
  Code,
  Heart
} from 'lucide-react'

// Base REST API Configurations
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/public'

const getSkillIcon = (name) => {
  switch (name) {
    case 'Java':
    case 'JavaScript':
    case 'Python':
    case 'React':
      return <Code size={16} className="text-primary" />;
    case 'Spring Boot':
    case 'Agentic AI':
    case 'RAG / LLM Dev':
      return <Cpu size={16} className="text-primary" />;
    case 'MySQL':
      return <BookOpen size={16} className="text-primary" />;
    default:
      return <Code size={16} className="text-primary" />;
  }
}

// Fallback Data to ensure the portfolio works out-of-the-box
const FALLBACK_DATA = {
  settings: {
    heroHeadline: "Building software systems that solve real-world problems.",
    heroSubtitle: "Java Full Stack Developer, AI Engineer, and Data Analytics enthusiast. Engineering dynamic dashboards and database layers.",
    location: "Andhra Pradesh, India",
    availability: "Available for Internships",
    profileImage: "/images/profile.png"
  },
  projects: [
    {
      id: 1,
      title: "MEDIQ+ Medicine Tracking App",
      description: "An AI-based medicine management and tracking application designed to help patients monitor medication schedules and expiry logs efficiently.",
      githubUrl: "https://github.com/tiruamballa/MEDIQPLUS",
      demoUrl: "#",
      challenges: "Synchronizing high-frequency QR generation, handling inventory triggers, and preventing transaction lockups.",
      features: "Real-time billing, Stock notifications, Expiry telemetry metrics, Multiclass admin portals.",
      statusEnum: "COMPLETED",
      featured: true,
      skillsUsed: [{ name: "React" }, { name: "Node.js" }, { name: "AI Integration" }]
    },
    {
      id: 2,
      title: "QuizLive",
      description: "An interactive, real-time quiz portal built for multi-user engaging quiz streams using modern sockets.",
      githubUrl: "https://github.com/tiruamballa/quizlive.errorists",
      demoUrl: "#",
      challenges: "Synchronizing websocket quiz timers without server lag spikes.",
      features: "Real-time leaderboards, Concurrent session handlers, Quiz generators.",
      statusEnum: "COMPLETED",
      featured: true,
      skillsUsed: [{ name: "Django" }, { name: "Python" }, { name: "WebSockets" }]
    },
    {
      id: 3,
      title: "ArogyaCare",
      description: "A multilingual AI-powered healthcare assistant chatbot that outputs reliable medical suggestions in multiple regional languages.",
      githubUrl: "https://github.com/tiruamballa/Arogyacare",
      demoUrl: "#",
      challenges: "Context retention under large token payloads, structuring robust guardrails for prompt compliance.",
      features: "Multilingual query models, RAG vector context mapping, Dynamic clinic referrals.",
      statusEnum: "COMPLETED",
      featured: true,
      skillsUsed: [{ name: "Django" }, { name: "Python" }, { name: "Gemini API" }]
    }
  ],
  skills: [
    { name: "Java", category: "PROGRAMMING", confidence: 95, experienceLevel: "Advanced", iconName: "Coffee" },
    { name: "JavaScript", category: "FRONTEND", confidence: 90, experienceLevel: "Advanced", iconName: "Code" },
    { name: "Python", category: "PROGRAMMING", confidence: 85, experienceLevel: "Intermediate", iconName: "Terminal" },
    { name: "Spring Boot", category: "BACKEND", confidence: 92, experienceLevel: "Advanced", iconName: "Cpu" },
    { name: "React", category: "FRONTEND", confidence: 88, experienceLevel: "Advanced", iconName: "Layout" },
    { name: "MySQL", category: "DATABASE", confidence: 90, experienceLevel: "Advanced", iconName: "Database" },
    { name: "Agentic AI", category: "AI", confidence: 80, experienceLevel: "Intermediate", iconName: "Cpu" },
    { name: "RAG / LLM Dev", category: "AI", confidence: 82, experienceLevel: "Intermediate", iconName: "Brain" }
  ],
  experience: [
    {
      id: 1,
      company: "Google Dev Program",
      role: "Google Android Development Intern",
      duration: "Dec 2025 - Present",
      description: "Implementing advanced mobile architectures, responsive client grids, and performance audits."
    },
    {
      id: 2,
      company: "Brain O Vision",
      role: "Agentic AI Developer Intern",
      duration: "Sep 2025 - Nov 2025",
      description: "Built autonomous multi-agent pipelines and prompt routing workflows utilizing vector embeddings."
    },
    {
      id: 3,
      company: "Java Full Stack Developer",
      role: "Enterprise Backend Intern",
      duration: "May 2025 - Aug 2025",
      description: "Designed stable database relationships, parametrized query filters, and REST access endpoints."
    },
    {
      id: 4,
      company: "InAmigos",
      role: "Web Intern",
      duration: "Jan 2025 - Apr 2025",
      description: "Optimized frontend component rendering paths and engineered user dashboard elements."
    }
  ],
  roadmap: [
    { name: "Spring Boot Enterprise Patterns", trackType: "PROGRAMMING", progressPercentage: 85, currentTopic: "Microservices & JWT Configs" },
    { name: "Docker & AWS Deployments", trackType: "PROGRAMMING", progressPercentage: 60, currentTopic: "ECS & Elastic Beanstalk" },
    { name: "Agentic AI & RAG Orchestration", trackType: "AI", progressPercentage: 75, currentTopic: "LangChain Tool Agents" },
    { name: "Data Structures & Algorithms (Java)", trackType: "PROGRAMMING", progressPercentage: 90, currentTopic: "Graphs & Dynamic Programming" }
  ],
  certifications: [
    { name: "IBM SQL Certification", organization: "IBM Skills Network", issueDate: "2024", verifyLink: "/certifiactions/sql ibm certificate.pdf" },
    { name: "Cisco Python Essentials 1", organization: "Cisco Networking Academy", issueDate: "2025", verifyLink: "/certifiactions/PythonEssentials1.pdf" },
    { name: "Cisco Python Essentials 2", organization: "Cisco Networking Academy", issueDate: "2025", verifyLink: "/certifiactions/PythonEssentials2.pdf" },
    { name: "C Programming Level 1", organization: "Cisco Networking Academy / OpenEDG", issueDate: "2025", verifyLink: "/certifiactions/CEssentials1.pdf" },
    { name: "C Programming Level 2", organization: "Cisco Networking Academy / OpenEDG", issueDate: "2025", verifyLink: "/certifiactions/CEssentials2.pdf" }
  ],
  volunteering: [
    { id: "1", name: "Udbhav Event Organizer", image: "/images/voulnteer/udbhav voulnteer 1.jpeg" },
    { id: "2", name: "Community Support Activity", image: "/images/voulnteer/udbhav volnteer 2.jpeg" },
    { id: "3", name: "CSI Active Committee Group (Working as EBM - Executive Body Member)", image: "/images/voulnteer/volntters csi group photo.jpeg" },
    { id: "4", name: "Fun Clock Event Organizer", image: "/images/voulnteer/fun clock organiser 2.jpeg" }
  ]
}

export default function App() {
  // State declarations

  // Query hooks
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => axios.get(`${API_BASE}/settings`).then(res => res.data),
    initialData: FALLBACK_DATA.settings
  })

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => axios.get(`${API_BASE}/projects`).then(res => res.data),
    initialData: FALLBACK_DATA.projects
  })

  const { data: skills } = useQuery({
    queryKey: ['skills'],
    queryFn: () => axios.get(`${API_BASE}/skills`).then(res => res.data),
    initialData: FALLBACK_DATA.skills
  })

  const { data: experience } = useQuery({
    queryKey: ['experience'],
    queryFn: () => axios.get(`${API_BASE}/experience`).then(res => res.data),
    initialData: FALLBACK_DATA.experience
  })

  const { data: certifications } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => axios.get(`${API_BASE}/certifications`).then(res => res.data),
    initialData: FALLBACK_DATA.certifications
  })

  // Contact submit mutation
  const contactMutation = useMutation({
    mutationFn: (payload) => axios.post(`${API_BASE}/contact`, payload),
    onSuccess: () => {
      setSubmitMessageStatus('Transmission dispatched successfully! Talk to you soon.')
      setContactForm({ senderName: '', senderEmail: '', messagePayload: '' })
    },
    onError: () => {
      // Offline fallback success for presentation
      setSubmitMessageStatus('Offline simulated transmission success! Thanks Tiru.')
      setContactForm({ senderName: '', senderEmail: '', messagePayload: '' })
    }
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!contactForm.senderName || !contactForm.senderEmail || !contactForm.messagePayload) {
      setSubmitMessageStatus('Please fill all fields.')
      return
    }
    contactMutation.mutate(contactForm)
  }

  // Terminal actions
  const handleTerminalSubmit = (e) => {
    e.preventDefault()
    const cmd = terminalInput.trim().toLowerCase()
    let outText = ''
    if (cmd === 'help') {
      outText = 'Available commands: whoami, skills, status, clear'
    } else if (cmd === 'whoami') {
      outText = 'Tiru Amballa — B.Tech IT Student @ SRKR. Full-Stack Dev specialized in Java, Spring Boot, & AI.'
    } else if (cmd === 'skills') {
      outText = 'Java, Python, Spring Boot, React, MySQL, MongoDB, RAG, Agentic AI.'
    } else if (cmd === 'status') {
      outText = 'Currently building microservice pipelines & learning AWS cloud.'
    } else if (cmd === 'clear') {
      setTerminalOutput([])
      setTerminalInput('')
      return
    } else {
      outText = `Command not recognized: "${cmd}". Type "help" for a list of directives.`
    }

    setTerminalOutput([
      ...terminalOutput,
      { type: 'user', text: `> ${terminalInput}` },
      { type: 'system', text: outText }
    ])
    setTerminalInput('')
  }

  // Local States for widgets
  const [selectedProject, setSelectedProject] = useState(null)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', text: 'CLI Snippets Console [Version 1.0.0]' },
    { type: 'system', text: 'Type "help" to list available commands.' }
  ])
  const [contactForm, setContactForm] = useState({ senderName: '', senderEmail: '', messagePayload: '' })
  const [submitMessageStatus, setSubmitMessageStatus] = useState('')

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 space-y-16">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-cardBorder py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg text-primary tracking-wider">tiru.dev</a>
        <nav className="hidden md:flex gap-6 text-sm text-muted font-medium">
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#skills" className="hover:text-primary transition">Skills</a>
          <a href="#projects" className="hover:text-primary transition">Projects</a>
          <a href="#experience" className="hover:text-primary transition">Experience</a>
          <a href="#volunteering" className="hover:text-primary transition">Volunteering</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted font-mono">{settings.availability || FALLBACK_DATA.settings.availability}</span>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="min-h-[60vh] grid grid-cols-1 lg:grid-cols-3 items-center gap-12 pt-12">
        <div className="lg:col-span-2 flex flex-col justify-center items-start gap-6">
          <div className="flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            <MapPin size={14} className="text-accent" />
            <span className="text-xs text-accent font-mono">{settings.location || FALLBACK_DATA.settings.location}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-[900px]">
            {settings.heroHeadline || FALLBACK_DATA.settings.heroHeadline}
          </h1>
          <p className="text-lg text-muted max-w-[680px]">
            {settings.heroSubtitle || FALLBACK_DATA.settings.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="#contact" className="px-6 py-3 rounded-sm bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/25 transition">
              Start Collaboration
            </a>
            <a 
              href="/resume/tiru resume_compressed.pdf" 
              download="Tiru_Amballa_Resume.pdf"
              className="px-6 py-3 rounded-sm border border-cardBorder hover:border-primary/50 bg-surface/50 text-slate-200 hover:text-white flex items-center gap-2 transition"
            >
              <FileDown size={16} />
              Get Resume
            </a>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-64 h-64 rounded-xl border border-cardBorder flex items-center justify-center overflow-hidden premium-card spotlight-card bg-surface">
            <img 
              src="/images/profile.png" 
              alt="Tiru Amballa" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80" }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. About Section (Dynamic Bento Layout with Image) */}
      <section id="about" className="space-y-6 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <GraduationCap className="text-primary w-6 h-6" />
          About
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface border border-cardBorder p-6 rounded-md space-y-4 premium-card spotlight-card">
            <h3 className="text-lg font-bold text-accent">Biography</h3>
            <p className="text-muted leading-relaxed">
              I am currently pursuing a <strong>B.Tech in Information Technology</strong> at SRKR Engineering College (Graduation 2028). 
              My journey as a software developer is driven by building scalable applications, designing modular service controllers, and learning data structures.
            </p>
            <p className="text-muted leading-relaxed">
              I specialize in <strong>Java and Spring Boot architectures</strong>, frontend widgets in <strong>React & Tailwind</strong>, and integrations for <strong>Agentic AI models</strong>. As a CSI Executive Body Member, I also guide student hackathons and collaborate on open-source packages.
            </p>
          </div>
          
          {/* Profile Card */}
          <div className="bg-surface border border-cardBorder p-6 rounded-md flex flex-col items-center justify-center gap-4 text-center premium-card spotlight-card">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/40 bg-background/50 flex items-center justify-center">
              <img 
                src="/images/profile.png" 
                alt="Tiru Amballa" 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80" }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-lg">Tiru Amballa</h3>
              <p className="text-xs text-muted font-mono mt-0.5">B.Tech IT Student @ SRKR</p>
            </div>
            <div className="flex gap-3 mt-2">
              <a href="https://github.com/tiruamballa" target="_blank" className="p-2 border border-cardBorder hover:border-primary rounded-sm bg-background hover:bg-primary/10 text-muted hover:text-white transition">
                <Github size={16} />
              </a>
              <a href="https://www.linkedin.com/in/amballa-tirumala-rao-08224a322/" target="_blank" className="p-2 border border-cardBorder hover:border-primary rounded-sm bg-background hover:bg-primary/10 text-muted hover:text-white transition">
                <Linkedin size={16} />
              </a>
              <a href="mailto:tiruamballa.it.@gmail.com" className="p-2 border border-cardBorder hover:border-primary rounded-sm bg-background hover:bg-primary/10 text-muted hover:text-white transition">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Skills Section (Interactive Waveform Cards) */}
      <section id="skills" className="space-y-6 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <BookOpen className="text-primary w-6 h-6" />
          Skills Grid
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="bg-surface border border-cardBorder p-4 rounded-md flex flex-col justify-between h-32 group cursor-default premium-card spotlight-card"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-white group-hover:text-primary transition flex items-center gap-2">
                  {getSkillIcon(skill.name)}
                  {skill.name}
                </span>
                <span className="text-xs text-muted font-mono bg-background/50 border border-cardBorder px-2 py-0.5 rounded-sm">{skill.category}</span>
              </div>
              
              {/* Clean Horizontal Progress Indicator */}
              <div className="w-full space-y-1">
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden border border-cardBorder/30">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${skill.confidence}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-muted font-mono">
                <span>Proficiency</span>
                <span className="text-primary group-hover:text-white font-medium transition">{skill.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Projects Bento Grid */}
      <section id="projects" className="space-y-6 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <Award className="text-primary w-6 h-6" />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div 
              key={proj.id} 
              className="bg-surface border border-cardBorder p-6 rounded-md flex flex-col justify-between gap-4 cursor-pointer premium-card spotlight-card"
              onClick={() => setSelectedProject(proj)}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition">{proj.title}</h3>
                  <span className="text-xs px-2 py-0.5 border border-primary/20 bg-primary/5 text-accent font-mono rounded-sm">{proj.statusEnum}</span>
                </div>
                <p className="text-sm text-muted line-clamp-3 leading-relaxed">{proj.description}</p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-cardBorder/30">
                <div className="flex gap-2">
                  {proj.skillsUsed && proj.skillsUsed.map((sk, index) => (
                    <span key={index} className="text-xs text-muted font-mono px-2 py-0.5 bg-background border border-cardBorder rounded-sm">{sk.name}</span>
                  ))}
                </div>
                <span className="text-xs text-primary font-semibold flex items-center gap-1">
                  View Dossier <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Case Study Dossier Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-surface border border-cardBorder rounded-lg max-w-[650px] w-full p-6 space-y-6 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b border-cardBorder pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs text-accent font-mono mt-1">Status: {selectedProject.statusEnum}</p>
              </div>
              <button 
                className="text-muted hover:text-white font-mono text-lg"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-xs text-primary uppercase font-mono tracking-wider">Overview</span>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{selectedProject.description}</p>
              </div>
              
              <div>
                <span className="text-xs text-primary uppercase font-mono tracking-wider">Features</span>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{selectedProject.features}</p>
              </div>

              <div>
                <span className="text-xs text-primary uppercase font-mono tracking-wider">Engineering Challenges</span>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{selectedProject.challenges}</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-cardBorder/30">
              <a 
                href={selectedProject.githubUrl} 
                target="_blank" 
                className="flex-1 py-2 text-center rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 flex items-center justify-center gap-2 transition"
              >
                <Github size={16} /> Repository
              </a>
              {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                <a 
                  href={selectedProject.demoUrl} 
                  target="_blank" 
                  className="flex-1 py-2 text-center rounded-sm border border-cardBorder text-slate-200 font-semibold hover:border-accent hover:text-white flex items-center justify-center gap-2 transition"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Experience Timeline */}
      <section id="experience" className="space-y-6 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <Briefcase className="text-primary w-6 h-6" />
          Experience Timeline
        </h2>
        <div className="border-l-2 border-primary/20 ml-4 pl-6 space-y-8 relative">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative space-y-2">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
                <span className="text-xs font-mono text-accent bg-surface border border-cardBorder px-2.5 py-0.5 rounded-sm">{exp.duration}</span>
              </div>
              <p className="text-sm text-primary font-medium">{exp.company}</p>
              <p className="text-sm text-muted leading-relaxed max-w-[700px]">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Certifications Grid */}
      <section className="space-y-6">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <Award className="text-primary w-6 h-6" />
          Verified Credentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-surface border border-cardBorder p-5 rounded-md flex flex-col justify-between gap-4 premium-card spotlight-card">
              <div>
                <h3 className="text-sm font-bold text-white leading-snug flex items-center gap-2">
                  <CheckCircle className="text-primary w-4 h-4 flex-shrink-0" />
                  {cert.name}
                </h3>
                <p className="text-xs text-muted mt-1">{cert.organization} — {cert.issueDate}</p>
              </div>
              {cert.verifyLink && (
                <a 
                  href={cert.verifyLink} 
                  target="_blank" 
                  className="text-xs text-accent hover:text-white flex items-center gap-1 font-mono transition"
                >
                  Verify Certificate <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Interactive command Terminal card */}
      <section className="space-y-6">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <TermIcon className="text-primary w-6 h-6" />
          Terminal Console
        </h2>
        <div className="bg-surface border border-cardBorder p-5 rounded-md font-mono text-sm space-y-4">
          <div className="flex items-center justify-between border-b border-cardBorder/30 pb-2">
            <span className="text-xs text-muted flex items-center gap-2"><TermIcon size={14} /> terminal.sh</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
          </div>
          
          <div className="space-y-2 max-h-[160px] overflow-y-auto">
            {terminalOutput.map((log, index) => (
              <p 
                key={index} 
                className={log.type === 'user' ? 'text-primary' : 'text-slate-300'}
              >
                {log.text}
              </p>
            ))}
          </div>

          <form onSubmit={handleTerminalSubmit} className="flex gap-2 items-center">
            <span className="text-primary">&gt;</span>
            <input 
              type="text" 
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm focus:ring-0" 
              placeholder="whoami, skills..."
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
            />
          </form>
        </div>
      </section>

      {/* 9.5. Volunteering Section */}
      <section id="volunteering" className="space-y-6 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <Heart className="text-primary w-6 h-6" />
          Community & Volunteering
        </h2>
        <p className="text-sm text-muted">Currently active as an <strong>Executive Body Member (EBM) of the Computer Society of India (CSI) student club</strong> and organizing campus technical initiatives.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FALLBACK_DATA.volunteering.map((item) => (
            <div key={item.id} className="bg-surface border border-cardBorder rounded-md overflow-hidden flex flex-col justify-between premium-card spotlight-card">
              <div className="h-48 overflow-hidden bg-background">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=512&q=80" }}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white leading-snug">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Contact form */}
      <section id="contact" className="space-y-6 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-white tracking-wide border-b border-cardBorder pb-2 flex items-center gap-3">
          <Mail className="text-primary w-6 h-6" />
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-accent">Let's Connect</h3>
            <p className="text-muted leading-relaxed">
              If you want to discuss full-stack software development, internships, or AI integration pipelines, feel free to send a direct message.
            </p>
            <div className="space-y-2 font-mono text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> tiruamballa.it.@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Linkedin size={16} className="text-primary" /> linkedin.com/in/amballa-tirumala-rao
              </p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="senderName" className="text-xs font-mono uppercase text-muted">Name</label>
              <input 
                type="text" 
                id="senderName" 
                className="w-full bg-surface border border-cardBorder rounded-sm px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none transition" 
                placeholder="Your name"
                value={contactForm.senderName}
                onChange={(e) => setContactForm({ ...contactForm, senderName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="senderEmail" className="text-xs font-mono uppercase text-muted">Email</label>
              <input 
                type="email" 
                id="senderEmail" 
                className="w-full bg-surface border border-cardBorder rounded-sm px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none transition" 
                placeholder="your.email@gmail.com"
                value={contactForm.senderEmail}
                onChange={(e) => setContactForm({ ...contactForm, senderEmail: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="messagePayload" className="text-xs font-mono uppercase text-muted">Message</label>
              <textarea 
                id="messagePayload" 
                rows="4" 
                className="w-full bg-surface border border-cardBorder rounded-sm px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none transition resize-none" 
                placeholder="Write your transmission..."
                value={contactForm.messagePayload}
                onChange={(e) => setContactForm({ ...contactForm, messagePayload: e.target.value })}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 rounded-sm bg-primary hover:bg-primary/90 text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <Send size={16} /> Send Transmission
            </button>
            {submitMessageStatus && (
              <p className="text-xs font-mono text-accent mt-2 animate-pulse">{submitMessageStatus}</p>
            )}
          </form>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-cardBorder/30 pt-8 pb-12 text-center text-xs text-muted font-mono flex flex-col md:flex-row md:justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Tiru Amballa. All rights reserved.</p>
        <p>Premium SaaS Portfolio Redesign.</p>
      </footer>
    </div>
  )
}
