"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Simple GitHub repos fetcher (client-side)
async function fetchRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    // Prevent Next.js caching in edge/CDN and keep it simple client-side
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("Failed to load repositories");
  const data = await res.json();
  // Map to a slimmer shape
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

export default function HomePage() {
  const [repos, setRepos] = useState<
    Array<{
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
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchRepos("Clementvsc")
      .then((r) => {
        if (!mounted) return;
        // Only public, non-archived
        const filtered = r.filter((x) => !x.archived);
        setRepos(filtered);
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const languages = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [repos]);
  const [langFilter, setLangFilter] = useState("All");

  const filteredRepos = useMemo(() => {
    return repos.filter((r) => (langFilter === "All" ? true : r.language === langFilter));
  }, [repos, langFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="#" className="text-2xl font-bold text-white" aria-label="Go to homepage">
              Portfolio
            </Link>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Sahaya Clement Vincent Martin
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Tech enthusiast and full‑stack developer building delightful, performant web experiences.
            Based in Toronto, Canada.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 items-center">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">About</h2>
            <p className="text-gray-300 leading-relaxed">
              I'm Sahaya Clement Vincent Martin, a tech enthusiast and full‑stack developer passionate
              about crafting modern, accessible, and scalable web applications. I enjoy working across
              the stack—from intuitive UIs to robust backends—and continuously explore new tools to
              improve developer experience and product quality.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-40 w-40 rounded-full overflow-hidden ring-2 ring-white/20">
              <Image
                src="/avatar.png"
                alt="Portrait of Sahaya Clement Vincent Martin"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Projects</h2>
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLangFilter(l)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors border ${
                    langFilter === l
                      ? "bg-blue-600 text-white border-blue-500"
                      : "text-blue-300 border-blue-500/30 hover:bg-blue-600/20"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {loading && (
              <motion.p
                key="loading"
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Loading repositories...
              </motion.p>
            )}
            {error && (
              <motion.p
                key="error"
                className="text-red-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {filteredRepos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.02 }}
                className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
                  {repo.language && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-200 border border-blue-500/30">
                      {repo.language}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mt-2 line-clamp-3 min-h-[3.5rem]">{repo.description}</p>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-300 hover:text-white underline"
                  >
                    GitHub
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 hover:text-white underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-300 mb-8">
            I'd love to connect. Feel free to reach out via email or LinkedIn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:clementvsc.martin@gmail.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              clementvsc.martin@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sahaya-clement/"
              target="_blank"
              rel="noreferrer"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Clementvsc"
              target="_blank"
              rel="noreferrer"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400">
        © {new Date().getFullYear()} Sahaya Clement Vincent Martin • Toronto, Canada
      </footer>
    </div>
  );
}
