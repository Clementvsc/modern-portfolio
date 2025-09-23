'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Tech/cloud background MP4 (free, beautiful, tested)
const bgVideo = "https://videos.pexels.com/video-files/4998344/4998344-hd_1920_1080_25fps.mp4"; // "clouds and digital grid" effect: https://www.pexels.com/video/a-grid-structure-displaying-clouds-4998344/

const logoLight = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
const logoDark = "https://cdn-icons-png.flaticon.com/512/3700/3700622.png";

// ... Your arrays (certifications, education, skills, testimonials, socialLinks, timeline, techCloud, blogs, etc.) from previous code
const certifications = [
  { name: "PG Certificate: Cloud Computing", issuer: "Humber College", date: "2025" },
  { name: "PG Certificate: Cybersecurity & Threat Management", issuer: "Humber College", date: "2025" }
];
const education = { school: "Humber College", degree: "Postgraduate Certificates", location: "Toronto, ON", year: "2025" };
const skills = [ ... ];
const testimonials = [ ... ];
const socialLinks = [ ... ];
const timeline = [ ... ];
const techCloud = [ ... ];
const blogs = [ ... ];

// Dynamic GitHub project loading
const fetchRepos = async () => {
  const res = await fetch("https://api.github.com/users/Clementvsc/repos?per_page=100&sort=updated", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load repositories");
  const data = await res.json();
  return data.filter(x => !x.archived).map(r => ({
    id: r.id, name: r.name, description: r.description ?? "No description provided.",
    url: r.html_url, homepage: r.homepage ?? "", language: r.language ?? "", updated: r.updated_at
  }));
};

function useContactForm() {
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.target);
    try {
      await fetch("https://formspree.io/f/xyyqvkdg", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });
      setStatus("sent"); setMsg("Thanks for reaching out!");
    } catch {
      setStatus("error"); setMsg("Error sending message.");
    }
  }
  return { status, msg, handleSubmit };
}

