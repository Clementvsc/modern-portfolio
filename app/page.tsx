"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function HomePage() {
  const featured = useMemo(() => [
    {
      title: "Modern Portfolio",
      description: "A sleek, responsive portfolio built with Next.js and Tailwind CSS",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/username/modern-portfolio",
      live: "https://portfolio.example.com"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/username/ecommerce",
      live: "https://shop.example.com"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["Vue.js", "Firebase", "Vuetify"],
      github: "https://github.com/username/taskmanager",
      live: "https://tasks.example.com"
    }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-300 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Available for new opportunities.{' '}
              <a href="#contact" className="font-semibold text-purple-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Get in touch <ArrowUpRight className="inline h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Full Stack Developer
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              I create exceptional digital experiences through clean code and thoughtful design.
              Specializing in React, Node.js, and modern web technologies.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#projects"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                View My Work
              </a>
              <a href="#about" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">About Me</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Passionate about creating digital solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              With over 5 years of experience in web development, I specialize in building
              scalable applications that solve real-world problems. I'm passionate about
              clean code, user experience, and staying up-to-date with the latest technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">Portfolio</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Featured Projects
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {featured.map((project, index) => (
                <div key={index} className="flex flex-col">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <Github className="h-6 w-6 text-white" />
                  </div>
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    {project.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-full bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-4">
                      <a
                        href={project.github}
                        className="text-sm font-semibold leading-6 text-purple-400 hover:text-purple-300"
                      >
                        Code <ArrowUpRight className="inline h-4 w-4" />
                      </a>
                      <a
                        href={project.live}
                        className="text-sm font-semibold leading-6 text-purple-400 hover:text-purple-300"
                      >
                        Live Demo <ArrowUpRight className="inline h-4 w-4" />
                      </a>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">Contact</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let's work together
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              I'm always interested in new opportunities and interesting projects.
              Feel free to reach out if you'd like to discuss potential collaboration.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-purple-400"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/yourusername"
                className="text-gray-400 hover:text-purple-400"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                className="text-gray-400 hover:text-purple-400"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
