'use client'
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import cloudLottie from './cloud-lottie.json';

// --- Data ---
const socialLinks = [
  { name: "GitHub", icon: "https://www.svgrepo.com/show/303615/github-icon-1-logo.svg", url: "https://github.com/Clementvsc" },
  { name: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", url: "https://www.linkedin.com/in/sahaya-clement/" }
];
const projects = [
  { title: "Rain Game", desc: "Fun animated browser game.", type: "Lab", url: "https://codepen.io/Yasio/full/vYYNWxB", tags: ["Canvas", "Game"], image: "https://codepen.io/Yasio/full/vYYNWxB/image/large.jpg", video: "", featured:true },
  { title: "FaceDetect Mask App", desc: "Real-time face detection + mask overlay.", type: "Lab", url: "https://codepen.io/Yasio/details/MPmvJb", tags: ["ML", "Browser"], image: "https://codepen.io/Yasio/details/MPmvJb/image/large.jpg", video: "", featured:true },
  { title: "Cloud Compliance Dash", desc: "Realtime dashboards for AWS/Azure/GCP", type: "Web", url: "https://vercel.com/dashboard", tags: ["Next.js", "AWS"], image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=600", video: "https://www.w3schools.com/html/mov_bbb.mp4", featured: true},
  { title: "Mobile SOC Monitor", desc: "CyberSOC metrics at your fingertips.", type: "Mobile", url: "https://expo.dev/@clementvsc/soc-monitor", tags: ["Flutter", "Firebase"], image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600", video: "", featured: true },
  { title: "ThreatML Playground", desc: "ML-powered threat detection demo.", type: "Lab", url: "https://github.com/Clementvsc/threatml", tags: ["Python", "Scikit-Learn"], image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?w=600", video: "" },
];

const labs = [
  { title: "Rain Game", emoji: "🌧️", url: "https://codepen.io/Yasio/full/vYYNWxB" },
  { title: "Coding Hero", emoji: "🦸‍♂️", url: "https://codepen.io/Yasio/details/eXBRYP" },
  { title: "FaceDetect Mask App", emoji: "🤳", url: "https://codepen.io/Yasio/details/MPmvJb" },
];

const timeline = [
  { year: "2025", label: "Graduated (Cloud, Cybersecurity)", icon: "🎓" },
  { year: "2024", label: "Built Modern Portfolio", icon: "💻" },
  { year: "2022-2023", label: "PG Certifications, Projects", icon: "📜" }
];
const certifications = [
  { label: "Cloud Computing (PG Cert)", by: "Humber College" },
  { label: "Cybersecurity & Threat Mgmt (PG Cert)", by: "Humber College" }
];
const skills = [
  "AWS", "Azure", "Terraform", "Kubernetes", "Python", "TypeScript", "React", "SIEM", "DevOps", "Next.js", "Tailwind", "Git"
];
const testimonials = [
  { quote: "Clement is a fast learner with outstanding IT skills.", name: "Dr. John Smith" },
  { quote: "Brought our cloud project to life—thoroughly recommend!", name: "Rachel Adams" }
];

// --- Featured project carousel ---
function useAutoCarousel(length: number, delay=5200): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    const timer = setTimeout(() => setIdx(i => (i + 1) % length), delay);
    return () => clearTimeout(timer);
  }, [idx, length, delay]);
  return [idx, setIdx];
}

function FeaturedProjectCarousel({ projects }: { projects: any[] }) {
  const featured = projects.filter(p=>p.featured);
  const [idx, setIdx] = useAutoCarousel(featured.length, 4200);
  if (!featured.length) return null;
  const current = featured[idx % featured.length];
  return (
    <div className="mb-7 relative group rounded-2xl overflow-hidden shadow-xl border-2 border-violet-700">
      {current.video
        ? <video src={current.video} autoPlay loop muted playsInline className="w-full h-60 object-cover" />
        : <img src={current.image} className="w-full h-60 object-cover" alt={current.title} />
      }
      <div className="absolute left-0 right-0 bottom-0 px-7 py-4 bg-zinc-900/70 flex flex-col">
        <div className="text-lg font-bold text-violet-100">{current.title}</div>
        <div className="text-xs text-violet-400">{current.tags?.map((t:string)=>"#"+t).join(" ")}</div>
        <div className="text-sm text-zinc-200 mt-1">{current.desc}</div>
        <div className="flex gap-3 mt-2">
          <a href={current.url} target="_blank" className="text-xs px-3 py-1 bg-violet-600 rounded shadow font-bold text-white hover:bg-violet-700 transition">Live Demo</a>
        </div>
      </div>
      <button className="absolute left-1 top-1/2 bg-zinc-900/80 px-2 py-2 text-2xl rounded-full -translate-y-1/2 hover:bg-violet-800" onClick={()=>setIdx((i)=>(i-1+featured.length)%featured.length)}>‹</button>
      <button className="absolute right-1 top-1/2 bg-zinc-900/80 px-2 py-2 text-2xl rounded-full -translate-y-1/2 hover:bg-violet-800" onClick={()=>setIdx((i)=>(i+1)%featured.length)}>›</button>
      <div className="absolute right-9 bottom-3 flex gap-1">
        {featured.map((_,i) => <span key={i} className={`inline-block w-2 h-2 rounded-full ${i===idx?"bg-violet-200":"bg-zinc-700"}`} />)}
      </div>
    </div>
  );
}

function ProjectPopup({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 bg-black/70 flex z-50 items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="bg-zinc-950 border-2 border-violet-700 max-w-lg w-[97vw] rounded-2xl p-8 shadow-2xl relative text-zinc-100"
        initial={{ scale: .9, y: -60, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: .95, y: 60, opacity: 0 }}>
        <button className="absolute top-3 right-5 text-violet-400 hover:text-yellow-200 text-3xl font-bold" onClick={onClose}>×</button>
        <div className="font-bold text-2xl mb-1">{project?.title}</div>
        <div className="flex gap-2 flex-wrap text-xs text-violet-300 mb-2 font-mono">{project?.tags?.map((t: string, idx: number) => <span key={idx}>#{t}</span>)}</div>
        {project.video ? <video src={project.video} controls className="w-full h-48 rounded-xl mb-3 object-cover" /> : <img src={project.image} alt="" className="w-full rounded-xl mb-3 object-cover" />}
        <div className="mb-4 text-zinc-100">{project?.desc}</div>
        <a href={project?.url} className="text-violet-200 font-bold hover:underline" target="_blank">View Live Demo</a>
      </motion.div>
    </motion.div>
  );
}

function SVGBackground() {
  return (
    <svg className="fixed inset-0 z-0 w-full h-full pointer-events-none" viewBox="0 0 1440 850" fill="none" style={{ opacity: .41 }}>
      <path fill="url(#a)" fillOpacity=".8"
        d="M0,720 Q360,650 720,900 Q1080,1150 1440,800 V0 H0 Z" />
      <defs>
        <linearGradient id="a" x1="0" y1="0" x2="900" y2="900" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Page() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [modal, setModal] = useState<null | number>(null);
  const [filter, setFilter] = useState<null | string>(null);
  const [testiIdx, setTestiIdx] = useAutoCarousel(testimonials.length);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    document.body.style.background = theme === "dark"
      ? "radial-gradient(ellipse at 60% 30%, #191b27 65%, #151622 95%)"
      : "radial-gradient(ellipse at 40% 50%, #dbeafe 78%, #fff0 100%)";
  }, [theme]);
  const filtered = filter ? projects.filter(p => p.type === filter) : projects;
  const heroType = ["Cloud Engineer", "Security Specialist", "Fullstack Dev", "SIEM Enthusiast", "Open to New Opportunities"][testiIdx % 5];

  return (
    <div className="min-h-screen flex flex-row bg-zinc-950 dark:bg-zinc-950 text-zinc-100 overflow-x-hidden font-mono">
      <SVGBackground />
      {/* ---- SIDEBAR ---- */}
      <aside className="hidden md:flex w-[265px] sticky top-0 min-h-screen flex-col z-40 border-r bg-zinc-900/90 border-zinc-800 py-8 gap-8">
        <div className="flex gap-3 items-center px-6 mb-4">
          <div className="w-12 h-12"><Player autoplay loop src={cloudLottie} style={{height:"48px", width:"48px"}}/></div>
          <div>
            <div className="font-bold leading-none text-violet-400 text-lg">Clement</div>
            <div className="text-xs text-zinc-400 tracking-tight">Cloud & Security Engineer</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-base px-6">
          <a href="#work" className="hover:text-violet-300 font-semibold">WORK</a>
          <a href="#lab" className="hover:text-blue-300 font-semibold">LAB</a>
          <a href="#about" className="hover:text-green-200 font-semibold">ABOUT</a>
          <a href="#contact" className="hover:text-yellow-200 font-semibold">CONTACT</a>
        </nav>
        <div className="flex gap-4 px-6 mt-auto items-center">
          {socialLinks.map(s =>
            <a key={s.name} href={s.url} target="_blank" rel="noopener">
              <img src={s.icon} alt={s.name} className="w-7 h-7 bg-zinc-800 border border-zinc-700 p-1 rounded-full" />
            </a>
          )}
          <motion.button aria-label="Toggle theme"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className={`ml-auto px-2 py-1 rounded-full border border-zinc-700 shadow-lg text-2xl transition-colors ${theme === 'dark' ? 'bg-yellow-400/10 text-yellow-200 ring-yellow-200' : 'bg-indigo-200/20 text-indigo-900 ring-indigo-200'}`}
            whileTap={{ scale: 0.9, rotate: theme === "dark" ? 6 : -6 }}
          >
            {theme === 'dark' ? "☀️" : "🌙"}
          </motion.button>
        </div>
      </aside>
      {/* -------- Main Content Panel -------- */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* HERO */}
        <motion.section id="hero" initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, type: "spring" }} className="pt-11 pb-16 px-5 md:px-20 min-h-[330px] md:min-h-[380px]">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black mb-2 tracking-tight">Sahaya Clement Vincent Martin</h1>
            <div className="text-2xl mb-3 text-violet-200 min-h-[2.5em]">{heroType}</div>
            <motion.p className="mt-1 text-base text-zinc-200 max-w-lg"
              initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:.45}}>Young <b>Cloud/Security/DevOps architect</b> with a passion for automation, SIEM, and modern fullstack projects. <span className="hidden md:inline">Looking for my first IT job—let’s connect!</span></motion.p>
            <div className="flex gap-5 mt-7">
              <a href="#contact" className="rounded-xl px-7 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-violet-600 shadow border-2 border-indigo-400 hover:scale-105 transition">Contact Me</a>
              <a href="/resume.pdf" download className="rounded-xl px-7 py-3 text-indigo-900 bg-white/90 font-bold border border-indigo-200 hover:bg-violet-100 shadow hover:scale-105 transition">Download CV</a>
            </div>
          </div>
        </motion.section>

        {/* --- FEATURED CAROUSEL + GRID --- */}
        <motion.section id="work" initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9, type: "spring" }} className="w-full mb-8 px-5 md:px-20">
          <h2 className="text-2xl font-bold text-violet-300 mb-3">WORK</h2>
          <FeaturedProjectCarousel projects={projects} />
          <div className="flex mb-2 gap-6 items-center">
            <div className="font-semibold text-sm text-zinc-300">All projects</div>
            <div className="flex gap-2">
              <button onClick={() => setFilter(null)} className={`px-3 py-1 rounded text-xs font-bold border transition ${!filter ? "bg-violet-900 border-violet-600 text-white" : "border-zinc-700 text-violet-200 bg-zinc-950 hover:bg-violet-900"}`}>All</button>
              {Array.from(new Set(projects.map(p => p.type))).map(type =>
                <button key={type} onClick={() => setFilter(type)} className={`px-3 py-1 rounded text-xs font-bold border transition ${filter === type ? "bg-violet-900 border-violet-600 text-white" : "border-zinc-700 text-violet-200 bg-zinc-950 hover:bg-violet-900"}`}>{type}</button>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {filtered.map((proj, i) =>
              <motion.div key={i}
                whileHover={{ scale: 1.08, boxShadow: "0 5px 64px #6366f199" }}
                className="bg-zinc-900/90 border border-violet-800 hover:border-violet-400 rounded-2xl transition overflow-hidden cursor-pointer shadow-xl flex flex-col"
                onClick={() => setModal(i)}
              >
                <img src={proj.image} alt={proj.title} className="h-36 w-full object-cover" />
                <div className="p-5 pb-3">
                  <div className="text-xs text-violet-400 font-semibold mb-1">{proj.type}</div>
                  <div className="font-bold text-lg mb-1">{proj.title}</div>
                  <div className="text-sm text-zinc-300">{proj.desc}</div>
                  <div className="mt-2 flex gap-2 flex-wrap text-[11px] uppercase font-extrabold text-violet-300">
                    {proj.tags.map((t, ii) => <span key={ii}>#{t}</span>)}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
        {/* Labs/minigames */}
        <motion.section id="lab" initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .92, type: "spring" }} className="my-12 px-5 md:px-20">
          <h2 className="text-2xl font-bold mb-4 text-blue-200">LAB</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
            {labs.map((lab, idx) =>
              <a key={idx} href={lab.url} target="_blank"
                className="group bg-blue-950/80 border border-blue-700 hover:border-blue-400 rounded-2xl p-6 flex gap-3 items-center transition font-mono text-blue-200 hover:bg-blue-900 hover:scale-105"
              >
                <span className="text-4xl">{lab.emoji}</span>
                <span className="font-bold">{lab.title}</span>
                <span className="text-xl ml-auto opacity-0 group-hover:opacity-100">➔</span>
              </a>
            )}
          </div>
        </motion.section>
        {/* Roadmap/Timeline */}
        <motion.section className="my-12 px-5 md:px-20" id="achievements" initial={{y:70,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:1.1, type:"spring"}}>
          <h2 className="text-2xl font-bold text-green-200 mb-5">Roadmap</h2>
          <div className="flex flex-col gap-5 border-l-4 border-green-300 pl-9">{timeline.map((item,i)=>
            <div key={i} className="relative">
              <span className="absolute -left-8 top-0 text-3xl">{item.icon}</span>
              <span className="font-bold text-green-200">{item.year}</span>
              <span className="ml-4 text-zinc-100">{item.label}</span>
            </div>
          )}
          </div>
        </motion.section>
        {/* About/Skills */}
        <motion.section id="about" className="my-12 px-5 md:px-20" initial={{y:70,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:1.2, type:"spring"}}>
          <h2 className="text-2xl font-bold mb-4 text-yellow-300">About Me</h2>
          <pre className={`bg-zinc-900/85 border border-yellow-300 rounded-xl p-6 font-mono text-xs text-yellow-200 overflow-x-auto transition-all duration-300 ${aboutOpen ? "max-h-[600px]" : "max-h-24 overflow-hidden"}`}>
{`class Clement {
  name = "Sahaya Clement Vincent Martin";
  location = "Toronto, ON";
  email = "clementvsc.martin@gmail.com";
  certifications = ${JSON.stringify(certifications.map(c => c.label))}
  skills = ${JSON.stringify(skills)};
  github = "github.com/Clementvsc";
  linkedin = "linkedin.com/in/sahaya-clement";
}`}
          </pre>
          <button className="absolute right-6 top-3 text-yellow-400/80 text-sm" onClick={()=>setAboutOpen(o=>!o)}>
            {aboutOpen ? "Collapse" : "Expand"}
          </button>
          <div className="flex flex-wrap mt-6 gap-2">
            {skills.map(skill =>
              <span key={skill} className="px-3 py-1 bg-gradient-to-r from-indigo-900/70 to-violet-950/90 text-violet-100 border border-violet-600 rounded-full text-xs font-semibold shadow cursor-pointer hover:scale-110 transition">
                {skill}
              </span>
            )}
          </div>
        </motion.section>
        {/* Testimonials Carousel */}
        <motion.section className="my-10 max-w-2xl mx-auto px-5" initial={{y:70,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:1.22, type:"spring"}}>
          <h2 className="text-2xl font-bold mb-4 text-violet-200">Testimonials</h2>
          <AnimatePresence mode="wait">
            <motion.div key={testimonials[testiIdx]?.name} className="rounded-xl border border-violet-800 bg-zinc-900/80 p-5 shadow text-violet-100"
              initial={{opacity:0, y:32}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-32}} transition={{duration:.7}}>
              <div className="font-mono text-base mb-1">“{testimonials[testiIdx]?.quote}”</div>
              <div className="font-semibold text-xs text-right text-violet-400">– {testimonials[testiIdx]?.name}</div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-2 items-center justify-center">
            {testimonials.map((t,i)=>
              <button key={i} onClick={()=>setTestiIdx(i)}
                className={`w-3 h-3 rounded-full border-2 ${testiIdx===i?'bg-violet-400':'bg-zinc-700'} border-violet-400`} />
            )}
          </div>
        </motion.section>
        {/* Contact */}
        <motion.section id="contact" className="my-10 max-w-lg mx-auto px-5" initial={{y:70,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:1.23, type:"spring"}}>
          <h2 className="text-2xl font-bold mb-4 text-yellow-200">Contact</h2>
          <form className="flex flex-col gap-3 p-6 rounded-xl bg-white/95 dark:bg-zinc-900/90 border border-yellow-300 shadow-lg"
                onSubmit={contact.handleSubmit}>
            <input name="name" required placeholder="Your Name" className="rounded-xl p-2 bg-white/95 dark:bg-zinc-800 text-black dark:text-zinc-200" />
            <input type="email" name="email" required placeholder="Your Email" className="rounded-xl p-2 bg-white/95 dark:bg-zinc-800 text-black dark:text-zinc-200" />
            <textarea name="message" required placeholder="Your Message" className="rounded-xl p-2 bg-white/95 dark:bg-zinc-800 text-black dark:text-zinc-200" rows={3} />
            <button className="bg-gradient-to-r from-yellow-400 to-violet-400 dark:from-zinc-700 dark:to-violet-900 rounded-xl px-6 py-2 text-white font-semibold hover:from-yellow-500 hover:to-violet-600 transition shadow" type="submit" disabled={contact.status === "loading"}>
              {contact.status === "loading" ? "Sending..." : "Send"}
            </button>
            {contact.msg && (<div className="text-sm mt-2 text-yellow-800 dark:text-yellow-200">{contact.msg}</div>)}
          </form>
        </motion.section>
      </main>
      {/* --- Project Modal --- */}
      <AnimatePresence>
        {modal !== null &&
          <ProjectPopup project={projects[modal]!} onClose={()=>setModal(null)} />
        }
      </AnimatePresence>
    </div>
  );
}