export default function HomePage() {
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [dark, setDark] = useState(false);
  const contact = useContactForm();

  useEffect(() => {
    setLoadingRepos(true);
    fetchRepos().then(setRepos).catch(() => setRepos([])).finally(() => setLoadingRepos(false));
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [dark]);

  // For slick "cascading" project stack: keep state to index projects
  const [projIdx, setProjIdx] = useState(0);
  const nextProject = () => setProjIdx(i => (i + 1) % Math.max(1, repos.length));
  const prevProject = () => setProjIdx(i => (i - 1 + repos.length) % Math.max(1, repos.length));

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans
      ${dark ?
          "bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900 text-white" :
          "bg-gradient-to-tr from-indigo-900 via-blue-900 to-violet-900 text-white"
      }`}>
      {/* VIDEO BG */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <video
          className="w-full h-full object-cover"
          src={bgVideo} autoPlay muted loop playsInline preload="auto"
          style={{ opacity: 0.35, background: '#181D20' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-900 via-zinc-900 to-zinc-950 opacity-85`} />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-30 w-full flex justify-center py-5 mb-8"
        style={{
          background: dark
            ? "rgba(24,24,30,.90)"
            : "rgba(30,41,59,0.85)",
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)"
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
                <img src={icon} alt={name} className="w-8 h-8 bg-white/30 dark:bg-zinc-700 rounded-xl p-1 shadow hover:scale-110 transition" />
              </a>
            ))}
            <button onClick={() => setDark(d => !d)}
              className="ml-7 border-2 border-indigo-200 dark:border-blue-600 rounded-full px-6 py-2 text-xl font-bold bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-600 dark:from-zinc-700 dark:to-violet-900 text-white shadow-lg transition hover:from-indigo-600 hover:to-violet-700"
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            >{dark ? "☀️" : "🌙"}</button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative z-10 p-12 max-w-2xl mx-auto rounded-2xl
          bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border shadow-2xl text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3 text-gray-900 dark:text-white"
            style={{textShadow: "0 2px 12px #0008"}}>
            Sahaya Clement Vincent Martin
          </h1>
          <p className="text-lg md:text-2xl font-medium mb-6 text-gray-800 dark:text-blue-100"
            style={{textShadow: "0 1.5px 8px #000B"}}>
            Tech architect, innovating since 1925. PG certifications in Cloud, Cybersecurity, DevOps, Automation.
          </p>
          <div className="mb-2 flex flex-wrap gap-4 justify-center">
            <a href="/resume.pdf" download className="inline-flex items-center px-7 py-3 rounded-2xl font-bold bg-gradient-to-r from-indigo-500 via-blue-400 to-violet-600 text-white border shadow">
              <span className="mr-2">Download CV</span>
              <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Download CV" className="w-6 h-6" />
            </a>
            <a href="mailto:clementvsc.martin@gmail.com" className="px-6 py-3 rounded-xl border border-violet-400 text-violet-900 bg-violet-100 font-bold shadow hover:bg-violet-200">Email</a>
            <a href="https://www.linkedin.com/in/sahaya-clement/" target="_blank" rel="noopener" className="px-6 py-3 rounded-xl border border-blue-400 text-blue-800 bg-blue-100 font-bold shadow hover:bg-blue-200">LinkedIn</a>
          </div>
        </motion.div>

        {/* TECH CLOUD */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 max-w-2xl mx-auto">
          {techCloud.map((t, idx) => (
            <motion.span key={t}
              initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              viewport={{ once: true }}
              className="rounded-full px-6 py-2 bg-gradient-to-r from-violet-700 via-indigo-600 to-violet-400 dark:from-zinc-700 dark:via-indigo-800 dark:to-blue-900 text-white shadow-lg font-semibold hover:scale-110 transition cursor-pointer"
            >{t}</motion.span>
          ))}
        </div>

        {/* "Cascading, Motion" PROJECTS STACK */}
        <section className="max-w-4xl mx-auto my-16">
          <h2 className="text-3xl text-center font-bold mb-8 text-violet-800 dark:text-blue-100">Projects Showcase</h2>
          {loadingRepos ? (
            <div className="text-center text-blue-700 dark:text-blue-300">Loading projects…</div>
          ) : repos.length ? (
            <div className="relative h-96 min-h-[350px] flex flex-col items-center justify-center">
              {/* Project cards: current at front; prev/next layered behind for stack "cascade" effect */}
              <AnimatePresence initial={false}>
                {[...Array(3)].map((_, offset) => {
                  const idx = (projIdx + offset + repos.length - 1) % repos.length;
                  if (offset === 1 && repos.length >= 2) { // prev
                    return (
                      <motion.div key={`stack-prev-${idx}`}
                        initial={{ x: -240, scale: 0.8, opacity: 0.2 }}
                        animate={{ x: -90, scale: 0.93, opacity: 0.4 }}
                        exit={{ x: -240, scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.42 }}
                        className="absolute top-12 left-1/2 -translate-x-1/2 z-10 w-96 pointer-events-none"
                        style={{filter: "blur(1.5px)"}}
                      >
                        <ProjectCard project={repos[idx]} />
                      </motion.div>
                    );
                  }
                  if (offset === 0) { // current
                    return (
                      <motion.div key={`stack-active-${idx}`}
                        initial={{ y: 80, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 80, opacity: 0, scale: 0.93 }}
                        transition={{ type: 'spring', stiffness: 230, damping: 20, mass: 0.7, duration: 0.51 }}
                        className="relative z-30 rounded-2xl shadow-2xl"
                      >
                        <ProjectCard project={repos[idx]} active />
                      </motion.div>
                    );
                  }
                  if (offset === 2 && repos.length >= 3) { // next
                    return (
                      <motion.div key={`stack-next-${idx}`}
                        initial={{ x: 240, scale: 0.8, opacity: 0.2 }}
                        animate={{ x: 90, scale: 0.93, opacity: 0.4 }}
                        exit={{ x: 240, scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.42 }}
                        className="absolute top-12 left-1/2 -translate-x-1/2 z-10 w-96 pointer-events-none"
                        style={{filter: "blur(1.5px)"}}
                      >
                        <ProjectCard project={repos[idx]} />
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </AnimatePresence>
              <div className="absolute left-[-25px] top-1/2 -translate-y-1/2 z-40">
                <button className="px-4 py-2 rounded-full bg-violet-100 dark:bg-zinc-800 border shadow font-bold text-violet-800 dark:text-blue-200 text-2xl hover:bg-violet-300" aria-label="Prev" onClick={prevProject}>&lt;</button>
              </div>
              <div className="absolute right-[-25px] top-1/2 -translate-y-1/2 z-40">
                <button className="px-4 py-2 rounded-full bg-violet-100 dark:bg-zinc-800 border shadow font-bold text-violet-800 dark:text-blue-200 text-2xl hover:bg-violet-300" aria-label="Next" onClick={nextProject}>&gt;</button>
              </div>
            </div>
          ) : (
            <div className="text-blue-700 dark:text-blue-200 text-center">No projects found!</div>
          )}
        </section>
        {/* ...The rest of your section blocks here: timeline, skills, testimonials, blog, contact, etc, as before... */}

        {/* Testimonials, Blog, Contact, Footer blocks can be inserted identically from earlier responses, using bg-white/85/dark:bg-zinc-900/85 etc for clarity and visibility */}
      </div>
      {/* Floating Back to Top (above nav/video) */}
      <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        className="fixed right-8 bottom-8 z-50 bg-gradient-to-tr from-violet-700 to-indigo-800 text-white p-4 rounded-full shadow-lg backdrop-blur-lg border border-white/30 opacity-90 hover:scale-110 hover:opacity-100 transition"
        aria-label="Back to top"
      >↑</button>
      {/* Footer */}
      <footer className="relative z-10 mx-auto mt-14 mb-4 max-w-4xl text-center p-8 rounded-xl bg-white/85 dark:bg-zinc-800/80 border border-white/20 dark:border-zinc-700 shadow text-lg text-blue-700 dark:text-blue-200 font-serif">
        <span className="italic tracking-wide text-violet-500 block">A Century of Innovation.</span>
        <br />
        &copy; {new Date().getFullYear()} Sahaya Clement Vincent Martin • Portfolio.
      </footer>
    </div>
  );
}

// Fancy Project Card used in carousel stack
function ProjectCard({ project, active }) {
  return (
    <div className={`rounded-2xl border shadow-xl p-6 bg-white/95 dark:bg-zinc-900/85
                      flex flex-col items-center text-center transition
                      ${active ? "scale-105 border-violet-400 dark:border-blue-500 z-30" : "border-zinc-300 dark:border-zinc-700"}`}>
      <h3 className="text-lg font-bold mb-2 text-violet-800 dark:text-blue-100">{project.name}</h3>
      <p className="text-sm mb-3 text-gray-800 dark:text-zinc-200">{project.description}</p>
      <div className="mb-2 flex gap-2 text-xs text-blue-700 dark:text-blue-300">
        {project.language && <span>{project.language}</span>}
        <span>Last updated: {project.updated.slice(0, 10)}</span>
      </div>
      <div>
        <a className="font-bold underline text-indigo-700 dark:text-blue-300 hover:text-violet-700 mr-3" href={project.url} target="_blank" rel="noopener">GitHub</a>
        {project.homepage && (
          <a className="font-bold underline text-green-700 dark:text-green-300 hover:text-green-900" href={project.homepage} target="_blank" rel="noopener">Live Demo</a>
        )}
      </div>
    </div>
  );
}
