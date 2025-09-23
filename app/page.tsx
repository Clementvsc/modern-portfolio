'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const bgVideo = "https://cdn.coverr.co/videos/coverr-cloudscape-1699459221084?token=eyJhbGciOiJIUzI1NiJ9"; // Fast, modern, works everywhere
const bgFallback = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80";

const logoLight = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
const logoDark = "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-cloud-network-internet-flatart-icons-outline-flatarticons-1.png";

const certifications = [
  { name: "PG Certificate: Cloud Computing", issuer: "Humber College", date: "2025" },
  { name: "PG Certificate: Cybersecurity & Threat Management", issuer: "Humber College", date: "2025" }
];
const education = {
  school: "Humber College", degree: "Postgraduate Certificates",
  location: "Toronto, ON", year: "2025"
};
const skills = [
  { name: "AWS", level: 92 }, { name: "Azure", level: 80 }, { name: "Terraform", level: 95 }, { name: "Kubernetes", level: 85 },
  { name: "Python", level: 88 }, { name: "TypeScript/JS", level: 82 }, { name: "React/Next.js", level: 88 }, { name: "SIEM/Threat Detection", level: 80 }
];
const testimonials = [
  { quote: "Clement is a quick learner with strong DevOps skills.", name: "Dr. John Smith", title: "Professor, Humber College" },
  { quote: "Highly recommended for automation and cloud projects!", name: "Rachel Adams", title: "Mentor" },
  { quote: "Excellent to work with, always delivers quality!", name: "Alex P.", title: "Team Lead" }
];
const socialLinks = [
  { name: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", url: "https://www.linkedin.com/in/sahaya-clement/" },
  { name: "GitHub", icon: "https://www.svgrepo.com/show/303615/github-icon-1-logo.svg", url: "https://github.com/Clementvsc" }
];
const timeline = [
  {year: "1925", tech: "Mainframes"}, {year: "1965", tech: "Minicomputers"},
  {year: "1985", tech: "PC Revolution"}, {year: "2005", tech: "Cloud Era"}, {year: "2025", tech: "LLMs & Quantum"}
];
const techCloud = ["AWS","Azure","GCP","Linux","Docker","Kubernetes","Python","TypeScript"];
const blogs = [
  { title: "Automating Cloud Infrastructure", url: "https://dev.to/yourusername/terraform-automation", date: "2024-09-01" },
  { title: "Incident Response: Securing Apps", url: "https://gist.github.com/Clementvsc", date: "2024-08-12" }
];

const fetchRepos = async () => {
  const res = await fetch("https://api.github.com/users/Clementvsc/repos?per_page=100&sort=updated", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load repositories");
  const data = await res.json();
  return data.filter(x => !x.archived).map(
    r => ({ id: r.id, name: r.name, description: r.description ?? "No description provided.", url: r.html_url, homepage: r.homepage ?? "", language: r.language ?? "", updated: r.updated_at })
  );
};

function useContactForm() {
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.target);
    try {
      await fetch("https://formspree.io/f/xyyqvkdg", { method: "POST", body: fd, headers: { Accept: "application/json" } });
      setStatus("sent"); setMsg("Thanks for reaching out!");
    } catch { setStatus("error"); setMsg("Error sending message."); }
  }
  return { status, msg, handleSubmit };
}

function useAutoCarousel(length: number, delay=4000): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    const timer = setTimeout(() => setIdx(i => (i + 1) % length), delay);
    return () => clearTimeout(timer);
  }, [idx, length, delay]);
  return [idx, setIdx];
}

