'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Working, subtle tech video background (Pexels public)
const bgVideo = "https://www.w3schools.com/howto/rain.mp4";

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
  { quote: "Highly recommended for automation and cloud projects!", name: "Rachel Adams", title: "Mentor" }
];
const socialLinks = [
  { name: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", url: "https://www.linkedin.com/in/sahaya-clement/" },
  { name: "GitHub", icon: "https://www.svgrepo.com/show/303615/github-icon-1-logo.svg", url: "https://github.com/Clementvsc" },
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
  return data.filter((r) => !r.archived).map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description ?? "No description provided.",
    url: r.html_url,
    homepage: r.homepage ?? "",
    language: r.language ?? "",
    updated: r.updated_at
  }));
};

function useContactForm() {
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.target as HTMLFormElement);
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
    fetchRepos()
      .then((data) => setRepos(data))
      .catch(() => setRepos([]))
      .finally(() => setLoadingRepos(false));
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans
                      ${dark
                        ? "bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900 text-white"
                        : "bg-gradient-to-tr from-indigo-900 via-blue-900 to-violet-900 text-white"
                      }`}
    >
      {/* Video BG + Overlay */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <video
          className="w-full h-full object-cover"
          src={bgVideo} autoPlay muted loop playsInline preload="auto"
          style={{ opacity: 0.37, background: 'black' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-zinc-900 to-zinc-950 opacity-80"></div>
      </div>

      {/* Nav Bar */}
      <nav className="sticky top-0 z-30 w-full flex justify-center py-5 mb-8"
        style={{
          background: dark
            ? "rgba(24,24,30,.88)"
            : "rgba(30,41,59,0.8)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: dark ? "2px solid #3730a3" : "2px solid #818cf8"
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

      {/* Main Content is always above video (relative z-10) */}
      <div className="relative z-10">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative z-10 p-12 max-w-2xl mx-auto rounded-2xl
          bg-white/85 dark:bg-zinc-900/85 backdrop-blur-2xl border border-indigo-200 dark:border-zinc-700 shadow-2xl text-center mb-10"
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
            <a href="/resume.pdf" download
              className="inline-flex items-center px-7 py-3 rounded-2xl font-bold bg-gradient-to-r from-indigo-500 via-blue-400 to-violet-600 text-white border border-white/40 shadow">
              <span className="mr-2">Download CV</span>
              <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Download CV" className="w-6 h-6" />
            </a>
            <a href="mailto:clementvsc.martin@gmail.com" className="px-6 py-3 rounded-xl border border-violet-400 text-violet-900 bg-violet-100 font-bold shadow hover:bg-violet-200">Email</a>
            <a href="https://www.linkedin.com/in/sahaya-clement/" target="_blank" rel="noopener" className="px-6 py-3 rounded-xl border border-blue-400 text-blue-800 bg-blue-100 font-bold shadow hover:bg-blue-200">LinkedIn</a>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.section initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-5xl mx-auto my-10">
          <h2 className="text-3xl font-bold mb-6 text-violet-600 dark:text-blue-300 text-center">Decades of Tech Innovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timeline.map((item) => (
              <motion.div key={item.year} whileHover={{ scale: 1.07 }} className="p-6 rounded-2xl bg-white/85 dark:bg-zinc-900/80 border border-violet-300 dark:border-zinc-700 shadow-md transition cursor-pointer text-center">
                <span className="text-2xl font-bold mb-1 text-blue-900 dark:text-blue-100">{item.year}</span>
                <p className="text-violet-600 dark:text-blue-300">{item.tech}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Cloud */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 max-w-2xl mx-auto">
          {techCloud.map((t, idx) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              viewport={{ once: true }}
              className="rounded-full px-6 py-2 bg-gradient-to-r from-violet-700 via-indigo-600 to-violet-400 dark:from-zinc-700 dark:via-indigo-800 dark:to-blue-900 text-white shadow-lg font-semibold hover:scale-110 transition cursor-pointer"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Certifications and Education */}
        <motion.section initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto my-10 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-white/85 dark:bg-zinc-900/85 border border-indigo-200 dark:border-zinc-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-3 text-indigo-900 dark:text-zinc-100">Certifications</h2>
            <ul>
              {certifications.map(cert => (
                <li key={cert.name} className="mb-2">{cert.name} • {cert.issuer} ({cert.date})</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-white/85 dark:bg-zinc-900/85 border border-indigo-200 dark:border-zinc-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-3 text-indigo-900 dark:text-zinc-100">Education</h2>
            {education.degree}, {education.school}, {education.year}
            <br />Location: {education.location}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-zinc-100">Skills</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {skills.map(skill => (
              <div key={skill.name} className="mb-2">
                <span className="font-semibold">{skill.name}</span>
                <div className="w-full h-2 rounded-xl bg-blue-100/80 dark:bg-zinc-800/70 border border-white/20 dark:border-zinc-500 shadow backdrop-blur my-2">
                  <motion.div className="h-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-300 dark:from-zinc-400 dark:to-blue-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1 }}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Dynamic Projects */}
        <motion.section id="projects" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-zinc-100">Featured Projects</h2>
          {loadingRepos ? (
            <div className="text-blue-700 dark:text-blue-300">Loading projects…</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repos.map(repo => (
                <motion.div key={repo.id} whileHover={{ scale: 1.05 }}
                  className="bg-white/85 dark:bg-zinc-900/85 border border-indigo-200 dark:border-zinc-700 rounded-xl p-6 transition shadow-lg">
                  <h3 className="text-lg font-semibold text-violet-800 dark:text-blue-100">{repo.name}</h3>
                  <p className="text-sm mb-2 text-gray-800 dark:text-zinc-200">{repo.description}</p>
                  <div className="flex gap-2 text-xs text-indigo-700 dark:text-blue-300 mb-2">
                    {repo.language && <span>{repo.language}</span>}
                    <span>Last updated: {repo.updated.slice(0, 10)}</span>
                  </div>
                  <a href={repo.url} target="_blank" rel="noopener" className="text-indigo-800 dark:text-blue-200 hover:underline font-semibold">GitHub</a>
                  {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener" className="ml-2 text-green-700 hover:underline font-semibold">Live Demo</a>}
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Testimonials */}
        <motion.section initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-zinc-100">Testimonials</h2>
          <AnimatePresence>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((test, idx) => (
                <motion.div key={test.name} initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.6, delay: idx * 0.25 }} className="bg-white/85 dark:bg-zinc-900/85 border border-indigo-200 dark:border-zinc-700 p-6 rounded-xl shadow-lg">
                  <p className="italic text-zinc-900 dark:text-white">“{test.quote}”</p>
                  <div className="mt-2 font-semibold text-indigo-700 dark:text-blue-200">{test.name}</div>
                  <div className="text-xs text-indigo-500 dark:text-blue-400">{test.title}</div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.section>

        {/* Blog */}
        <motion.section initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-zinc-100">Latest Blog Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map(blog => (
              <div key={blog.title} className="p-6 rounded-xl bg-white/85 dark:bg-zinc-900/85 border border-indigo-200 dark:border-zinc-700 shadow-lg">
                <a href={blog.url} target="_blank" rel="noopener" className="text-indigo-800 dark:text-blue-200 font-semibold hover:underline">{blog.title}</a>
                <div className="text-xs text-indigo-400 dark:text-blue-300 mt-2">{blog.date}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} id="contact" className="max-w-3xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-zinc-100">Contact Me</h2>
          <form className="flex flex-col gap-3 p-6 rounded-xl bg-white/85 dark:bg-zinc-900/85 border border-indigo-200 dark:border-zinc-700 shadow-lg"
                onSubmit={contact.handleSubmit}>
            <input name="name" required placeholder="Your Name" className="rounded-xl p-2 bg-white/95 dark:bg-zinc-800 text-black dark:text-zinc-200" />
            <input type="email" name="email" required placeholder="Your Email" className="rounded-xl p-2 bg-white/95 dark:bg-zinc-800 text-black dark:text-zinc-200" />
            <textarea name="message" required placeholder="Your Message" className="rounded-xl p-2 bg-white/95 dark:bg-zinc-800 text-black dark:text-zinc-200" rows={3} />
            <button className="bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-zinc-700 dark:to-violet-900 rounded-xl px-6 py-2 text-white font-semibold hover:from-indigo-800 hover:to-violet-800 transition shadow" type="submit" disabled={contact.status === "loading"}>
              {contact.status === "loading" ? "Sending..." : "Send"}
            </button>
            {contact.msg && (<div className="text-sm mt-2 text-blue-700 dark:text-blue-200">{contact.msg}</div>)}
          </form>
          <p className="mt-2 text-indigo-700 dark:text-blue-300 text-xs">Or write to <a href="mailto:clementvsc.martin@gmail.com" className="underline">clementvsc.martin@gmail.com</a></p>
          <div className="flex mt-4 gap-3 items-center justify-center">
            <button onClick={() => navigator.clipboard.writeText("clementvsc.martin@gmail.com")} className="px-3 py-1 text-xs rounded bg-violet-700 text-white shadow">Copy Email</button>
            <a href="https://www.linkedin.com/in/sahaya-clement/" target="_blank" className="px-3 py-1 text-xs rounded bg-indigo-700 text-white shadow">Connect LinkedIn</a>
          </div>
        </motion.section>
      </div>

      {/* Floating Back to Top */}
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
