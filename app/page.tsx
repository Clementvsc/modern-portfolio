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
              <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="#skills" className="text-gray-300 hover:text-white transition-colors">
                Skills
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
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
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Full Stack Developer & UI/UX Designer
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            I create beautiful, functional, and user-centered digital experiences.
            Passionate about modern web technologies and clean design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#projects"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg mb-6">
                I'm a passionate full-stack developer with over 3 years of experience
                building modern web applications. I love creating intuitive user
                experiences and writing clean, efficient code.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open source projects, or enjoying a good cup of coffee.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  Problem Solver
                </span>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  Creative Thinker
                </span>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                  Team Player
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center">
                <div className="text-white text-6xl mb-4">👋</div>
                <h3 className="text-white text-xl font-semibold mb-2">Let's Connect!</h3>
                <p className="text-blue-100">Always excited to collaborate on new projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js',
              'Python', 'PostgreSQL', 'MongoDB', 'AWS',
              'Docker', 'Git', 'Figma', 'Tailwind CSS'
            ].map((skill) => (
              <div
                key={skill}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-white font-semibold">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'Modern e-commerce solution built with Next.js and Stripe',
                tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
                image: '/project1.jpg'
              },
              {
                title: 'Task Management App',
                description: 'Collaborative task management with real-time updates',
                tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
                image: '/project2.jpg'
              },
              {
                title: 'AI Writing Assistant',
                description: 'AI-powered writing tool with grammar and style suggestions',
                tech: ['Python', 'FastAPI', 'OpenAI', 'React'],
                image: '/project3.jpg'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-4xl">🚀</span>
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
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
          <h2 className="text-4xl font-bold text-white mb-8">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12">
            Have a project in mind? I'd love to hear about it.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-300">clement@example.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-300">linkedin.com/in/clement</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🐙</div>
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <p className="text-gray-300">github.com/clementvsc</p>
            </div>
          </div>
          <Link
            href="mailto:clement@example.com"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Send Message
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Clement. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
