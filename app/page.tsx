'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

// Tech/cloud video bg (royalty-free, fast, safe)
const bgVideo = "https://videos.pexels.com/video-files/18193998/18193998-uhd_3840_2160_25fps.mp4";
const logoLight = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
const logoDark = "https://cdn-icons-png.flaticon.com/512/3700/3700622.png";

const certifications = [
  { name: "PG Certificate: Cloud Computing", issuer: "Humber College", date: "2025" },
  { name: "PG Certificate: Cybersecurity & Threat Management", issuer: "Humber College", date: "2025" }
];
const education = {
  school: "Humber College",
  degree: "Postgraduate Certificates",
  location: "Toronto, ON",
  year: "2025"
};
const skills = [
  { name: "AWS", level: 92 },
  { name: "Azure", level: 80 },
  { name: "Terraform", level: 95 },
  { name: "Kubernetes", level: 85 },
  { name: "Python", level: 88 },
  { name: "TypeScript/JS", level: 82 },
  { name: "React/Next.js", level: 88 },
  { name: "SIEM/Threat Detection", level: 80 }
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
  {year: "1925", tech: "Mainframes"},
  {year: "1965", tech: "Minicomputers"},
  {year: "1985", tech: "PC Revolution"},
  {year: "2005", tech: "Cloud Era"},
  {year: "2025", tech: "LLMs & Quantum"}
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
  return data.filter(x => !x.archived).map(r => ({
    id: r.id, name: r.name, description: r.description ?? "No description provided.",
    url: r.html_url, homepage: r.homepage ?? "", language: r.language ?? "", updated: r.updated_at
  }));
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
    } catch {
      setStatus("error"); setMsg("Error sending message.");
    }
  }
  return { status, msg, handleSubmit };
}

// Testimonials Carousel hook
function useAutoCarousel(length: number, delay=4300): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    const timer = setTimeout(() => setIdx(i => (i + 1) % length), delay);
    return () => clearTimeout(timer);
  }, [idx, length, delay]);
  return [idx, setIdx];
}

export default function HomePage() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [dark, setDark] = useState(false);
  const contact = useContactForm();
  const [carouselIdx, setCarouselIdx] = useState(0);

  // FIX: testiIdx is a number, setTestiIdx is setter!
  const [testiIdx, setTestiIdx] = useAutoCarousel(testimonials.length);

  useEffect(() => {
    setLoadingRepos(true);
    fetchRepos().then(setRepos).catch(() => setRepos([])).finally(() => setLoadingRepos(false));
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans
      ${dark ?
        "bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900 text-white"
        : "bg-gradient-to-tr from-indigo-900 via-blue-900 to-violet-900 text-white"
    }`}>
      {/* VIDEO BG + overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video className="w-full h-full object-cover" src={bgVideo} autoPlay muted loop playsInline preload="auto" style={{opacity:0.37, background:'#181D20'}} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-zinc-900 to-zinc-950 opacity-90" />
      </div>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-30 w-full flex justify-center py-5 mb-8"
        style={{
          background: dark ? "rgba(24,24,30,.91)" : "rgba(30,41,59,0.81)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
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
      <main className="relative z-10">
        {/* ... All your other sections here ... */}

        {/* TESTIMONIALS SECTION, bug FIXED */}
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
                <button
                  key={t.name}
                  className={`w-3 h-3 rounded-full border-2 bg-white/90 dark:bg-zinc-800 border-violet-400 ${testiIdx===i?'ring-2 ring-violet-600':''}`}
                  onClick={() => setTestiIdx(i)}
                />
              ))}
            </div>
          </div>
        </motion.section>
        {/* ...Rest of your sections... */}
      </main>
      <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        className="fixed right-8 bottom-8 z-50 bg-gradient-to-tr from-violet-700 to-indigo-800 text-white p-4 rounded-full shadow-lg backdrop-blur-lg border border-white/30 opacity-90 hover:scale-110 hover:opacity-100 transition"
        aria-label="Back to top"
      >↑</button>
      <footer className="relative z-10 mx-auto mt-14 mb-4 max-w-4xl text-center p-8 rounded-xl bg-white/90 dark:bg-zinc-800/80 border border-white/20 dark:border-zinc-700 shadow text-lg text-blue-700 dark:text-blue-200 font-serif">
        <span className="italic tracking-wide text-violet-500 block">A Century of Innovation.</span>
        <br />
        &copy; {new Date().getFullYear()} Sahaya Clement Vincent Martin • Portfolio.
      </footer>
    </div>
  );
}

// Add your ProjectCard component and any other needed components below!
