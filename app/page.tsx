import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
                Skills
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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Clement
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Full-stack developer passionate about creating beautiful, functional web experiences
            with modern technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm a passionate full-stack developer with expertise in modern web technologies.
                I love building scalable applications that solve real-world problems and provide
                exceptional user experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  Problem Solver
                </span>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                  Team Player
                </span>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Continuous Learner
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-2xl">
                <div className="bg-gray-900 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">C</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Clement VSC</h3>
                    <p className="text-gray-400">Full-Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'React', level: 90 },
              { name: 'Next.js', level: 85 },
              { name: 'TypeScript', level: 88 },
              { name: 'Node.js', level: 82 },
              { name: 'Python', level: 75 },
              { name: 'PostgreSQL', level: 80 },
              { name: 'Docker', level: 70 },
              { name: 'AWS', level: 65 }
            ].map((skill) => (
              <div key={skill.name} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 mt-1">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                github: 'https://github.com/Clementvsc/ecommerce-platform',
                demo: 'https://ecommerce-demo.vercel.app'
              },
              {
                title: 'Task Management App',
                description: 'Collaborative task management tool with real-time updates and team features.',
                tech: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
                github: 'https://github.com/Clementvsc/task-manager',
                demo: 'https://taskmanager-demo.vercel.app'
              },
              {
                title: 'Weather Dashboard',
                description: 'Beautiful weather app with forecasts, maps, and location-based features.',
                tech: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind'],
                github: 'https://github.com/Clementvsc/weather-dashboard',
                demo: 'https://weather-dashboard-demo.vercel.app'
              }
            ].map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-blue-400/50 transition-colors">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <a
                href="mailto:clement@example.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                clement@example.com
              </a>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/clementvsc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                /in/clementvsc
              </a>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <a
                href="https://github.com/Clementvsc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @Clementvsc
              </a>
            </div>
          </div>
          <a
            href="mailto:clement@example.com"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Clement VSC. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
