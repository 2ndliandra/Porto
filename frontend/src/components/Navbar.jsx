import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Contact', path: '/#contact' }
  ];

  const handleScrollTo = (id) => {
    setIsOpen(false);
    if (location.pathname === '/' && id.startsWith('/#')) {
      const element = document.getElementById(id.replace('/#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-secondary/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Portoku</Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              location.pathname === '/' && link.path.startsWith('/#') ? (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.path)}
                  className="text-slate-600 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-600 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
            
            <button onClick={toggleTheme} className="text-slate-500 dark:text-text-muted hover:text-amber-500 dark:hover:text-amber-400 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-slate-500 dark:text-text-muted hover:text-amber-500 transition-colors">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-text-muted hover:text-black dark:hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-50 dark:bg-[#0b1120] dark:glass absolute top-16 left-0 w-full border-b border-black/10 dark:border-white/10 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              location.pathname === '/' && link.path.startsWith('/#') ? (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.path)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-text-muted hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-text-muted hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
