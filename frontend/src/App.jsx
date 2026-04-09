import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import Cursor from './components/Cursor';

function App() {
  useEffect(() => {
    // Anti-Screenshot & Anti-Copy System
    const handleKeyDown = (e) => {
      // Prevent PrintScreen key
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        navigator.clipboard.writeText(''); // Clear clipboard attempting to take snap
        alert('Screenshots are disabled on this portfolio.');
      }

      // Prevent common OS-level shortcut combos:
      // Mac: Cmd + Shift + 4, Cmd + Shift + 3, Cmd + Shift + 5
      // Win: Windows + Shift + S
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5' || e.key.toLowerCase() === 's')) {
        e.preventDefault();
        alert('Screenshots are disabled on this portfolio.');
      }

      // Prevent Ctrl+P / Cmd+P (Print to PDF)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
      }

      // Prevent Ctrl+S / Cmd+S (Save webpage)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
      
      // Prevent F12 and Ctrl+Shift+I (DevTools)
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i')) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      // Prevent Right-Click
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <Router>
      <Cursor />
      {/* Ambient glow overlays — dark mode only */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block" aria-hidden="true">
        <div className="ambient-glow absolute -top-1/4 -left-1/4 w-[60vw] h-[60vh] rounded-full bg-blue-500/[0.04] blur-[120px]"></div>
        <div className="ambient-glow-delayed absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vh] rounded-full bg-indigo-500/[0.03] blur-[100px]"></div>
        <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full bg-cyan-500/[0.02] blur-[140px]"></div>
      </div>
      <div className="min-h-screen flex flex-col relative z-[1]">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
