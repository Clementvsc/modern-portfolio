'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Home, User, Code, Briefcase, MessageCircle, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
}

const Navbar = ({ scrollToSection, activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'hero', icon: Home },
    { name: 'About', id: 'about', icon: User },
    { name: 'Skills', id: 'skills', icon: Code },
    { name: 'Projects', id: 'projects', icon: Briefcase },
    { name: 'Experience', id: 'experience', icon: Briefcase },
    { name: 'Blog', id: 'blog', icon: BookOpen },
    { name: 'Contact', id: 'contact', icon: MessageCircle },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200/20 dark:border-slate-700/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => handleNavClick('hero')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Portfolio
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2',
                      activeSection === item.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                    {item.name}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/20 dark:border-slate-700/20"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-3',
                      activeSection === item.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                    )}
                  >
                    <Icon size={20} />
                    {item.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
