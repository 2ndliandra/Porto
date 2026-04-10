import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import Cursor from './components/Cursor';

function App() {
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