// --- Project Showcase NEW Animated Carousel ---
function ProjectShowcase({ repos, dark }: { repos: any[]; dark: boolean }) {
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState<number|null>(null);

  function goto(idx: number) { setCurrent((idx+repos.length)%repos.length); }
  function handleSwipe(e: React.TouchEvent) {
    if (!dragStartX) return;
    const dx = e.changedTouches[0].clientX - dragStartX;
    if (dx > 70) goto(current-1);
    if (dx < -70) goto(current+1);
    setDragStartX(null);
  }
  if (repos.length === 0) return <div className="text-blue-700 dark:text-blue-200 text-center">No projects found!</div>;

  let prevIdx = (current-1+repos.length)%repos.length;
  let nextIdx = (current+1)%repos.length;
  return (
    <div className="relative flex justify-center items-center w-full max-w-full px-2 select-none"
      onTouchStart={e=>setDragStartX(e.touches[0].clientX)}
      onTouchEnd={handleSwipe}
    >
      {/* Arrow Left */}
      <button aria-label="Previous" onClick={()=>goto(current-1)}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-indigo-50 dark:bg-zinc-800 border border-indigo-200 dark:border-violet-800 text-indigo-800 dark:text-blue-100 font-extrabold shadow px-4 py-3 rounded-full opacity-90 hover:bg-violet-100 dark:hover:bg-violet-900 transition text-2xl">
        ‹
      </button>
      {/* Three card stack */}
      <div className="relative flex w-full max-w-3xl h-[320px]">
        <motion.div
          key={repos[prevIdx]?.id}
          style={{ left: 0 }}
          className="absolute w-[70%] h-[88%] -translate-y-1/2 top-1/2 left-0 pointer-events-none opacity-40"
          animate={{ x: -85, scale: .92, filter: "blur(3px)", y: '-50%' }}
          transition={{ duration: 0.44, type: "tween" }}>
          <ProjectCard project={repos[prevIdx]} active={false} />
        </motion.div>
        <motion.div
          key={repos[current]?.id}
          style={{ left: "50%" }}
          className="absolute w-[73%] h-full -translate-x-1/2 z-10 cursor-pointer"
          animate={{ x: 0, scale: 1.09, boxShadow: "0 12px 50px #c7d2fe66" }}
          transition={{ type: "spring", stiffness: 210, damping: 20 }}>
          <ProjectCard project={repos[current]} active={true} />
        </motion.div>
        <motion.div
          key={repos[nextIdx]?.id}
          style={{ right: 0 }}
          className="absolute w-[70%] h-[88%] -translate-y-1/2 top-1/2 right-0 pointer-events-none opacity-40"
          animate={{ x: 85, scale: .92, filter: "blur(3px)", y: '-50%' }}
          transition={{ duration: 0.44, type: "tween" }}>
          <ProjectCard project={repos[nextIdx]} active={false} />
        </motion.div>
      </div>
      {/* Arrow Right */}
      <button aria-label="Next" onClick={()=>goto(current+1)}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-indigo-50 dark:bg-zinc-800 border border-indigo-200 dark:border-violet-800 text-indigo-800 dark:text-blue-100 font-extrabold shadow px-4 py-3 rounded-full opacity-90 hover:bg-violet-100 dark:hover:bg-violet-900 transition text-2xl">
        ›
      </button>
    </div>
  );
}

function ProjectCard({ project, active }: { project: any; active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      whileHover={active ? { scale: 1.07, boxShadow: '0 8px 60px #504ba9c5' } : { scale: 1 }}
      className={`rounded-2xl border shadow-xl p-6 bg-white/95 dark:bg-zinc-900/90
        flex flex-col items-center text-center transition cursor-pointer
        ${active ? "border-violet-400 dark:border-blue-500 z-30" : "border-zinc-300 dark:border-zinc-700"}`}
      style={{ minHeight: expanded && active ? 310 : 210 }}
      onClick={() => active && setExpanded(v => !v)}
    >
      <h3 className="text-lg font-bold mb-2 text-violet-800 dark:text-blue-100">{project.name}</h3>
      <p className="text-sm mb-3 text-gray-800 dark:text-zinc-200">{project.description}</p>
      {expanded && active &&
        <div className="border-t pt-3 my-2 w-full">
          <div className="text-xs text-blue-700 dark:text-blue-300 mb-2">
            {project.language && <span>{project.language}</span>}<br/>
            <span>Last updated: {project.updated.slice(0, 10)}</span>
          </div>
          <a className="font-bold underline text-indigo-700 dark:text-blue-300 hover:text-violet-700 mr-3" href={project.url} target="_blank" rel="noopener">GitHub</a>
          {project.homepage && (
            <a className="font-bold underline text-green-700 dark:text-green-300 hover:text-green-900" href={project.homepage} target="_blank" rel="noopener">Live Demo</a>
          )}
        </div>
      }
      {!expanded && active && <div className="text-xs text-indigo-900 dark:text-blue-400 mt-2">(Click card for more)</div>}
    </motion.div>
  );
}

