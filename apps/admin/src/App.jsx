import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { 
  LayoutDashboard, 
  Layers, 
  Award, 
  Briefcase, 
  Map, 
  Inbox, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  LogOut, 
  Database, 
  Eye, 
  Check, 
  Activity,
  FileText
} from 'lucide-react'

// Base REST API Configurations
const API_BASE = 'http://localhost:8080/api/v1'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const queryClient = useQueryClient()

  // CRUD Edit modals state
  const [projectForm, setProjectForm] = useState({ title: '', description: '', githubUrl: '', demoUrl: '', challenges: '', features: '', featured: false, displayOrder: 0, statusEnum: 'PLANNING' })
  const [skillForm, setSkillForm] = useState({ name: '', category: 'PROGRAMMING', confidence: 80, experienceLevel: 'Intermediate', displayOrder: 0, visible: true })
  
  // Custom mock fallbacks when offline/backend not started
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Auth headers
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  // 1. Authenticate login
  const handleLogin = (e) => {
    e.preventDefault()
    if (loginCreds.username === 'admin' && loginCreds.password === 'password') {
      // Simulate/Permit local login for presentation
      const fakeToken = "demo_jwt_token_auth_preset"
      setToken(fakeToken)
      localStorage.setItem('admin_token', fakeToken)
      setIsDemoMode(true)
      setLoginError('')
      return
    }

    axios.post(`${API_BASE}/auth/login`, loginCreds)
      .then(res => {
        const jwt = res.data.token
        setToken(jwt)
        localStorage.setItem('admin_token', jwt)
        setIsDemoMode(false)
        setLoginError('')
      })
      .catch(err => {
        setLoginError('Invalid administrator credentials.')
      })
  }

  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('admin_token')
    setIsDemoMode(false)
  }

  // --- CRUD Fetch & Actions ---
  const { data: analytics } = useQuery({
    queryKey: ['admin_analytics'],
    queryFn: () => axios.get(`${API_BASE}/admin/analytics`, authHeaders).then(res => res.data),
    enabled: !!token && !isDemoMode,
    initialData: { totalVisitors: 124, totalDownloads: 48, totalClicks: 320, trafficLogs: [] }
  })

  const { data: projects } = useQuery({
    queryKey: ['admin_projects'],
    queryFn: () => axios.get(`${API_BASE}/public/projects`).then(res => res.data),
    enabled: !!token,
    initialData: [
      { id: 1, title: "Jeevamitra", statusEnum: "COMPLETED", featured: true },
      { id: 2, title: "ATR OS", statusEnum: "IN_PROGRESS", featured: true }
    ]
  })

  const { data: skills } = useQuery({
    queryKey: ['admin_skills'],
    queryFn: () => axios.get(`${API_BASE}/public/skills`).then(res => res.data),
    enabled: !!token,
    initialData: [
      { id: 1, name: "Java", category: "PROGRAMMING", confidence: 95 },
      { id: 2, name: "Spring Boot", category: "BACKEND", confidence: 92 }
    ]
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

  // MUTATIONS (CRUD Actions)
  const addProjectMutation = useMutation({
    mutationFn: (p) => axios.post(`${API_BASE}/admin/projects`, p, authHeaders),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin_projects'])
      setProjectForm({ title: '', description: '', githubUrl: '', demoUrl: '', challenges: '', features: '', featured: false, displayOrder: 0, statusEnum: 'PLANNING' })
    }
  })

  const addSkillMutation = useMutation({
    mutationFn: (s) => axios.post(`${API_BASE}/admin/skills`, s, authHeaders),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin_skills'])
      setSkillForm({ name: '', category: 'PROGRAMMING', confidence: 80, experienceLevel: 'Intermediate', displayOrder: 0, visible: true })
    }
  })

  // --- Render Login Overlay if not Authenticated ---
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-[400px] bg-surface border border-cardBorder p-6 rounded-md space-y-4">
          <div className="text-center space-y-1">
            <h1 className="font-display font-bold text-xl text-white">Private Command Center</h1>
            <p className="text-xs text-muted font-mono">Authentication required.</p>
          </div>
          
          {loginError && <p className="text-xs text-red-500 text-center font-mono">{loginError}</p>}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="user" className="text-xs font-mono uppercase text-muted">Admin User</label>
            <input 
              type="text" 
              id="user" 
              required
              className="bg-background border border-cardBorder rounded-sm px-4 py-2 text-white text-sm focus:border-primary focus:outline-none transition" 
              placeholder="Username"
              value={loginCreds.username}
              onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="pass" className="text-xs font-mono uppercase text-muted">Password</label>
            <input 
              type="password" 
              id="pass" 
              required
              className="bg-background border border-cardBorder rounded-sm px-4 py-2 text-white text-sm focus:border-primary focus:outline-none transition" 
              placeholder="••••••••"
              value={loginCreds.password}
              onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full py-2 bg-primary hover:bg-primary/95 text-white font-semibold rounded-sm text-sm transition">
            Access System
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* 1. Sidebar */}
      <aside className="w-64 border-r border-cardBorder bg-surface p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-bold text-white tracking-wider flex items-center gap-2"><Database className="text-primary" size={18} /> CMS DECK</h2>
            {isDemoMode && <span className="text-[10px] text-accent font-mono border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full mt-1 inline-block">Local Demo Mode</span>}
          </div>
          
          <nav className="space-y-2 text-sm text-slate-300 font-medium">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full text-left py-2 px-3 rounded-sm hover:bg-background flex items-center gap-2.5 transition ${activeTab === 'overview' ? 'bg-background text-primary' : ''}`}
            >
              <LayoutDashboard size={16} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('projects')} 
              className={`w-full text-left py-2 px-3 rounded-sm hover:bg-background flex items-center gap-2.5 transition ${activeTab === 'projects' ? 'bg-background text-primary' : ''}`}
            >
              <Layers size={16} /> Projects
            </button>
            <button 
              onClick={() => setActiveTab('skills')} 
              className={`w-full text-left py-2 px-3 rounded-sm hover:bg-background flex items-center gap-2.5 transition ${activeTab === 'skills' ? 'bg-background text-primary' : ''}`}
            >
              <Award size={16} /> Skills
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className={`w-full text-left py-2 px-3 rounded-sm hover:bg-background flex items-center gap-2.5 transition ${activeTab === 'messages' ? 'bg-background text-primary' : ''}`}
            >
              <Inbox size={16} /> Messages
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout} 
          className="w-full py-2 px-3 text-left rounded-sm hover:bg-red-500/10 text-red-400 hover:text-red-300 flex items-center gap-2.5 font-medium transition"
        >
          <LogOut size={16} /> Secure Exit
        </button>
      </aside>

      {/* 2. Main Page Grid */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center border-b border-cardBorder pb-4">
          <h1 className="font-display font-bold text-2xl text-white capitalize">{activeTab}</h1>
          <div className="text-xs text-muted font-mono bg-surface border border-cardBorder px-3 py-1.5 rounded-sm">
            Status: Connection Active
          </div>
        </header>

        {/* Tab 1: Overview Dashboard Home */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Telemetry Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface border border-cardBorder p-5 rounded-md space-y-2">
                <span className="text-xs text-muted uppercase font-mono">Today's Visitors</span>
                <p className="text-3xl font-display font-bold text-white">{analytics.totalVisitors}</p>
                <span className="text-[10px] text-success flex items-center gap-1 font-mono">Live traffic tracking active</span>
              </div>
              <div className="bg-surface border border-cardBorder p-5 rounded-md space-y-2">
                <span className="text-xs text-muted uppercase font-mono">Resume Downloads</span>
                <p className="text-3xl font-display font-bold text-white">{analytics.totalDownloads}</p>
                <span className="text-[10px] text-accent flex items-center gap-1 font-mono">Auto update current.pdf</span>
              </div>
              <div className="bg-surface border border-cardBorder p-5 rounded-md space-y-2">
                <span className="text-xs text-muted uppercase font-mono">Inbox Messages</span>
                <p className="text-3xl font-display font-bold text-white">{messages.length}</p>
                <span className="text-[10px] text-success flex items-center gap-1 font-mono">{messages.filter(m=>m.status === 'UNREAD').length} unread submissions</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface border border-cardBorder p-6 rounded-md space-y-4">
              <h3 className="text-sm font-bold text-accent uppercase font-mono">Quick Actions</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className="py-2.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-sm text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus size={14} /> Add New Project
                </button>
                <button 
                  onClick={() => setActiveTab('skills')} 
                  className="py-2.5 px-4 border border-cardBorder hover:border-primary text-slate-200 hover:text-white rounded-sm text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus size={14} /> Add Skill Card
                </button>
              </div>
            </div>

            {/* System Action Log timeline */}
            <div className="bg-surface border border-cardBorder p-6 rounded-md space-y-4">
              <h3 className="text-sm font-bold text-accent uppercase font-mono flex items-center gap-2"><Activity size={16} /> Admin Activity Log</h3>
              <div className="space-y-3 font-mono text-xs max-h-[180px] overflow-y-auto">
                {activityLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-4 border-b border-cardBorder/30 pb-2">
                    <span className="text-muted">{log.timestamp.slice(11,19)}</span>
                    <span className="text-primary">[{log.actionType}]</span>
                    <span className="text-slate-300">{log.details}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Quick Add Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                addProjectMutation.mutate(projectForm)
              }} 
              className="bg-surface border border-cardBorder p-6 rounded-md space-y-4"
            >
              <h3 className="text-sm font-bold text-accent uppercase font-mono">Create Project Dossier</h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Project Title"
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                />
                <select 
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  value={projectForm.statusEnum}
                  onChange={(e) => setProjectForm({...projectForm, statusEnum: e.target.value})}
                >
                  <option value="PLANNING">PLANNING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
              <textarea 
                required
                placeholder="Description payload"
                className="w-full bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none resize-none"
                rows="3"
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="GitHub Link"
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  value={projectForm.githubUrl}
                  onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Demo Link"
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  value={projectForm.demoUrl}
                  onChange={(e) => setProjectForm({...projectForm, demoUrl: e.target.value})}
                />
              </div>

              <button type="submit" className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-sm text-xs font-semibold transition">
                Save Project
              </button>
            </form>

            {/* Project list table */}
            <div className="bg-surface border border-cardBorder rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-background border-b border-cardBorder text-slate-300 font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cardBorder/30 text-slate-300">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-background/40">
                      <td className="py-3.5 px-4 font-semibold text-white">{proj.title}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs px-2 py-0.5 border border-primary/20 bg-primary/5 text-accent rounded-sm font-mono">{proj.statusEnum}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">{proj.featured ? 'YES' : 'NO'}</td>
                      <td className="py-3.5 px-4 flex gap-3 text-muted">
                        <button className="hover:text-white transition"><Edit size={14} /></button>
                        <button className="hover:text-red-400 transition"><Trash2 size={14} /></button>
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
          <div className="space-y-6">
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                addSkillMutation.mutate(skillForm)
              }} 
              className="bg-surface border border-cardBorder p-6 rounded-md space-y-4"
            >
              <h3 className="text-sm font-bold text-accent uppercase font-mono">Create Skill Card</h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Skill Name"
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                />
                <select 
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
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
              
              <div className="flex gap-6 items-center">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-muted">Confidence ({skillForm.confidence}%)</label>
                  <input 
                    type="range" 
                    min="1" max="100"
                    value={skillForm.confidence}
                    className="accent-primary"
                    onChange={(e) => setSkillForm({...skillForm, confidence: parseInt(e.target.value)})}
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Exp level (e.g. Advanced)"
                  className="bg-background border border-cardBorder rounded-sm px-3 py-2 text-white text-sm focus:border-primary focus:outline-none h-9 mt-4"
                  value={skillForm.experienceLevel}
                  onChange={(e) => setSkillForm({...skillForm, experienceLevel: e.target.value})}
                />
              </div>

              <button type="submit" className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-sm text-xs font-semibold transition">
                Save Skill
              </button>
            </form>

            <div className="bg-surface border border-cardBorder rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-background border-b border-cardBorder text-slate-300 font-mono text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Confidence</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cardBorder/30 text-slate-300">
                  {skills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-background/40">
                      <td className="py-3.5 px-4 font-semibold text-white">{skill.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-accent">{skill.category}</td>
                      <td className="py-3.5 px-4 font-mono">{skill.confidence}%</td>
                      <td className="py-3.5 px-4 flex gap-3 text-muted">
                        <button className="hover:text-white transition"><Edit size={14} /></button>
                        <button className="hover:text-red-400 transition"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-surface border border-cardBorder p-5 rounded-md space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                        {msg.senderName} 
                        {msg.status === 'UNREAD' && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                      </h3>
                      <span className="text-xs text-muted font-mono">{msg.senderEmail}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="py-1 px-2.5 border border-cardBorder hover:border-primary text-slate-200 hover:text-white rounded-sm text-xs font-semibold flex items-center gap-1.5 transition">
                        <Check size={12} /> Mark Read
                      </button>
                      <button className="py-1 px-2.5 border border-cardBorder hover:border-red-400 text-slate-200 hover:text-red-300 rounded-sm text-xs font-semibold flex items-center gap-1.5 transition">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-mono bg-background/50 p-3 border border-cardBorder/30 rounded-sm">
                    {msg.messagePayload}
                  </p>
                </div>
              ))}

              {messages.length === 0 && (
                <p className="text-sm text-center text-muted font-mono py-8">Inbox clean. No incoming payload messages.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
