'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Data
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
  { quote: "Clement is a quick learner with strong DevOps skills and a hunger to solve real-world challenges.", name: "Dr. John Smith", title: "Professor, Humber College" },
  { quote: "Highly recommended for automation and cloud projects! Clement is collaborative and always delivers high-quality results.", name: "Rachel Adams", title: "Mentor" }
];
const blogs = [
  { title: "Automating Cloud Infrastructure with Terraform", url: "https://dev.to/yourusername/terraform-automation" },
  { title: "Incident Response: Securing Modern Apps", url: "https://gist.github.com/Clementvsc" }
];
const socialLinks = [
  { name: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", url: "https://www.linkedin.com/in/sahaya-clement/" },
  { name: "GitHub", icon: "https://www.svgrepo.com/show/303615/github-icon-1-logo.svg", url: "https://github.com/Clementvsc" },
  { name: "Dev.to", icon: "https://cdn.worldvectorlogo.com/logos/devto.svg", url: "https://dev.to/yourusername" },
  { name: "Medium", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111506.png", url: "https://medium.com/@yourusername" },
  { name: "Stack Overflow", icon: "https://cdn.sanity.io/images/6v7bff5v/production/bfe91a273b3e904c78a7e2fdbf52b513.png", url: "https://stackoverflow.com/users/youruserid" },
  { name: "Twitter", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png", url: "https://twitter.com/yourusername" }
];

// Fetch Github Repos
const fetchRepos = async () => {
  const res = await fetch("https://api.github.com/users/Clementvsc/repos?per_page=100&sort=updated", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load repositories");
  const data = await res.json();
  return data
    .filter((r) => !r.archived)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? "No description provided.",
      url: r.html_url,
      homepage: r.homepage ?? "",
      language: r.language ?? "",
      updated: r.updated_at
    }));
};

export default function HomePage() {
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [dark, setDark] = useState(false);

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
    <div className={`min-h-screen ${
      dark
        ? "bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900 text-white"
        : "bg-gradient-to-tr from-indigo-900 via-blue-900 to-violet-900 text-white"
    }`}>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-10 flex items-center justify-between mx-auto mt-6 mb-8 max-w-6xl p-4 rounded-xl
        bg-gradient-to-r from-indigo-800/70 via-blue-900/70 to-violet-800/70
        dark:from-zinc-800/90 dark:via-zinc-900/90 dark:to-zinc-950/90
        backdrop-blur border border-white/20 dark:border-zinc-700 shadow-xl">
        <Link href="/" className="tracking-wide text-2xl font-extrabold text-white bg-white/10 px-4 py-1 rounded-xl">Portfolio</Link>
        <button
          className="border border-white/40 rounded-xl px-5 py-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-600
          dark:from-zinc-700 dark:via-zinc-900 dark:to-violet-900 shadow hover:from-indigo-700 hover:to-violet-700 font-bold text-white"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ name, icon, url }) => (
            <a key={name} href={url} target="_blank" rel="noreferrer">
              <img src={icon} alt={name} className="w-6 h-6 bg-white/20 dark:bg-zinc-700 rounded-xl backdrop-blur-sm p-1 shadow hover:scale-110 transition" />
            </a>
          ))}
        </div>
      </nav>
      {/* HERO / ABOUT / CV */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-3xl">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-800/30 via-blue-900/30 to-violet-800/30
            dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-900/80
            backdrop-blur-xl border border-white/20 dark:border-zinc-700 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-indigo-200 dark:text-zinc-100">Sahaya Clement Vincent Martin</h1>
          <p className="text-lg md:text-2xl font-medium mb-4 text-indigo-100 dark:text-zinc-300">
            Tech enthusiast in Toronto, Canada. PG certifications in Cloud, Cybersecurity & Threat Management.<br />
            Seeking entry-level IT/DevOps roles—driven to automate, secure, and scale modern platforms.
          </p>
          <div className="mb-4">
            <a href="/resume.pdf" download className="inline-flex items-center px-6 py-2 rounded-xl
              bg-gradient-to-r from-indigo-500 via-blue-400 to-violet-600
              dark:from-zinc-700 dark:via-zinc-900 dark:to-violet-900
              text-white hover:from-violet-500 hover:to-indigo-600 shadow border border-white/20 dark:border-zinc-700 backdrop-blur font-bold">
              <span className="mr-2">Download CV</span>
              <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Download" className="w-5 h-5" />
            </a>
          </div>
          <div className="flex justify-center gap-3 mb-2">
            <a href="mailto:clementvsc.martin@gmail.com" className="px-5 py-2 rounded-xl border border-violet-300 dark:border-zinc-500 text-violet-200 dark:text-zinc-300 hover:bg-violet-100 dark:hover:bg-zinc-700 hover:text-violet-800 transition font-bold shadow">Email Me</a>
            <a href="https://www.linkedin.com/in/sahaya-clement/" target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl border border-violet-300 dark:border-zinc-500 text-violet-200 dark:text-zinc-300 hover:bg-violet-100 dark:hover:bg-zinc-700 hover:text-violet-800 transition font-bold shadow">LinkedIn</a>
            <a href="https://github.com/Clementvsc" target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl border border-violet-300 dark:border-zinc-500 text-violet-200 dark:text-zinc-300 hover:bg-violet-100 dark:hover:bg-zinc-700 hover:text-violet-800 transition font-bold shadow">GitHub</a>
          </div>
        </div>
      </motion.div>
      {/* CERTIFICATIONS & EDUCATION */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto my-10 grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-800/30 via-blue-900/30 to-violet-800/30
            dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-900/80
            backdrop-blur-lg border border-white/20 dark:border-zinc-700 shadow-xl">
          <h2 className="text-2xl font-bold mb-3 text-indigo-200 dark:text-zinc-100">Certifications</h2>
          <ul>
            {certifications.map(cert => (
              <li key={cert.name} className="mb-2">{cert.name} • {cert.issuer} ({cert.date})</li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-800/30 via-blue-900/30 to-violet-800/30
            dark:from-zinc-800/80 dark:via-zinc-900/80 dark:to-zinc-900/80
            backdrop-blur-lg border border-white/20 dark:border-zinc-700 shadow-xl">
          <h2 className="text-2xl font-bold mb-3 text-indigo-200 dark:text-zinc-100">Education</h2>
          {education.degree}, {education.school}, {education.year}
          <br />Location: {education.location}
        </div>
      </motion.section>
      {/* SKILLS */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4 text-indigo-200 dark:text-zinc-100">Skills</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {skills.map(skill => (
            <div key={skill.name} className="mb-1">
              <span className="font-semibold">{skill.name}</span>
              <div className="w-full h-2 rounded-xl bg-white/10 dark:bg-zinc-700/60 border border-white/20 dark:border-zinc-500 shadow backdrop-blur my-2">
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
      {/* PROJECTS */}
      <motion.section id="projects" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4 text-indigo-200 dark:text-zinc-100">Featured Projects</h2>
        {loadingRepos ? (
          <div className="text-indigo-300 dark:text-zinc-400">Loading projects…</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map(repo => (
              <motion.div key={repo.id} whileHover={{ scale: 1.03, boxShadow: "0 6px 48px rgba(64,0,128,0.2)" }}
                className="bg-gradient-to-br from-indigo-800/40 via-blue-900/40 to-violet-800/40 dark:from-zinc-900/80 dark:via-zinc-900/80 dark:to-zinc-800/70 rounded-xl p-6 transition shadow-lg border border-white/20 dark:border-zinc-700 backdrop-blur-lg">
                <h3 className="text-lg font-semibold text-violet-200 dark:text-zinc-100">{repo.name}</h3>
                <p className="text-sm mb-2">{repo.description}</p>
                <div className="flex gap-2 text-xs text-indigo-300 dark:text-zinc-400 mb-2">
                  {repo.language && <span>{repo.language}</span>}
                  <span>Last updated: {repo.updated.slice(0, 10)}</span>
                </div>
                <a href={repo.url} target="_blank" className="text-indigo-300 dark:text-blue-400 hover:underline font-semibold">GitHub</a>
                {repo.homepage && <a href={repo.homepage} target="_blank" className="ml-2 text-green-300 hover:underline font-semibold">Live Demo</a>}
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
      {/* TESTIMONIALS */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4 text-indigo-200 dark:text-zinc-100">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map(test => (
            <motion.div key={test.name} whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-indigo-900/30 to-violet-900/30 dark:from-zinc-800/70 dark:to-zinc-900/70 p-6 rounded-xl shadow-lg border border-white/20 dark:border-zinc-700 backdrop-blur">
              <p className="italic">“{test.quote}”</p>
              <div className="mt-2 font-semibold text-violet-200 dark:text-zinc-100">{test.name}</div>
              <div className="text-xs text-gray-300 dark:text-zinc-400">{test.title}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* BLOG & ARTICLES */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4 text-indigo-200 dark:text-zinc-100">Blog & Articles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map(blog => (
            <div key={blog.title} className="p-6 rounded-xl bg-gradient-to-r from-indigo-900/30 to-violet-900/30 dark:from-zinc-800/70 dark:to-zinc-900/70 shadow-lg border border-white/20 dark:border-zinc-700 backdrop-blur">
              <a href={blog.url} target="_blank" className="text-indigo-300 dark:text-blue-400 font-semibold hover:underline">{blog.title}</a>
            </div>
          ))}
        </div>
      </motion.section>
      {/* CONTACT FORM */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} id="contact" className="max-w-3xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4 text-indigo-200 dark:text-zinc-100">Contact</h2>
        <form className="flex flex-col gap-3 p-6 rounded-xl bg-gradient-to-r from-indigo-900/30 to-violet-900/30 dark:from-zinc-800/70 dark:to-zinc-900/70 shadow-lg border border-white/20 dark:border-zinc-700 backdrop-blur-lg">
          <input placeholder="Your Name" className="rounded-xl p-2 bg-white/50 dark:bg-zinc-600 text-black dark:text-zinc-200" />
          <input placeholder="Your Email" className="rounded-xl p-2 bg-white/50 dark:bg-zinc-600 text-black dark:text-zinc-200" />
          <textarea placeholder="Your Message" className="rounded-xl p-2 bg-white/50 dark:bg-zinc-600 text-black dark:text-zinc-200" rows={3} />
          <button className="bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-zinc-700 dark:to-violet-900 rounded-xl px-6 py-2 text-white font-semibold hover:from-indigo-800 hover:to-violet-800 transition shadow" disabled>
            Send (Demo Only)
          </button>
        </form>
        <p className="mt-2 text-indigo-300 dark:text-blue-400 text-xs">Or write to <a href="mailto:clementvsc.martin@gmail.com" className="underline">clementvsc.martin@gmail.com</a></p>
      </motion.section>
      {/* FOOTER */}
      <footer className="mx-auto mt-12 mb-4 max-w-4xl text-center p-6 rounded-xl bg-gradient-to-r from-indigo-800/30 via-blue-900/30 to-violet-800/30 dark:from-zinc-800/70 dark:via-zinc-900/70 dark:to-zinc-900/70 backdrop-blur border border-white/20 dark:border-zinc-700 shadow text-sm text-indigo-300 dark:text-blue-400">
        &copy; {new Date().getFullYear()} Sahaya Clement Vincent Martin • Portfolio. Built with Next.js, Tailwind, Framer Motion.
      </footer>
    </div>
  );
}