export default function HomePage() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [dark, setDark] = useState(false);
  const contact = useContactForm();
  const [testiIdx, setTestiIdx] = useAutoCarousel(testimonials.length);

  // Video autoplay fallback
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    setLoadingRepos(true);
    fetchRepos().then(setRepos).catch(() => setRepos([])).finally(() => setLoadingRepos(false));
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
      document.body.style.background = dark
        ? "radial-gradient(ellipse at 55% 30%, #191b27 52%, #151622 87%)"
        : "radial-gradient(ellipse at 60% 40%, #7fa2eb1a 80%, #fff0 )";
    }
  }, [dark]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans`}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        {videoOk ? (
          <video className="w-full h-full object-cover" src={bgVideo}
            autoPlay muted loop playsInline preload="auto"
            style={{opacity:0.42, background:'#181D20'}}
            onError={()=>setVideoOk(false)}
          />
        ) : (
          <img src={bgFallback} alt="" className="w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-zinc-900 to-zinc-950 opacity-90" />
      </div>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-30 w-full flex justify-center py-5 mb-8"
        style={{
          background: dark ? "rgba(24,24,30,.92)" : "rgba(30,41,59,0.85)",
          backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)"
        }}>
        <div className="w-[98vw] max-w-[1600px] flex justify-between items-center px-8">
          <div className="flex items-center gap-5">
            <img src={dark ? logoDark : logoLight} alt="Logo"
              className="w-14 h-14 rounded-full border-2 border-indigo-200 dark:border-blue-300 shadow-lg bg-white/80" />
            <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-lg">Clement Modern Portfolio</Link>
          </div>
          <div className="flex gap-7 items-center">
            {socialLinks.map(({ name, icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">
                <img src={icon} alt={name} className="w-8 h-8 bg-white/40 dark:bg-zinc-700 rounded-xl p-1 shadow hover:scale-110 transition" />
              </a>
            ))}
            <button
              onClick={() => setDark(d => !d)}
              className={`ml-7 border-2 rounded-full px-7 py-2 text-xl font-black shadow-lg transition 
                ${dark
                  ? 'bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#313f72] to-[#8e55e4] border-blue-400 text-yellow-300'
                  : 'bg-gradient-to-r from-indigo-400 via-blue-300 to-violet-200 border-indigo-700 text-indigo-900'
                }
                ring-1 ring-violet-300 dark:ring-violet-700 hover:scale-110`}
              aria-label="Toggle light/dark theme"
            >{dark ? "☀️" : "🌙"}</button>
          </div>
        </div>
      </nav>
      <main className="relative z-10">
        {/* --- all prior animated sections --- */}
        {/* ...Hero, Badges, Timeline, Certifications, Education, Skills... */}

        {/* Projects: Improved carousel */}
        <section className="max-w-5xl mx-auto my-16 px-2">
          <h2 className="text-3xl text-center font-bold mb-8 text-violet-800 dark:text-blue-100">Projects Showcase</h2>
          {loadingRepos
            ? <div className="text-center text-blue-700 dark:text-blue-300">Loading projects…</div>
            : <ProjectShowcase repos={repos} dark={dark} />}
        </section>
        {/* --- Rest of your sections ... Testimonials, Blogs, Contact, etc. remain unchanged and as above --- */}
        <motion.section className="max-w-5xl mx-auto my-12" initial={{y:40,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-zinc-100">Testimonials</h2>
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[testiIdx]?.name}
                initial={{opacity:0,x:40}}
                animate={{opacity:1,x:0}}
                exit={{opacity:0,x:-40}}
                transition={{duration:0.65}}
                className="bg-white/95 dark:bg-zinc-900/90 border p-6 rounded-xl shadow-xl max-w-xl text-center"
              >
                <p className="italic text-zinc-900 dark:text-white mb-2">“{testimonials[testiIdx]?.quote}”</p>
                <div className="mt-2 font-semibold text-indigo-700 dark:text-blue-200">{testimonials[testiIdx]?.name}</div>
                <div className="text-xs text-indigo-500 dark:text-blue-400">{testimonials[testiIdx]?.title}</div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-4 mt-4">
              {testimonials.map((t, i) => (
                <button key={t.name}
                  className={`w-3 h-3 rounded-full border-2 bg-white/90 dark:bg-zinc-800 border-violet-400 ${testiIdx===i?'ring-2 ring-violet-600':''}`}
                  onClick={() => setTestiIdx(i)}
                />
              ))}
            </div>
          </div>
        </motion.section>
        {/* ... Blogs/Contact/Footer as previously shown ... */}
      </main>
      <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        className="fixed right-8 bottom-8 z-50 bg-gradient-to-tr from-violet-700 to-indigo-800 text-white p-4 rounded-full shadow-lg backdrop-blur-lg border border-white/30 opacity-90 hover:scale-110 hover:opacity-100 transition"
        aria-label="Back to top"
      >↑</button>
      <footer className="relative z-10 mx-auto mt-14 mb-4 max-w-4xl text-center p-8 rounded-xl bg-white/90 dark:bg-zinc-800/80 border border-white/20 dark:border-zinc-700 shadow text-lg text-blue-700 dark:text-blue-200 font-serif">
        <span className="italic tracking-wide text-violet-500 block">A Century of Innovation.</span>
        <br />&copy; {new Date().getFullYear()} Sahaya Clement Vincent Martin • Portfolio.
      </footer>
    </div>
  );
}
