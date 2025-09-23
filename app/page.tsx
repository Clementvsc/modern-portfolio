"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Types
type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  archived: boolean;
  fork: boolean;
  updated_at: string;
};

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// GitHub repos fetcher (client-side)
async function fetchRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("Failed to load repositories");
  const data = await res.json();
  return (data as any[]).map((r) => ({
    id: r.id,
    name: r.name as string,
    full_name: r.full_name as string,
    description: (r.description as string) ?? "No description provided.",
    html_url: r.html_url as string,
    homepage: (r.homepage as string) || "",
    language: (r.language as string) || "",
    archived: !!r.archived,
    fork: !!r.fork,
    updated_at: r.updated_at as string,
  }));
}

// Data
const EDUCATION = [
  { school: "Université de Technologie", degree: "B.S. in Computer Science", period: "2018 – 2021", details: "Focused on full‑stack development, UI engineering, and HCI." },
  { school: "Lycée Scientifique", degree: "Classe Prépa (MPSI/MP)", period: "2016 – 2018", details: "Mathematics, physics, and computer science foundation." },
];
const CERTIFICATIONS = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Analytics Individual Qualification", issuer: "Google", year: "2023" },
  { name: "Scrum Master", issuer: "Scrum.org", year: "2022" },
];
const SKILLS: { label: string; value: number }[] = [
  { label: "TypeScript", value: 90 },
  { label: "React / Next.js", value: 92 },
  { label: "Node.js", value: 85 },
  { label: "Tailwind CSS", value: 88 },
  { label: "Framer Motion", value: 80 },
  { label: "Testing (Jest/RTL)", value: 76 },
  { label: "Design Systems", value: 74 },
];
const TESTIMONIALS = [
  { name: "Jane Doe", role: "Product Manager, Acme Inc.", text: "Clement delivered beyond expectations. Clear communication and pixel‑perfect implementation.", avatar: "/avatar1.png" },
  { name: "John Smith", role: "Tech Lead, Startup Co.", text: "Great engineering instincts and strong UI/UX empathy. Would gladly work together again.", avatar: "/avatar2.png" },
];
const BLOGS = [
  { title: "Animating React Apps with Framer Motion", href: "https://dev.to/", date: "2024-10-10" },
  { title: "Scaling Next.js Projects: Patterns that Work", href: "https://medium.com/", date: "2024-08-22" },
  { title: "TypeScript Tips for UI Engineers", href: "https://dev.to/", date: "2024-06-02" },
];
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/clementvsc" },
  { label: "GitHub", href: "https://github.com/Clementvsc" },
  { label: "Dev.to", href: "https://dev.to/" },
  { label: "Medium", href: "https://medium.com/@" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
];

// Dark mode
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "light" | "dark") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

// Components
function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 md:py-16">
      <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl md:text-3xl font-semibold mb-6">
        {title}
      </motion.h2>
      <div>{children}</div>
    </section>
  );
}
function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <motion.div variants={fadeInUp} className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: "easeOut" }} className="h-full bg-zinc-900 dark:bg-zinc-100" />
      </div>
    </motion.div>
  );
}
function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <motion.div variants={fadeInUp} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/40 backdrop-blur">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <Image alt={t.name} src={t.avatar} fill sizes="40px" />
        </div>
        <div>
          <p className="font-medium">{t.name}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
        </div>
      </div>
      <p className="text-sm leading-6">“{t.text}”</p>
    </motion.div>
  );
}
function RepoCard({ r }: { r: Repo }) {
  return (
    <motion.article variants={fadeInUp} className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900 transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="font-semibold text-lg">
          <Link href={r.homepage || r.html_url} target="_blank" className="hover:underline">
            {r.name}
          </Link>
        </h3>
        {r.language && <span className="text-xs rounded-full px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">{r.language}</span>}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-3">{r.description}</p>
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        <Link className="hover:underline" href={r.html_url} target="_blank">Code</Link>
        {r.homepage && (<><span>•</span><Link className="hover:underline" href={r.homepage} target="_blank">Live</Link></>)}
        <span className="ml-auto">Updated {new Date(r.updated_at).toLocaleDateString()}</span>
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const GITHUB_USERNAME = "Clementvsc";

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchRepos(GITHUB_USERNAME)
      .then((r) => {
        if (!active) return;
        const cleaned = r.filter((x) => !x.fork && !x.archived);
        setRepos(cleaned);
        setError(null);
      })
      .catch((e) => setError(e.message ?? "Failed to load repositories"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => repos.slice(0, 6), [repos]);

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="pt-12 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
            <Image alt="Profile" src="/avatar.png" fill sizes="128px" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Hi, I’m Clement — Frontend Engineer</h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">I build elegant, performant web experiences with React, Next.js, and delightful motion. I care about accessibility, design systems, and polished details.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/cv.pdf" target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">Download CV</Link>
              <Link href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 hover:opacity-90">Contact Me</Link>
              <button onClick={toggle} aria-label="Toggle dark mode" className="ml-auto md:ml-3 inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">{theme === "dark" ? "Light Mode" : "Dark Mode"}</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Socials */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-8">
        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s) => (
            <motion.a key={s.label} variants={fadeInUp} href={s.href} target="_blank" rel="noreferrer" className="text-sm rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {s.label}
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <Section title="Skills">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 gap-6">
          {SKILLS.map((s) => (
            <SkillBar key={s.label} label={s.label} value={s.value} />
          ))}
        </motion.div>
      </Section>

      {/* Education & Certifications */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <Section title="Education">
          <div className="grid md:grid-cols-2 gap-4">
            {EDUCATION.map((e) => (
              <motion.div key={e.school} variants={fadeInUp} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{e.school}</p>
                  <span className="text-xs text-zinc-500">{e.period}</span>
                </div>
                <p className="text-sm mt-1">{e.degree}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{e.details}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <div className="grid md:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((c) => (
              <motion.div key={c.name} variants={fadeInUp} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{c.issuer} · {c.year}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* Projects (GitHub) */}
      <Section title="Projects">
        {loading && <p className="text-sm text-zinc-500">Loading projects…</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && !error && (
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 gap-4">
            {featured.map((r) => (
              <RepoCard key={r.id} r={r} />
            ))}
          </motion.div>
        )
