"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Data
const certifications = [
  { name: "PG Certificate: Cloud Computing", issuer: "Humber College", date: "2025" },
  { name: "PG Certificate: Cybersecurity & Threat Management", issuer: "Humber College", date: "2025" },
];

const education = {
  school: "Humber College",
  degree: "Postgraduate Certificates",
  location: "Toronto, ON",
  year: "2025",
};

const skills = [
  { name: "AWS", level: 92 },
  { name: "Azure", level: 80 },
  { name: "Terraform", level: 95 },
  { name: "Kubernetes", level: 85 },
  { name: "Python", level: 88 },
  { name: "TypeScript/JS", level: 82 },
  { name: "React/Next.js", level: 88 },
  { name: "SIEM/Threat Detection", level: 80 },
];

const testimonials = [
  {
    quote:
      "Clement is a quick learner with strong DevOps skills and a hunger to solve real-world challenges.",
    name: "Dr. John Smith",
    title: "Professor, Humber College",
  },
  {
    quote:
      "Highly recommended for automation and cloud projects! Clement is collaborative and always delivers high-quality results.",
    name: "Rachel Adams",
    title: "Mentor",
  },
];

const blogs = [
  {
    title: "Automating Cloud Infrastructure with Terraform",
    url: "https://dev.to/yourusername/terraform-automation",
  },
  { title: "Incident Response: Securing Modern Apps", url: "https://gist.github.com/Clementvsc" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    url: "https://www.linkedin.com/in/sahaya-clement/",
  },
  {
    name: "GitHub",
    icon: "https://www.svgrepo.com/show/303615/github-icon-1-logo.svg",
    url: "https://github.com/Clementvsc",
  },
];

// Utils
const fetchRepos = async () => {
  const res = await fetch(
    "https://api.github.com/users/Clementvsc/repos?per_page=100&sort=updated",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load repositories");
  const data = await res.json();
  return data
    .filter((r: any) => !r.archived)
    .map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? "No description provided.",
      url: r.html_url,
      homepage: r.homepage ?? "",
      language: r.language ?? "",
      updated: r.updated_at,
    }));
};

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pop = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } };

export default function Page() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRepos()
      .then(setRepos)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(1200px_600px_at_-10%_-20%,#1d4ed8_0%,transparent_50%),radial-gradient(800px_500px_at_110%_10%,#9333ea_0%,transparent_50%),linear-gradient(180deg,#020617_0%,#0b1020_100%)] text-slate-100">
      {/* Glassy gradient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-16">
        {/* Header/Hero */}
        <motion.header
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="relative mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Sahaya Clement Vincent Martin</h1>
              <p className="mt-1 text-slate-300">Cloud • DevOps • Security</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  {...pop}
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm shadow-sm backdrop-blur-md transition hover:border-white/25 hover:bg-white/15 hover:shadow">
                  <img src={s.icon} alt={s.name} className="h-4 w-4 opacity-80 group-hover:opacity-100" />
                  <span>{s.name}</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                {...pop}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold shadow-md transition hover:shadow-lg">
                Contact
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* About / Education & Certifications */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur-md">
            <h2 className="mb-3 text-xl font-semibold">Education</h2>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{education.school}</p>
                  <p className="text-sm text-slate-300">{education.degree} • {education.location}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 shadow">{education.year}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur-md">
            <h2 className="mb-3 text-xl font-semibold">Certifications</h2>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-slate-300">{c.issuer}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 shadow">{c.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur-md">
          <h2 className="mb-4 text-xl font-semibold">Skills</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name} className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-sm text-slate-300">{s.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects (GitHub repos) */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Projects</h2>
            <Link
              href="https://github.com/Clementvsc?tab=repositories"
              target="_blank"
              className="text-sm text-blue-300 hover:text-blue-200 hover:underline"
            >
              View all on GitHub
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {loading ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 backdrop-blur">Loading repositories...</div>
            ) : error ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-rose-300 backdrop-blur">{error}</div>
            ) : (
              repos.map((repo) => (
                <motion.div
                  key={repo.id}
                  {...pop}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-md backdrop-blur-md transition hover:border-white/20 hover:bg-white/15 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold">{repo.name}</h3>
                  <p className="mb-2 text-sm text-slate-300">{repo.description}</p>
                  <div className="mb-3 flex gap-2 text-xs text-blue-300">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="text-slate-400">•</span>
                    <span>Last updated: {repo.updated.slice(0, 10)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <a
                      href={repo.url}
                      target="_blank"
                      className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-blue-300 hover:border-white/25 hover:bg-white/15 hover:text-blue-200"
                    >
                      GitHub
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-emerald-300 hover:border-white/25 hover:bg-white/15 hover:text-emerald-200"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-10 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">Testimonials</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((test) => (
              <motion.div
                key={test.name}
                {...pop}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-md backdrop-blur-md"
              >
                <p className="italic">“{test.quote}”</p>
                <div className="mt-2 font-medium">{test.name}</div>
                <div className="text-xs text-slate-300">{test.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Blog & Articles */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-10 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">Blog & Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <motion.a
                key={blog.title}
                href={blog.url}
                target="_blank"
                {...pop}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-md backdrop-blur-md hover:border-white/20 hover:bg-white/15"
              >
                <span className="font-semibold text-blue-300 hover:underline">{blog.title}</span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          id="contact"
          className="mx-auto mb-10 max-w-2xl"
        >
          <h2 className="mb-3 text-2xl font-bold">Contact</h2>
          <form className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-md backdrop-blur-md">
            <input placeholder="Your Name" className="rounded-xl border border-white/10 bg-white/70 p-2 text-black shadow-sm placeholder:text-slate-600" />
            <input placeholder="Your Email" className="rounded-xl border border-white/10 bg-white/70 p-2 text-black shadow-sm placeholder:text-slate-600" />
            <textarea placeholder="Your Message" rows={3} className="rounded-xl border border-white/10 bg-white/70 p-2 text-black shadow-sm placeholder:text-slate-600" />
            <button disabled className="rounded-xl bg-gradient-to-r from-blue-600 to
