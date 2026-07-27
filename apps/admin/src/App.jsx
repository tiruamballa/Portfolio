import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { 
  LayoutDashboard, 
  Layers, 
  Award, 
  Briefcase, 
  Inbox, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Database, 
  Check, 
  Activity,
  ExternalLink,
  BookOpen,
  Cpu,
  Heart,
  X,
  PlusCircle
} from 'lucide-react'

// Base REST API Configurations
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const queryClient = useQueryClient()

  // --- CRUD Modals States ---
  const [projectModal, setProjectModal] = useState(null) // holds project form object
  const [skillModal, setSkillModal] = useState(null)
  const [certModal, setCertModal] = useState(null)
  const [expModal, setExpModal] = useState(null)

  const [settingsForm, setSettingsForm] = useState(null)
  const [settingsStatus, setSettingsStatus] = useState('')

  // Custom demo mode fallback when backend is unreachable/offline
  const [isDemoMode, setIsDemoMode] = useState(localStorage.getItem('admin_token') === 'demo_jwt_token_auth_preset')

  // Toast System
  const [toast, setToast] = useState(null)
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Custom Confirmation Dialogs
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Unsaved Changes Tracking
  const [modalInitialData, setModalInitialData] = useState(null)

  // Form Validation
  const [formErrors, setFormErrors] = useState({})

  const validateForm = (type, data) => {
    const errors = {}
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
    
    if (type === 'project') {
      if (!data.title?.trim()) errors.title = 'Project title is required'
      if (!data.description?.trim()) errors.description = 'Description is required'
      if (data.githubUrl && !urlPattern.test(data.githubUrl)) errors.githubUrl = 'Invalid URL format'
      if (data.demoUrl && !urlPattern.test(data.demoUrl)) errors.demoUrl = 'Invalid URL format'
      if (data.readmeLink && !urlPattern.test(data.readmeLink)) errors.readmeLink = 'Invalid URL format'
    } else if (type === 'skill') {
      if (!data.name?.trim()) errors.name = 'Skill name is required'
      if (!data.experienceLevel?.trim()) errors.experienceLevel = 'Experience level is required'
    } else if (type === 'cert') {
      if (!data.name?.trim()) errors.name = 'Certification name is required'
      if (!data.organization?.trim()) errors.organization = 'Issuing organization is required'
      if (!data.issueDate?.trim()) errors.issueDate = 'Issue date/year is required'
      if (data.verifyLink && !urlPattern.test(data.verifyLink)) errors.verifyLink = 'Invalid URL format (must be full URL or valid path)'
    } else if (type === 'exp') {
      if (!data.company?.trim()) errors.company = 'Company name is required'
      if (!data.role?.trim()) errors.role = 'Role title is required'
      if (!data.duration?.trim()) errors.duration = 'Duration is required'
      if (!data.description?.trim()) errors.description = 'Description is required'
    }
    return errors
  }

  // Modal Open wrappers
  const openProjectModal = (proj) => {
    setProjectModal(proj)
    setModalInitialData(proj)
    setFormErrors({})
  }
  const openSkillModal = (skill) => {
    setSkillModal(skill)
    setModalInitialData(skill)
    setFormErrors({})
  }
  const openCertModal = (cert) => {
    setCertModal(cert)
    setModalInitialData(cert)
    setFormErrors({})
  }
  const openExpModal = (exp) => {
    setExpModal(exp)
    setModalInitialData(exp)
    setFormErrors({})
  }

  const handleCancelModal = (closeFn, modalState) => {
    const isDirty = modalState && modalInitialData && JSON.stringify(modalState) !== JSON.stringify(modalInitialData)
    if (isDirty) {
      if (!confirm('You have unsaved changes. Discard them?')) {
        return
      }
    }
    closeFn(null)
    setModalInitialData(null)
    setFormErrors({})
  }


  // Auth headers
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  // 1. Authenticate login
  const handleLogin = (e) => {
    e.preventDefault()

    // Always attempt live backend login first
    axios.post(`${API_BASE}/auth/login`, loginCreds)
      .then(res => {
        const jwt = res.data.token
        setToken(jwt)
        localStorage.setItem('admin_token', jwt)
        setIsDemoMode(false)
        setLoginError('')
      })
      .catch(() => {
        // Fallback to local presentation demo mode if backend is down/unreachable
        if (loginCreds.username === 'tiruamballa' && loginCreds.password === '100207') {
          const fakeToken = "demo_jwt_token_auth_preset"
          setToken(fakeToken)
          localStorage.setItem('admin_token', fakeToken)
          setIsDemoMode(true)
          setLoginError('')
        } else {
          setLoginError('Invalid administrator credentials.')
        }
      })
  }

  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('admin_token')
    setIsDemoMode(false)
  }

  // --- CRUD Fetch Hooks ---
  const { data: analytics } = useQuery({
    queryKey: ['admin_analytics'],
    queryFn: () => axios.get(`${API_BASE}/admin/analytics`, authHeaders).then(res => res.data),
    enabled: !!token && !isDemoMode,
    initialData: { totalVisitors: 142, totalDownloads: 54, totalClicks: 388, trafficLogs: [] }
  })

  const { data: projects } = useQuery({
    queryKey: ['admin_projects'],
    queryFn: () => axios.get(`${API_BASE}/public/projects`).then(res => res.data),
    enabled: !!token,
    initialData: [
      { id: 1, title: "JeevMitra", statusEnum: "COMPLETED", featured: true },
      { id: 2, title: "ATR Operating System", statusEnum: "IN_PROGRESS", featured: true },
      { id: 3, title: "QuizLive", statusEnum: "COMPLETED", featured: true },
      { id: 4, title: "ArogyaCare AI Assistant", statusEnum: "COMPLETED", featured: true },
      { id: 5, title: "Portfolio CMS Console", statusEnum: "COMPLETED", featured: true }
    ]
  })

  const { data: skills } = useQuery({
    queryKey: ['admin_skills'],
    queryFn: () => axios.get(`${API_BASE}/public/skills`).then(res => res.data),
    enabled: !!token,
    initialData: [
      { id: 1, name: "Java", category: "PROGRAMMING", confidence: 95, experienceLevel: "Advanced", displayOrder: 1, visible: true },
      { id: 2, name: "Spring Boot", category: "BACKEND", confidence: 92, experienceLevel: "Advanced", displayOrder: 2, visible: true }
    ]
  })

  const { data: certifications } = useQuery({
    queryKey: ['admin_certifications'],
    queryFn: () => axios.get(`${API_BASE}/public/certifications`).then(res => res.data),
    enabled: !!token,
    initialData: [
      { id: 1, name: "IBM SQL Certification", organization: "IBM Skills Network", issueDate: "2024", verifyLink: "/certifiactions/sql-ibm-certificate.pdf" }
    ]
  })

  const { data: experience } = useQuery({
    queryKey: ['admin_experience'],
    queryFn: () => axios.get(`${API_BASE}/public/experience`).then(res => res.data),
    enabled: !!token,
    initialData: [
      { id: 1, company: "Google Dev Program", role: "Google Android Development Intern", duration: "Dec 2025 - Present", description: "Implementing architectures." }
    ]
  })

  const { data: settings } = useQuery({
    queryKey: ['admin_settings'],
    queryFn: () => axios.get(`${API_BASE}/public/settings`).then(res => res.data),
    enabled: !!token,
    initialData: {
      heroHeadline: "Building software systems that solve real-world problems.",
      heroSubtitle: "Java Full Stack Developer, AI Engineer, and Data Analytics enthusiast. Engineering dynamic dashboards and database layers.",
      location: "Andhra Pradesh, India",
      availability: "Available for Internships",
      profileImage: "/images/profile.png"
    }
  })

  const { data: messages } = useQuery({
    queryKey: ['admin_messages'],
    queryFn: () => axios.get(`${API_BASE}/admin/contact-messages`, authHeaders).then(res => res.data),
    enabled: !!token && !isDemoMode,
    initialData: [
      { id: 1, senderName: "Recruiter Bob", senderEmail: "bob@hiring.com", messagePayload: "Let's set up an interview for Monday.", status: "UNREAD" }
    ]
  })

  const { data: activityLogs } = useQuery({
    queryKey: ['admin_logs'],
    queryFn: () => axios.get(`${API_BASE}/admin/activity-logs`, authHeaders).then(res => res.data),
    enabled: !!token && !isDemoMode,
    initialData: [
      { id: 1, actionType: "LOGIN", details: "Admin logged into the portal dashboard.", timestamp: new Date().toISOString() }
    ]
  })

  // --- CRUD Mutations ---
  // Projects
  const saveProjectMutation = useMutation({
    mutationFn: (p) => {
      if (isDemoMode) return Promise.resolve({ data: p })
      if (p.id) return axios.put(`${API_BASE}/admin/projects/${p.id}`, p, authHeaders)
      return axios.post(`${API_BASE}/admin/projects`, p, authHeaders)
    },
    onSuccess: (res, variables) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_projects'], (old) => {
          const item = res.data
          if (item.id) {
            return old.map(o => o.id === item.id ? { ...o, ...item } : o)
          } else {
            const nextId = old.length ? Math.max(...old.map(o => o.id)) + 1 : 1
            return [...old, { ...item, id: nextId }]
          }
        })
        showToast('Demo Mode: Project changes simulated locally!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_projects'])
        showToast(variables.id ? 'Project updated successfully!' : 'Project created successfully!', 'success')
      }
      setProjectModal(null)
      setModalInitialData(null)
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Save failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  const deleteProjectMutation = useMutation({
    mutationFn: (id) => {
      if (isDemoMode) return Promise.resolve({ data: id })
      return axios.delete(`${API_BASE}/admin/projects/${id}`, authHeaders)
    },
    onSuccess: (res, id) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_projects'], (old) => old.filter(o => o.id !== id))
        showToast('Demo Mode: Project deletion simulated!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_projects'])
        showToast('Project deleted successfully!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Delete failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  // Skills
  const saveSkillMutation = useMutation({
    mutationFn: (s) => {
      if (isDemoMode) return Promise.resolve({ data: s })
      if (s.id) return axios.put(`${API_BASE}/admin/skills/${s.id}`, s, authHeaders)
      return axios.post(`${API_BASE}/admin/skills`, s, authHeaders)
    },
    onSuccess: (res, variables) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_skills'], (old) => {
          const item = res.data
          if (item.id) {
            return old.map(o => o.id === item.id ? { ...o, ...item } : o)
          } else {
            const nextId = old.length ? Math.max(...old.map(o => o.id)) + 1 : 1
            return [...old, { ...item, id: nextId }]
          }
        })
        showToast('Demo Mode: Skill changes simulated locally!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_skills'])
        showToast(variables.id ? 'Skill updated successfully!' : 'Skill created successfully!', 'success')
      }
      setSkillModal(null)
      setModalInitialData(null)
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Save failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  const deleteSkillMutation = useMutation({
    mutationFn: (id) => {
      if (isDemoMode) return Promise.resolve({ data: id })
      return axios.delete(`${API_BASE}/admin/skills/${id}`, authHeaders)
    },
    onSuccess: (res, id) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_skills'], (old) => old.filter(o => o.id !== id))
        showToast('Demo Mode: Skill deletion simulated!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_skills'])
        showToast('Skill deleted successfully!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Delete failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  // Certifications
  const saveCertMutation = useMutation({
    mutationFn: (c) => {
      if (isDemoMode) return Promise.resolve({ data: c })
      if (c.id) return axios.put(`${API_BASE}/admin/certifications/${c.id}`, c, authHeaders)
      return axios.post(`${API_BASE}/admin/certifications`, c, authHeaders)
    },
    onSuccess: (res, variables) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_certifications'], (old) => {
          const item = res.data
          if (item.id) {
            return old.map(o => o.id === item.id ? { ...o, ...item } : o)
          } else {
            const nextId = old.length ? Math.max(...old.map(o => o.id)) + 1 : 1
            return [...old, { ...item, id: nextId }]
          }
        })
        showToast('Demo Mode: Certification changes simulated locally!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_certifications'])
        showToast(variables.id ? 'Certification updated successfully!' : 'Certification created successfully!', 'success')
      }
      setCertModal(null)
      setModalInitialData(null)
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Save failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  const deleteCertMutation = useMutation({
    mutationFn: (id) => {
      if (isDemoMode) return Promise.resolve({ data: id })
      return axios.delete(`${API_BASE}/admin/certifications/${id}`, authHeaders)
    },
    onSuccess: (res, id) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_certifications'], (old) => old.filter(o => o.id !== id))
        showToast('Demo Mode: Certification deletion simulated!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_certifications'])
        showToast('Certification deleted successfully!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Delete failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  // Experience
  const saveExpMutation = useMutation({
    mutationFn: (e) => {
      if (isDemoMode) return Promise.resolve({ data: e })
      if (e.id) return axios.put(`${API_BASE}/admin/experience/${e.id}`, e, authHeaders)
      return axios.post(`${API_BASE}/admin/experience`, e, authHeaders)
    },
    onSuccess: (res, variables) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_experience'], (old) => {
          const item = res.data
          if (item.id) {
            return old.map(o => o.id === item.id ? { ...o, ...item } : o)
          } else {
            const nextId = old.length ? Math.max(...old.map(o => o.id)) + 1 : 1
            return [...old, { ...item, id: nextId }]
          }
        })
        showToast('Demo Mode: Experience changes simulated locally!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_experience'])
        showToast(variables.id ? 'Experience slot updated successfully!' : 'Experience slot created successfully!', 'success')
      }
      setExpModal(null)
      setModalInitialData(null)
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Save failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  const deleteExpMutation = useMutation({
    mutationFn: (id) => {
      if (isDemoMode) return Promise.resolve({ data: id })
      return axios.delete(`${API_BASE}/admin/experience/${id}`, authHeaders)
    },
    onSuccess: (res, id) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_experience'], (old) => old.filter(o => o.id !== id))
        showToast('Demo Mode: Experience deletion simulated!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_experience'])
        showToast('Experience slot deleted successfully!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Delete failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  // Site Settings
  const saveSettingsMutation = useMutation({
    mutationFn: (s) => {
      if (isDemoMode) return Promise.resolve({ data: s })
      return axios.put(`${API_BASE}/admin/settings`, s, authHeaders)
    },
    onSuccess: (res) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_settings'], res.data)
        showToast('Demo Mode: Site settings simulated locally!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_settings'])
        showToast('Settings saved successfully!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Save failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  // Messages Inbox
  const markMessageReadMutation = useMutation({
    mutationFn: (id) => {
      if (isDemoMode) return Promise.resolve({ data: id })
      return axios.put(`${API_BASE}/admin/contact-messages/${id}`, { status: 'READ' }, authHeaders)
    },
    onSuccess: (res, id) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_messages'], (old) => old.map(m => m.id === id ? { ...m, status: 'READ' } : m))
        showToast('Demo Mode: Message status simulated!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_messages'])
        showToast('Message marked as read!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Action failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })

  const deleteMessageMutation = useMutation({
    mutationFn: (id) => {
      if (isDemoMode) return Promise.resolve({ data: id })
      return axios.delete(`${API_BASE}/admin/contact-messages/${id}`, authHeaders)
    },
    onSuccess: (res, id) => {
      if (isDemoMode) {
        queryClient.setQueryData(['admin_messages'], (old) => old.filter(m => m.id !== id))
        showToast('Demo Mode: Message deletion simulated!', 'info')
      } else {
        queryClient.invalidateQueries(['admin_messages'])
        showToast('Message deleted successfully!', 'success')
      }
    },
    onError: (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        showToast('Session expired. Please log in again.', 'error')
        handleLogout()
      } else {
        showToast(`Delete failed: ${err.message || 'Unknown error'}`, 'error')
      }
    }
  })



  // Compute Telemetry Traffic Source Statistics
  const getTrafficSources = (logs) => {
    const sources = { LinkedIn: 0, GitHub: 0, Direct: 0, Other: 0 }
    if (!logs || !Array.isArray(logs)) return sources
    logs.forEach(log => {
      const ref = log.referrer || 'Direct'
      if (ref.includes('LinkedIn') || ref.includes('linkedin')) sources.LinkedIn += 1
      else if (ref.includes('GitHub') || ref.includes('github')) sources.GitHub += 1
      else if (ref === 'Direct') sources.Direct += 1
      else sources.Other += 1
    })
    return sources
  }

  const trafficStats = getTrafficSources(analytics.trafficLogs)

  // Load configuration details dynamically into form
  React.useEffect(() => {
    if (settings) {
      setSettingsForm(settings)
    }
  }, [settings])

  // --- Render Login Overlay if not Authenticated ---
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex flex-col items-center justify-center p-6 font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-[400px] bg-[#181C23] border border-[#252B35] p-8 rounded-lg shadow-xl space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-display font-extrabold text-2xl text-white tracking-wide">CMS Control Deck</h1>
            <p className="text-xs text-blue-500 font-mono tracking-wider uppercase">Authentication Required</p>
          </div>
          
          {loginError && <p className="text-xs text-red-500 text-center font-mono border border-red-500/20 bg-red-500/5 py-2 rounded-sm">{loginError}</p>}

          <div className="flex flex-col gap-2">
            <label htmlFor="user" className="text-xs font-mono uppercase text-slate-400">Admin User</label>
            <input 
              type="text" 
              id="user" 
              required
              className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-all duration-200" 
              placeholder="Username"
              value={loginCreds.username}
              onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pass" className="text-xs font-mono uppercase text-slate-400">Password</label>
            <input 
              type="password" 
              id="pass" 
              required
              className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none transition-all duration-200" 
              placeholder="••••••••"
              value={loginCreds.password}
              onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white font-bold rounded-md text-sm shadow-lg shadow-blue-500/20 transition-all duration-200">
            Access System
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F1115] flex text-slate-200 font-sans">
      {/* 1. Sidebar Panel */}
      <aside className="w-64 border-r border-[#252B35] bg-[#181C23] p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-extrabold text-white tracking-widest flex items-center gap-2">
              <Database className="text-blue-500" size={20} /> CMS CONSOLE
            </h2>
            {isDemoMode && <span className="text-[10px] text-amber-500 font-mono border border-amber-500/20 bg-amber-500/5 px-2.5 py-0.5 rounded-full mt-2 inline-block">Local Demo Mode</span>}
          </div>
          
          <nav className="space-y-1.5 text-sm text-slate-400 font-semibold">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'overview' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <LayoutDashboard size={16} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('projects')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'projects' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <Layers size={16} /> Projects
            </button>
            <button 
              onClick={() => setActiveTab('skills')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'skills' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <Award size={16} /> Skills
            </button>
            <button 
              onClick={() => setActiveTab('certifications')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'certifications' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <BookOpen size={16} /> Certifications
            </button>
            <button 
              onClick={() => setActiveTab('experience')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'experience' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <Briefcase size={16} /> Experience
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'settings' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <SettingsIcon size={16} /> Settings
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className={`w-full text-left py-2.5 px-4 rounded-md hover:bg-[#0F1115] hover:text-white flex items-center gap-3 transition-all ${activeTab === 'messages' ? 'bg-[#0F1115] text-blue-500 border-l-2 border-blue-500' : ''}`}
            >
              <Inbox size={16} /> Messages
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout} 
          className="w-full py-2.5 px-4 text-left rounded-md hover:bg-red-500/10 text-red-400 hover:text-red-300 flex items-center gap-3 font-semibold transition-all"
        >
          <LogOut size={16} /> Secure Exit
        </button>
      </aside>

      {/* 2. Main Page Grid */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center border-b border-[#252B35] pb-5">
          <h1 className="font-display font-extrabold text-3xl text-white capitalize">{activeTab}</h1>
          <div className="text-xs text-blue-500 font-mono bg-[#181C23] border border-[#252B35] px-4 py-2 rounded-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            CMS Link Status: Live
          </div>
        </header>

        {/* Tab 1: Overview Dashboard Home */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Telemetry Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#181C23] border border-[#252B35] p-6 rounded-lg space-y-2.5">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Total Visitors</span>
                <p className="text-4xl font-display font-extrabold text-white">{analytics.totalVisitors}</p>
                <span className="text-[10px] text-blue-400 flex items-center gap-1 font-mono">Dynamic visits metrics tracked</span>
              </div>
              <div className="bg-[#181C23] border border-[#252B35] p-6 rounded-lg space-y-2.5">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Downloads</span>
                <p className="text-4xl font-display font-extrabold text-white">{analytics.totalDownloads}</p>
                <span className="text-[10px] text-blue-400 flex items-center gap-1 font-mono">Resume clicks logged</span>
              </div>
              <div className="bg-[#181C23] border border-[#252B35] p-6 rounded-lg space-y-2.5">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Inbox Submissions</span>
                <p className="text-4xl font-display font-extrabold text-white">{messages.length}</p>
                <span className="text-[10px] text-blue-400 flex items-center gap-1 font-mono">{messages.filter(m=>m.status === 'UNREAD').length} unread messages</span>
              </div>
            </div>

            {/* Traffic Sources Telemetry */}
            <div className="bg-[#181C23] border border-[#252B35] p-6 rounded-lg space-y-4">
              <h3 className="text-sm font-bold text-blue-500 uppercase font-mono tracking-wider">Traffic Referral Streams</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(trafficStats).map(([key, val]) => (
                  <div key={key} className="bg-[#0F1115] border border-[#252B35] p-4 rounded-md text-center">
                    <span className="text-xs font-mono text-slate-400 block">{key}</span>
                    <span className="text-xl font-bold text-white block mt-1">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Visit/Click Telemetry Log */}
            <div className="bg-[#181C23] border border-[#252B35] p-6 rounded-lg space-y-4">
              <h3 className="text-sm font-bold text-blue-500 uppercase font-mono tracking-wider flex items-center gap-2">
                <Activity size={16} /> Click Telemetry Feed
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#0F1115] border-b border-[#252B35] text-slate-400 uppercase font-mono">
                    <tr>
                      <th className="py-2.5 px-4">Timestamp</th>
                      <th className="py-2.5 px-4">Event Type</th>
                      <th className="py-2.5 px-4">Target ID</th>
                      <th className="py-2.5 px-4">Device</th>
                      <th className="py-2.5 px-4">Country</th>
                      <th className="py-2.5 px-4">Referrer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252B35]/40 font-mono text-slate-300">
                    {analytics.trafficLogs.slice(0, 10).map((log, index) => (
                      <tr key={index} className="hover:bg-[#0F1115]/30">
                        <td className="py-2.5 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="py-2.5 px-4 font-bold text-blue-400">{log.metricType}</td>
                        <td className="py-2.5 px-4">{log.targetId}</td>
                        <td className="py-2.5 px-4">{log.deviceType}</td>
                        <td className="py-2.5 px-4">{log.country || 'Unknown'}</td>
                        <td className="py-2.5 px-4">{log.referrer}</td>
                      </tr>
                    ))}
                    {analytics.trafficLogs.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-slate-500">No telemetry log entries available yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-end">
              <button 
                onClick={() => openProjectModal({ title: '', description: '', githubUrl: '', demoUrl: '', readmeLink: '', challenges: '', features: '', featured: false, displayOrder: 0, statusEnum: 'PLANNING' })}
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10"
              >
                <PlusCircle size={14} /> Add Project Profile
              </button>
            </div>

            <div className="bg-[#181C23] border border-[#252B35] rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-[#0F1115] border-b border-[#252B35] text-slate-400 font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">GitHub Link</th>
                    <th className="py-3 px-4">Demo Link</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252B35]/30 text-slate-300">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#0F1115]/30">
                      <td className="py-3.5 px-4 font-semibold text-white">{proj.title}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-blue-400 select-all">{proj.githubUrl}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400 select-all">{proj.demoUrl}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs px-2 py-0.5 border border-blue-500/20 bg-blue-500/5 text-blue-400 rounded font-mono">{proj.statusEnum}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">{proj.featured ? 'YES' : 'NO'}</td>
                      <td className="py-3.5 px-4 flex gap-4 text-slate-400">
                        <button onClick={() => openProjectModal(proj)} className="hover:text-white transition"><Edit size={15} /></button>
                        <button onClick={() => setDeleteConfirm({ message: `Are you sure you want to delete project "${proj.title}"?`, onConfirm: () => deleteProjectMutation.mutate(proj.id) })} className="hover:text-red-400 transition"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Skills CRUD */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-end">
              <button 
                onClick={() => openSkillModal({ name: '', category: 'PROGRAMMING', confidence: 80, experienceLevel: 'Intermediate', displayOrder: 0, visible: true })}
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10"
              >
                <PlusCircle size={14} /> Add Skill Card
              </button>
            </div>

            <div className="bg-[#181C23] border border-[#252B35] rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-[#0F1115] border-b border-[#252B35] text-slate-400 font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Skill Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Confidence %</th>
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4">Visible</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252B35]/30 text-slate-300">
                  {skills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-[#0F1115]/30">
                      <td className="py-3.5 px-4 font-semibold text-white">{skill.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-blue-400">{skill.category}</td>
                      <td className="py-3.5 px-4 font-mono">{skill.confidence}%</td>
                      <td className="py-3.5 px-4">{skill.experienceLevel}</td>
                      <td className="py-3.5 px-4 font-mono">{skill.visible ? 'YES' : 'NO'}</td>
                      <td className="py-3.5 px-4 flex gap-4 text-slate-400">
                        <button onClick={() => openSkillModal(skill)} className="hover:text-white transition"><Edit size={15} /></button>
                        <button onClick={() => setDeleteConfirm({ message: `Are you sure you want to delete skill "${skill.name}"?`, onConfirm: () => deleteSkillMutation.mutate(skill.id) })} className="hover:text-red-400 transition"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Certifications CRUD */}
        {activeTab === 'certifications' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-end">
              <button 
                onClick={() => openCertModal({ name: '', organization: '', issueDate: '', verifyLink: '' })}
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10"
              >
                <PlusCircle size={14} /> Add Certification
              </button>
            </div>

            <div className="bg-[#181C23] border border-[#252B35] rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-[#0F1115] border-b border-[#252B35] text-slate-400 font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Issue Year</th>
                    <th className="py-3 px-4">Verify Link / PDF</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252B35]/30 text-slate-300">
                  {certifications.map((cert) => (
                    <tr key={cert.id} className="hover:bg-[#0F1115]/30">
                      <td className="py-3.5 px-4 font-semibold text-white">{cert.name}</td>
                      <td className="py-3.5 px-4">{cert.organization}</td>
                      <td className="py-3.5 px-4 font-mono">{cert.issueDate}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-blue-400 select-all">{cert.verifyLink}</td>
                      <td className="py-3.5 px-4 flex gap-4 text-slate-400">
                        <button onClick={() => openCertModal(cert)} className="hover:text-white transition"><Edit size={15} /></button>
                        <button onClick={() => setDeleteConfirm({ message: `Are you sure you want to delete certification "${cert.name}"?`, onConfirm: () => deleteCertMutation.mutate(cert.id) })} className="hover:text-red-400 transition"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Experience CRUD */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-end">
              <button 
                onClick={() => openExpModal({ company: '', role: '', duration: '', description: '' })}
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10"
              >
                <PlusCircle size={14} /> Add Experience Slot
              </button>
            </div>

            <div className="bg-[#181C23] border border-[#252B35] rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-[#0F1115] border-b border-[#252B35] text-slate-400 font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Company/Org</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252B35]/30 text-slate-300">
                  {experience.map((exp) => (
                    <tr key={exp.id} className="hover:bg-[#0F1115]/30">
                      <td className="py-3.5 px-4 font-semibold text-white">{exp.company}</td>
                      <td className="py-3.5 px-4">{exp.role}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-blue-400">{exp.duration}</td>
                      <td className="py-3.5 px-4 max-w-[320px] truncate text-slate-400">{exp.description}</td>
                      <td className="py-3.5 px-4 flex gap-4 text-slate-400">
                        <button onClick={() => openExpModal(exp)} className="hover:text-white transition"><Edit size={15} /></button>
                        <button onClick={() => setDeleteConfirm({ message: `Are you sure you want to delete experience slot at "${exp.company}"?`, onConfirm: () => deleteExpMutation.mutate(exp.id) })} className="hover:text-red-400 transition"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Site Settings Panel */}
        {activeTab === 'settings' && settingsForm && (() => {
          const isSettingsDirty = settings && JSON.stringify(settingsForm) !== JSON.stringify(settings)
          return (
            <div className="bg-[#181C23] border border-[#252B35] p-8 rounded-lg animate-fadeIn max-w-[700px] space-y-6">
              <h3 className="text-sm font-bold text-blue-500 uppercase font-mono tracking-wider">Configure Layout Variables</h3>
              
              {settingsStatus && <p className="text-xs text-blue-400 font-mono">{settingsStatus}</p>}

              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  saveSettingsMutation.mutate(settingsForm)
                }}
                className="space-y-4 text-sm"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-slate-400">Hero Title Headline</label>
                  <input 
                    type="text" 
                    required
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                    value={settingsForm.heroHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-slate-400">Hero Subtitle</label>
                  <textarea 
                    required
                    rows="3"
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none resize-none"
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-slate-400">Location Tag</label>
                    <input 
                      type="text" 
                      required
                      className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                      value={settingsForm.location}
                      onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-slate-400">Availability Status</label>
                    <input 
                      type="text" 
                      required
                      className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                      value={settingsForm.availability}
                      onChange={(e) => setSettingsForm({ ...settingsForm, availability: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase text-slate-400">Profile Image Path</label>
                  <input 
                    type="text" 
                    required
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                    value={settingsForm.profileImage}
                    onChange={(e) => setSettingsForm({ ...settingsForm, profileImage: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={saveSettingsMutation.isPending || !isSettingsDirty} 
                  className={`py-2.5 px-5 text-white font-bold rounded-md text-xs shadow-md transition-all flex items-center gap-2 ${
                    !isSettingsDirty 
                      ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed border border-[#252B35]' 
                      : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/10'
                  }`}
                >
                  {saveSettingsMutation.isPending ? 'Saving...' : 'Save Site Configurations'}
                  {isSettingsDirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>}
                </button>
              </form>
            </div>
          )
        })()}

        {/* Tab 7: Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="space-y-4 animate-fadeIn">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-[#181C23] border border-[#252B35] p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white text-base flex items-center gap-2">
                      {msg.senderName} 
                      {msg.status === 'UNREAD' && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono block mt-0.5">{msg.senderEmail}</span>
                  </div>
                  <div className="flex gap-2">
                    {msg.status === 'UNREAD' && (
                      <button onClick={() => markMessageReadMutation.mutate(msg.id)} className="py-1.5 px-3 border border-[#252B35] hover:border-blue-500 text-slate-200 hover:text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all">
                        <Check size={12} /> Mark Read
                      </button>
                    )}
                    <button onClick={() => setDeleteConfirm({ message: `Are you sure you want to delete this message from "${msg.senderName}"?`, onConfirm: () => deleteMessageMutation.mutate(msg.id) })} className="py-1.5 px-3 border border-[#252B35] hover:border-red-500 text-slate-200 hover:text-red-400 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-mono bg-[#0F1115] p-4 border border-[#252B35]/40 rounded-md whitespace-pre-wrap select-text">
                  {msg.messagePayload}
                </p>
              </div>
            ))}

            {messages.length === 0 && (
              <p className="text-sm text-center text-slate-500 font-mono py-12">Inbox clean. No incoming payload messages.</p>
            )}
          </div>
        )}
      </main>

      {/* --- CRUD Modal Form Overlays --- */}
      
      {/* 1. Projects Modal */}
      {projectModal && (
        <div className="fixed inset-0 bg-[#0F1115]/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-[#181C23] border border-[#252B35] w-full max-w-[650px] rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-[#0F1115] border-b border-[#252B35] px-6 py-4 flex justify-between items-center">
              <h3 className="font-display font-bold text-white text-base">{projectModal.id ? 'Edit Project Dossier' : 'Create Project Dossier'}</h3>
              <button onClick={() => handleCancelModal(setProjectModal, projectModal)} className="text-slate-400 hover:text-white transition-all"><X size={18} /></button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                const errors = validateForm('project', projectModal)
                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors)
                  showToast('Please correct form validation errors', 'error')
                  return
                }
                saveProjectMutation.mutate(projectModal)
              }}
              className="p-6 space-y-4 text-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Project Title</label>
                  <input 
                    type="text" required placeholder="Project Title"
                    className={`bg-[#0F1115] border ${formErrors.title ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={projectModal.title}
                    onChange={(e) => setProjectModal({...projectModal, title: e.target.value})}
                  />
                  {formErrors.title && <span className="text-[10px] text-red-400 font-mono">{formErrors.title}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Execution Status</label>
                  <select 
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    value={projectModal.statusEnum}
                    onChange={(e) => setProjectModal({...projectModal, statusEnum: e.target.value})}
                  >
                    <option value="PLANNING">PLANNING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Description Summary</label>
                <textarea 
                  required placeholder="Core description of what this project accomplished..."
                  className={`w-full bg-[#0F1115] border ${formErrors.description ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none resize-none`}
                  rows="3"
                  value={projectModal.description}
                  onChange={(e) => setProjectModal({...projectModal, description: e.target.value})}
                />
                {formErrors.description && <span className="text-[10px] text-red-400 font-mono">{formErrors.description}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">GitHub Repository URL</label>
                  <input 
                    type="text" placeholder="https://github.com/..."
                    className={`bg-[#0F1115] border ${formErrors.githubUrl ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={projectModal.githubUrl || ''}
                    onChange={(e) => setProjectModal({...projectModal, githubUrl: e.target.value})}
                  />
                  {formErrors.githubUrl && <span className="text-[10px] text-red-400 font-mono">{formErrors.githubUrl}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">README Link</label>
                  <input 
                    type="text" placeholder="https://github.com/...#readme"
                    className={`bg-[#0F1115] border ${formErrors.readmeLink ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={projectModal.readmeLink || ''}
                    onChange={(e) => setProjectModal({...projectModal, readmeLink: e.target.value})}
                  />
                  {formErrors.readmeLink && <span className="text-[10px] text-red-400 font-mono">{formErrors.readmeLink}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Live Demo URL</label>
                  <input 
                    type="text" placeholder="https://..."
                    className={`bg-[#0F1115] border ${formErrors.demoUrl ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={projectModal.demoUrl || ''}
                    onChange={(e) => setProjectModal({...projectModal, demoUrl: e.target.value})}
                  />
                  {formErrors.demoUrl && <span className="text-[10px] text-red-400 font-mono">{formErrors.demoUrl}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Technical Challenges</label>
                  <input 
                    type="text" placeholder="Sync state limits, database bottlenecks..."
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    value={projectModal.challenges || ''}
                    onChange={(e) => setProjectModal({...projectModal, challenges: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Core Features</label>
                  <input 
                    type="text" placeholder="Checklists, real-time sync, webhooks..."
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    value={projectModal.features || ''}
                    onChange={(e) => setProjectModal({...projectModal, features: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                  <input 
                    type="checkbox" 
                    className="rounded border-[#252B35] text-blue-500 bg-[#0F1115] focus:ring-0 w-4 h-4 cursor-pointer"
                    checked={projectModal.featured}
                    onChange={(e) => setProjectModal({...projectModal, featured: e.target.checked})}
                  />
                  Featured Bento Grid Project
                </label>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">Sort Order:</span>
                  <input 
                    type="number" 
                    className="w-16 bg-[#0F1115] border border-[#252B35] rounded-md px-2.5 py-1 text-white text-xs font-mono"
                    value={projectModal.displayOrder}
                    onChange={(e) => setProjectModal({...projectModal, displayOrder: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#252B35]/40">
                <button type="button" onClick={() => handleCancelModal(setProjectModal, projectModal)} className="py-2 px-4 border border-[#252B35] hover:bg-[#0F1115] rounded-md text-xs font-semibold transition-all">Cancel</button>
                <button 
                  type="submit" 
                  disabled={saveProjectMutation.isPending}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold rounded-md text-xs shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
                >
                  {saveProjectMutation.isPending ? 'Saving...' : 'Save Dossier'}
                  {projectModal && modalInitialData && JSON.stringify(projectModal) !== JSON.stringify(modalInitialData) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Skills Modal */}
      {skillModal && (
        <div className="fixed inset-0 bg-[#0F1115]/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-[#181C23] border border-[#252B35] w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-[#0F1115] border-b border-[#252B35] px-6 py-4 flex justify-between items-center">
              <h3 className="font-display font-bold text-white text-base">{skillModal.id ? 'Edit Skill Card' : 'Create Skill Card'}</h3>
              <button onClick={() => handleCancelModal(setSkillModal, skillModal)} className="text-slate-400 hover:text-white transition-all"><X size={18} /></button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                const errors = validateForm('skill', skillModal)
                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors)
                  showToast('Please correct form validation errors', 'error')
                  return
                }
                saveSkillMutation.mutate(skillModal)
              }}
              className="p-6 space-y-4 text-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Skill Name</label>
                  <input 
                    type="text" required placeholder="Skill Name"
                    className={`bg-[#0F1115] border ${formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={skillModal.name}
                    onChange={(e) => setSkillModal({...skillModal, name: e.target.value})}
                  />
                  {formErrors.name && <span className="text-[10px] text-red-400 font-mono">{formErrors.name}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Category Group</label>
                  <select 
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    value={skillModal.category}
                    onChange={(e) => setSkillModal({...skillModal, category: e.target.value})}
                  >
                    <option value="PROGRAMMING">PROGRAMMING</option>
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="BACKEND">BACKEND</option>
                    <option value="DATABASE">DATABASE</option>
                    <option value="AI">AI</option>
                    <option value="DATA_ANALYTICS">DATA_ANALYTICS</option>
                    <option value="TOOLS">TOOLS</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Proficiency Score ({skillModal.confidence}%)</label>
                <input 
                  type="range" min="1" max="100" className="accent-blue-500 h-1.5 cursor-pointer rounded bg-[#0F1115]"
                  value={skillModal.confidence}
                  onChange={(e) => setSkillModal({...skillModal, confidence: parseInt(e.target.value) || 50})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Experience Label</label>
                  <input 
                    type="text" placeholder="Advanced, Intermediate..."
                    className={`bg-[#0F1115] border ${formErrors.experienceLevel ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={skillModal.experienceLevel || ''}
                    onChange={(e) => setSkillModal({...skillModal, experienceLevel: e.target.value})}
                  />
                  {formErrors.experienceLevel && <span className="text-[10px] text-red-400 font-mono">{formErrors.experienceLevel}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Display Order</label>
                  <input 
                    type="number" 
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none font-mono"
                    value={skillModal.displayOrder}
                    onChange={(e) => setSkillModal({...skillModal, displayOrder: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  className="rounded border-[#252B35] text-blue-500 bg-[#0F1115] focus:ring-0 w-4 h-4 cursor-pointer"
                  checked={skillModal.visible}
                  onChange={(e) => setSkillModal({...skillModal, visible: e.target.checked})}
                />
                <span className="text-xs font-mono text-slate-400 cursor-pointer select-none">Make Skill Visible in Public List</span>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#252B35]/40">
                <button type="button" onClick={() => handleCancelModal(setSkillModal, skillModal)} className="py-2 px-4 border border-[#252B35] hover:bg-[#0F1115] rounded-md text-xs font-semibold transition-all">Cancel</button>
                <button 
                  type="submit" 
                  disabled={saveSkillMutation.isPending}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold rounded-md text-xs shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
                >
                  {saveSkillMutation.isPending ? 'Saving...' : 'Save Skill'}
                  {skillModal && modalInitialData && JSON.stringify(skillModal) !== JSON.stringify(modalInitialData) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Certifications Modal */}
      {certModal && (
        <div className="fixed inset-0 bg-[#0F1115]/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-[#181C23] border border-[#252B35] w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-[#0F1115] border-b border-[#252B35] px-6 py-4 flex justify-between items-center">
              <h3 className="font-display font-bold text-white text-base">{certModal.id ? 'Edit Certificate' : 'Create Certificate'}</h3>
              <button onClick={() => handleCancelModal(setCertModal, certModal)} className="text-slate-400 hover:text-white transition-all"><X size={18} /></button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                const errors = validateForm('cert', certModal)
                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors)
                  showToast('Please correct form validation errors', 'error')
                  return
                }
                saveCertMutation.mutate(certModal)
              }}
              className="p-6 space-y-4 text-sm"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Certification Name</label>
                <input 
                  type="text" required placeholder="Certification Name"
                  className={`bg-[#0F1115] border ${formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                  value={certModal.name}
                  onChange={(e) => setCertModal({...certModal, name: e.target.value})}
                />
                {formErrors.name && <span className="text-[10px] text-red-400 font-mono">{formErrors.name}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Issuing Organization</label>
                <input 
                  type="text" required placeholder="e.g. Cisco Networking Academy"
                  className={`bg-[#0F1115] border ${formErrors.organization ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                  value={certModal.organization}
                  onChange={(e) => setCertModal({...certModal, organization: e.target.value})}
                />
                {formErrors.organization && <span className="text-[10px] text-red-400 font-mono">{formErrors.organization}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Issue Year</label>
                  <input 
                    type="text" required placeholder="e.g. 2025"
                    className={`bg-[#0F1115] border ${formErrors.issueDate ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none font-mono`}
                    value={certModal.issueDate}
                    onChange={(e) => setCertModal({...certModal, issueDate: e.target.value})}
                  />
                  {formErrors.issueDate && <span className="text-[10px] text-red-400 font-mono">{formErrors.issueDate}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Sort Order</label>
                  <input 
                    type="number" 
                    className="bg-[#0F1115] border border-[#252B35] rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none font-mono"
                    value={certModal.displayOrder || 0}
                    onChange={(e) => setCertModal({...certModal, displayOrder: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Local Certificate Path</label>
                <input 
                  type="text" placeholder="/certifiactions/..."
                  className={`bg-[#0F1115] border ${formErrors.verifyLink ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none font-mono`}
                  value={certModal.verifyLink || ''}
                  onChange={(e) => setCertModal({...certModal, verifyLink: e.target.value})}
                />
                {formErrors.verifyLink && <span className="text-[10px] text-red-400 font-mono">{formErrors.verifyLink}</span>}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#252B35]/40">
                <button type="button" onClick={() => handleCancelModal(setCertModal, certModal)} className="py-2 px-4 border border-[#252B35] hover:bg-[#0F1115] rounded-md text-xs font-semibold transition-all">Cancel</button>
                <button 
                  type="submit" 
                  disabled={saveCertMutation.isPending}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold rounded-md text-xs shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
                >
                  {saveCertMutation.isPending ? 'Saving...' : 'Save Certification'}
                  {certModal && modalInitialData && JSON.stringify(certModal) !== JSON.stringify(modalInitialData) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Experience Modal */}
      {expModal && (
        <div className="fixed inset-0 bg-[#0F1115]/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-[#181C23] border border-[#252B35] w-full max-w-[550px] rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-[#0F1115] border-b border-[#252B35] px-6 py-4 flex justify-between items-center">
              <h3 className="font-display font-bold text-white text-base">{expModal.id ? 'Edit Experience Slot' : 'Create Experience Slot'}</h3>
              <button onClick={() => handleCancelModal(setExpModal, expModal)} className="text-slate-400 hover:text-white transition-all"><X size={18} /></button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                const errors = validateForm('exp', expModal)
                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors)
                  showToast('Please correct form validation errors', 'error')
                  return
                }
                saveExpMutation.mutate(expModal)
              }}
              className="p-6 space-y-4 text-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Company / Organization</label>
                  <input 
                    type="text" required placeholder="Company Name"
                    className={`bg-[#0F1115] border ${formErrors.company ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={expModal.company}
                    onChange={(e) => setExpModal({...expModal, company: e.target.value})}
                  />
                  {formErrors.company && <span className="text-[10px] text-red-400 font-mono">{formErrors.company}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400">Role Title</label>
                  <input 
                    type="text" required placeholder="Google Dev Intern..."
                    className={`bg-[#0F1115] border ${formErrors.role ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none`}
                    value={expModal.role}
                    onChange={(e) => setExpModal({...expModal, role: e.target.value})}
                  />
                  {formErrors.role && <span className="text-[10px] text-red-400 font-mono">{formErrors.role}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Duration Range</label>
                <input 
                  type="text" required placeholder="Dec 2025 - Present"
                  className={`bg-[#0F1115] border ${formErrors.duration ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none font-mono`}
                  value={expModal.duration}
                  onChange={(e) => setExpModal({...expModal, duration: e.target.value})}
                />
                {formErrors.duration && <span className="text-[10px] text-red-400 font-mono">{formErrors.duration}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Role Description & Accomplishments</label>
                <textarea 
                  required placeholder="Implemented mobile layouts, parameterized sql requests..."
                  className={`w-full bg-[#0F1115] border ${formErrors.description ? 'border-red-500/50 focus:border-red-500' : 'border-[#252B35] focus:border-blue-500'} rounded-md px-3 py-2 text-white focus:outline-none resize-none`}
                  rows="4"
                  value={expModal.description}
                  onChange={(e) => setExpModal({...expModal, description: e.target.value})}
                />
                {formErrors.description && <span className="text-[10px] text-red-400 font-mono">{formErrors.description}</span>}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#252B35]/40">
                <button type="button" onClick={() => handleCancelModal(setExpModal, expModal)} className="py-2 px-4 border border-[#252B35] hover:bg-[#0F1115] rounded-md text-xs font-semibold transition-all">Cancel</button>
                <button 
                  type="submit" 
                  disabled={saveExpMutation.isPending}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold rounded-md text-xs shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
                >
                  {saveExpMutation.isPending ? 'Saving...' : 'Save Slot'}
                  {expModal && modalInitialData && JSON.stringify(expModal) !== JSON.stringify(modalInitialData) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-[#0F1115]/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-[#181C23] border border-[#252B35] w-full max-w-[400px] rounded-lg shadow-2xl overflow-hidden p-6 space-y-6 animate-slideIn">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-white text-lg">Confirm Action</h3>
              <p className="text-sm text-slate-400">{deleteConfirm.message}</p>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setDeleteConfirm(null)} 
                className="py-2 px-4 border border-[#252B35] hover:bg-[#0F1115] rounded-md text-xs font-semibold transition-all"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={() => {
                  deleteConfirm.onConfirm()
                  setDeleteConfirm(null)
                }} 
                className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md text-xs shadow-md shadow-red-500/10 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-slideIn">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-2xl backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-[#181C23]/90 border-emerald-500/30 text-emerald-400' 
              : toast.type === 'error'
              ? 'bg-[#181C23]/90 border-red-500/30 text-red-400'
              : 'bg-[#181C23]/90 border-blue-500/30 text-blue-400'
          }`}>
            {toast.type === 'success' ? (
              <Check size={16} className="text-emerald-500" />
            ) : toast.type === 'error' ? (
              <X size={16} className="text-red-500" />
            ) : (
              <Activity size={16} className="text-blue-500 animate-pulse" />
            )}
            <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
            <button 
              onClick={() => setToast(null)} 
              className="ml-2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
