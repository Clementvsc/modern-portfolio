'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  { name: "Twitter", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png", url: "https://twitter.com/yourusername" },
];

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
  }, []);
  return (
    <div className={dark ? "bg-black text-white" : "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white"}>
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 text-lg font-semibold shadow mb-6">
        <Link href="/" className="tracking-wide text-2xl">Portfolio</Link>
        <button className="border border-blue-500 rounded px-4 py-1" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ name, icon, url }) => (
            <a key={name} href={url} target="_blank" rel="noreferrer">
              <img src={icon} alt={name} className="w-6 h-6 hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </nav>
      {/* Hero / Elevator Pitch / Resume */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Sahaya Clement Vincent Martin</h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto font-medium mb-2">
          Tech enthusiast in Toronto, Canada. PG certifications in Cloud, Cybersecurity & Threat Management.<br />
          Seeking entry-level IT/DevOps roles—driven to automate, secure, and scale modern platforms.
        </p>
        <div className="mb-4">
          <a href="/resume.pdf" download className="inline-flex items-center px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-800 shadow transition">
            <span className="mr-2">Download CV</span>
            <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Download" className="w-5 h-5" />
          </a>
        </div>
        <div className="flex justify-center gap-2 mb-4">
          <a href="mailto:clementvsc.martin@gmail.com" className="px-5 py-2 rounded border border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black transition">Email Me</a>
          <a href="https://www.linkedin.com/in/sahaya-clement/" target="_blank" rel="noreferrer" className="px-5 py-2 rounded border border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black transition">LinkedIn</a>
          <a href="https://github.com/Clementvsc" target="_blank" rel="noreferrer" className="px-5 py-2 rounded border border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black transition">GitHub</a>
        </div>
      </motion.div>
      {/* Certifications & Education */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-2">Certifications & Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-1">Certifications</h3>
            <ul>
              {certifications.map(cert => (
                <li key={cert.name} className="mb-2">{cert.name} • {cert.issuer} ({cert.date})</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Education</h3>
            {education.degree}, {education.school}, {education.year}
            <br />Location: {education.location}
          </div>
        </div>
      </motion.section>
      {/* Skills with Progress Bars */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {skills.map(skill => (
            <div key={skill.name} className="mb-1">
              <span className="font-medium">{skill.name}</span>
              <motion.div className={`h-2 rounded bg-gradient-to-r from-blue-500 to-blue-300 my-1`} initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 0.8 }} style={{ width: `${skill.level}%` }} />
            </div>
          ))}
        </div>
      </motion.section>
      {/* Projects - Fetched Dynamically */}
      <motion.section id="projects" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
        {loadingRepos ? (
          <div className="text-blue-400">Loading projects…</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {repos.map(repo => (
              <motion.div key={repo.id} whileHover={{ scale: 1.03 }} className="bg-white/10 rounded-lg p-5 transition shadow hover:shadow-lg border border-white/10">
                <h3 className="text-lg font-semibold">{repo.name}</h3>
                <p className="text-sm mb-2">{repo.description}</p>
                <div className="flex gap-2 text-xs text-blue-300 mb-2">
                  {repo.language && <span>{repo.language}</span>}
                  <span>Last updated: {repo.updated.slice(0, 10)}</span>
                </div>
                <a href={repo.url} target="_blank" className="text-blue-400 hover:underline">GitHub</a>
                {repo.homepage && <a href={repo.homepage} target="_blank" className="ml-2 text-green-400 hover:underline">Live Demo</a>}
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
      {/* Testimonials */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map(test => (
            <motion.div key={test.name} whileHover={{ scale: 1.02 }} className="bg-white/5 p-4 rounded shadow">
              <p className="italic">“{test.quote}”</p>
              <div className="mt-2 font-medium">{test.name}</div>
              <div className="text-xs text-gray-300">{test.title}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Blog & Articles Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-2">Blog & Articles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map(blog => (
            <div key={blog.title} className="p-4 rounded bg-white/5 shadow">
              <a href={blog.url} target="_blank" className="text-blue-400 font-semibold hover:underline">{blog.title}</a>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Contact Form (placeholder) */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} id="contact" className="max-w-2xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-2">Contact</h2>
        <form className="flex flex-col gap-3 p-4 rounded bg-white/10">
          <input placeholder="Your Name" className="rounded p-2 bg-white/70 text-black" />
          <input placeholder="Your Email" className="rounded p-2 bg-white/70 text-black" />
          <textarea placeholder="Your Message" className="rounded p-2 bg-white/70 text-black" rows={3} />
          <button className="bg-blue-600 rounded px-6 py-2 text-white font-semibold hover:bg-blue-900 transition" disabled>
            Send (Demo Only)
          </button>
        </form>
        <p className="mt-2 text-gray-400 text-xs">Or write to <a href="mailto:clementvsc.martin@gmail.com" className="underline">clementvsc.martin@gmail.com</a></p>
      </motion.section>
      {/* Footer */}
      <footer className="text-center p-6 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Sahaya Clement Vincent Martin • Portfolio. Built with Next.js, Tailwind, Framer Motion.
      </footer>
    </div>
  );
}
