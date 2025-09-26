'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import cloudLottie from './cloud-lottie.json'

// --- Data ---
const socialLinks = [
  { name: 'GitHub', icon: 'https://www.svgrepo.com/show/303615/github-icon-1-logo.svg', url: 'https://github.com/Clementvsc' },
  { name: 'LinkedIn', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg', url: 'https://www.linkedin.com/in/sahaya-clement/' },
]

const projects = [
  { title: 'Rain Game', desc: 'Fun animated browser game.', type: 'Lab', url: 'https://codepen.io/Yasio/full/vYYNWxB', tags: ['Canvas','Game'], image: 'https://codepen.io/Yasio/full/vYYNWxB/image/large.jpg', video: '', featured: true },
  { title: 'FaceDetect Mask App', desc: 'Real-time face detection + mask overlay.', type: 'Lab', url: 'https://codepen.io/Yasio/details/MPmvJb', tags: ['ML','Browser'], image: 'https://codepen.io/Yasio/details/MPmvJb/image/large.jpg', video: '', featured: true },
  { title: 'Cloud Compliance Dash', desc: 'Realtime dashboards for AWS/Azure/GCP', type: 'Web', url: 'https://vercel.com/dashboard', tags: ['Next.js','AWS'], image: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=600', video: 'https://www.w3schools.com/html/mov_bbb.mp4', featured: true},
  { title: 'Mobile SOC Monitor', desc: 'CyberSOC metrics at your fingertips.', type: 'Mobile', url: 'https://expo.dev/@clementvsc/soc-monitor', tags: ['Flutter','Firebase'], image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600', video: '', featured: true },
  { title: 'ThreatML Playground', desc: 'ML-powered threat detection demo.', type: 'Lab', url: 'https://github.com/Clementvsc/threatml', tags: ['Python','Scikit-Learn'], image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?w=600', video: '' },
]

const labs = [
  { title: 'Rain Game', emoji: '🌧️', url: 'https://codepen.io/Yasio/full/vYYNWxB' },
  { title: 'Coding Hero', emoji: '🦸‍♂️', url: 'https://codepen.io/Yasio/details/eXBRYP' },
  { title: 'FaceDetect Mask App', emoji: '🤳', url: 'https://codepen.io/Yasio/details/MPmvJb' },
]

const timeline = [
  { year: '2025', label: 'Graduated (Cloud, Cybersecurity)', icon: '🎓' },
  { year: '2024', label: 'Built Modern Portfolio', icon: '💻' },
  { year: '2022-2023', label: 'PG Certifications, Projects', icon: '📜' },
]

const certifications = [
  { label: 'Cloud Computing (PG Cert)', by: 'Humber College' },
  { label: 'Cybersecurity & Threat Mgmt (PG Cert)', by: 'Humber College' },
]

const skills = ['AWS','Azure','Terraform','Kubernetes','Python','TypeScript','React','SIEM','DevOps','Next.js','Tailwind','Git']

const testimonials = [
  { quote: 'Clement is a fast learner with outstanding IT skills.', name: 'Dr. John Smith' },
  { quote: 'Brought our cloud project to life—thoroughly recommend!', name: 'Rachel Adams' },
]

function useAutoCarousel(length: number, delay = 5200) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (length < 2) return
    const timer = setTimeout(() => setIdx(i => (i + 1) % length), delay)
    return () => clearTimeout(timer)
  }, [idx, length, delay])
  return [idx, setIdx] as const
}

function FeaturedProjectCarousel({ projects }: { projects: any[] }) {
  const featured = projects.filter(p => p.featured)
  const [idx, setIdx] = useAutoCarousel(featured.length, 4200)
  if (!featured.length) return null
  const current = featured[idx % featured.length]
  return (
    <div className="mb-7 relative group rounded-2xl overflow-hidden shadow-xl border-2 border-violet-700">
      {current.video ? (
        <video autoPlay className="w-full h-60 object-cover" loop muted playsInline src={current.video} />
      ) : (
        <img alt={current.title} className="w-full h-60 object-cover" src={current.image} />
      )}
      <div className="absolute left-0 right-0 bottom-0 px-7 py-4 bg-zinc-900/70 flex flex-col">
        <div className="text-lg font-bold text-violet-100">{current.title}</div>
        <div className="text-xs text-violet-400">{current.tags?.map((t: string) => '#' + t).join(' ')}</div>
        <div className="text-sm text-zinc-200 mt-1">{current.desc}</div>
        <div className="flex gap-3 mt-2">
          <a className="text-xs px-3 py-1 bg-violet-600 rounded shadow font-bold text-white hover:bg-violet-700 transition" href={current.url} target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
      </div>
      <button className="absolute left-1 top-1/2 bg-zinc-900/80 px-2 py-2 text-2xl rounded-full -translate-y-1/2 hover:bg-violet-800" onClick={() => setIdx((i) => (i - 1 + featured.length) % featured.length)}>‹</button>
      <button className="absolute right-1 top-1/2 bg-zinc-900/80 px-2 py-2 text-2xl rounded-full -translate-y-1/2 hover:bg-violet-800" onClick={() => setIdx((i) => (i + 1) % featured.length)}>›</button>
      <div className="absolute right-9 bottom-3 flex gap-1">
        {featured.map((_, i) => (
          <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === idx ? 'bg-white' : 'bg-zinc-500'}`} />
        ))}
      </div>
    </div>
  )
}

function ProjectPopup({ project, onClose }: { project: any; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/70 flex z-50 items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-zinc-950 border-2 border-violet-700 max-w-lg w-[97vw] rounded-2xl p-8 shadow-2xl relative text-zinc-100" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 0.99, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }}>
          <button className="absolute top-3 right-5 text-violet-400 hover:text-yellow-200 text-3xl font-bold" onClick={onClose}>×</button>
          <div className="font-bold text-2xl mb-1">{project?.title}</div>
          <div className="flex gap-2 flex-wrap text-xs text-violet-300 mb-2 font-mono">
            {project?.tags?.map((t: string, idx: number) => (
              <span key={idx}>#{t}</span>
            ))}
          </div>
          {project.video ? (
            <video className="w-full h-48 rounded-xl mb-3 object-cover" controls src={project.video} />
          ) : (
            <img className="w-full rounded-xl mb-3 object-cover" alt="" src={project.image} />
          )}
          <div className="mb-4 text-zinc-100">{project?.desc}</div>
          <a className="text-violet-200 font-bold hover:underline" href={project?.url} target="_blank" rel="noopener noreferrer">View Live Demo</a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function SVGBackground() {
  return (
    <svg className="fixed inset-0 z-0 w-full h-full pointer-events-none" viewBox="0 0 1440 850" fill="none" style={{ opacity: 0.41 }}>
      <defs>
        <linearGradient id="a" x1="0" y1="0" x2="900" y2="900" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M0,720 Q360,650 720,900 Q1080,1150 1440,800 V0 H0 Z" fill="url(#a)" fillOpacity={0.8} />
    </svg>
  )
}

export default function Page() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [modal, setModal] = useState<number | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [testiIdx] = useAutoCarousel(testimonials.length)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    document.body.style.background = theme === 'dark'
      ? 'radial-gradient(ellipse at 60% 30%, #191b27 65%, #151622 95%)'
      : 'radial-gradient(ellipse at 40% 50%, #dbeafe 78%, #fff0 100%)'
  }, [theme])

  const filtered = filter ? projects.filter(p => p.type === filter) : projects
  const heroType = ['Cloud Engineer','Security Specialist','Fullstack Dev','SIEM Enthusiast','Open to New Opportunities'][testiIdx % 5]

  return (
    <div className="min-h-screen flex flex-row bg-zinc-950 dark:bg-zinc-950 text-zinc-100 overflow-x-hidden font-mono">
      <SVGBackground />
      {/* Sidebar */}
      <aside className="hidden md:flex w-[265px] sticky top-0 min-h-screen flex-col z-40 border-r bg-zinc-900/90 border-zinc-800 py-8 gap-8">
        <div className="flex gap-3 items-center px-6 mb-4">
          <div className="w-12 h-12">
            <Player autoplay loop src={cloudLottie} style={{ height: '48px', width: '48px' }} />
          </div>
          <div>
            <div className="font-bold leading-none text-violet-400 text-lg">Clement</div>
            <div className="text-xs text-zinc-400 tracking-tight">Cloud &amp; Security Engineer</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-base px-6">
          <a className="hover:text-violet-300 font-semibold" href="#work">WORK</a>
          <a className="hover:text-blue-300 font-semibold" href="#lab">LAB</a>
          <a className="hover:text-green-200 font-semibold" href="#about">ABOUT</a>
          <a className="hover:text-yellow-200 font-semibold" href="#contact">CONTACT</a>
        </nav>
        <div className="flex gap-4 px-6 mt-auto items-center">
          {socialLinks.map(s => (
            <a href={s.url} key={s.name} target="_blank" rel="noopener">
              <img alt={s.name} className="w-7 h-7 bg-zinc-800 border border-zinc-700 p-1 rounded-full" src={s.icon} />
            </a>
          ))}
          <motion.button
            aria-label="Toggle theme"
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            className={`ml-auto px-2 py-1 rounded-full border border-zinc-700 shadow-lg text-2xl transition-colors ${theme === 'dark' ? 'bg-yellow-400/10 text-yellow-200 ring-yellow-200' : 'bg-indigo-200/20 text-indigo-900 ring-indigo-200'}`}
            whileTap={{ scale: 0.9, rotate: theme === 'dark' ? 6 : -6 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Hero */}
        <motion.section
          id="hero"
          className="pt-11 pb-16 px-5 md:px-20 min-h-[330px] md:min-h-[380px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black mb-2 tracking-tight">Sahaya Clement Vincent Martin</h1>
            <div className="text-2xl mb-3 text-violet-200 min-h-[2.5em]">{heroType}</div>
            <motion.p className="mt-1 text-base text-zinc-200 max-w-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              Young Cloud/Security/DevOps architect with a passion for automation, SIEM, and modern fullstack projects. <span className="hidden md:inline">Looking for my first IT job—let’s connect!</span>
            </motion.p>
            <div className="flex gap-5 mt-7">
              <a className="rounded-xl px-7 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-violet-600 shadow border-2 border-indigo-400 hover:scale-105 transition" href="#contact">Contact Me</a>
              <a className="rounded-xl px-7 py-3 text-indigo-900 bg-white/90 font-bold border border-indigo-200 hover:bg-violet-100 shadow hover:scale-105 transition" href="/resume.pdf" download>
                Download CV
              </a>
            </div>
          </div>
        </motion.section>

        {/* Work */}
        <motion.section
          id="work"
          className="w-full mb-8 px-5 md:px-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.9 }}
        >
          <h2 className="text-2xl font-bold text-violet-300 mb-3">WORK</h2>
          <FeaturedProjectCarousel projects={projects} />

          <div className="flex mb-2 gap-6 items-center">
            <div className="font-semibold text-sm text-zinc-300">All projects</div>
            <div className="flex gap-2">
              <button onClick={() => setFilter(null)} className={`px-3 py-1 rounded text-xs font-bold
