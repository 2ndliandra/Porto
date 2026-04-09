import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import profileImg from '../assets/profile.jpeg';

const FloatingBadge = ({ text, delay = 0, yOffset = [0, -10, 0], top, left, right, bottom }) => {
  return (
    <motion.div
      className="absolute bg-white/80 dark:bg-white/10 px-4 py-2 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-white/10 shadow-lg dark:shadow-none z-20 pointer-events-none hidden md:block backdrop-blur-md transition-colors duration-500"
      style={{ top, left, right, bottom }}
      animate={{ y: yOffset }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {text}
    </motion.div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const handleAvatarClick = () => {
    clickCount.current += 1;

    if (clickTimer.current) clearTimeout(clickTimer.current);

    if (clickCount.current === 3) {
      navigate('/admin');
      clickCount.current = 0;
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1000); // Reset timeout window (1s)
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-secondary dark:via-secondary dark:to-[#070b14] transition-colors duration-500">
      {/* Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-300/30 dark:bg-fuchsia-600/10 rounded-full blur-[100px] dark:blur-[150px] pointer-events-none transition-all duration-500"
      ></motion.div>
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-300/30 dark:bg-cyan-500/10 rounded-full blur-[80px] dark:blur-[120px] pointer-events-none transition-all duration-500"
      ></motion.div>
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-violet-300/30 dark:bg-violet-600/10 rounded-full blur-[100px] dark:blur-[150px] pointer-events-none transition-all duration-500"
      ></motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >

        {/* Floating Badges */}
        <FloatingBadge text="Frontend Developer" top="10%" left="-15%" delay={0} />
        <FloatingBadge text="Automation" top="40%" right="-20%" delay={1} yOffset={[0, -15, 0]} />
        <FloatingBadge text="React & Node.js" bottom="15%" left="-5%" delay={0.5} yOffset={[0, -8, 0]} />

        {/* Decorative Cursors themed nicely with the Porto styling */}
        <motion.div
          className="absolute z-20 pointer-events-none hidden md:flex flex-col items-center justify-center"
          style={{ top: '100%', left: '26%' }}
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
            rotate: [90, 100, 90]
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.2 }}
        >
          <MousePointer2 size={36} className="text-blue-500 dark:text-blue-400 fill-blue-500/20 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
        </motion.div>

        <motion.div
          className="absolute z-20 pointer-events-none hidden md:flex flex-col items-center justify-center"
          style={{ top: '55%', right: '-3%' }}
          animate={{
            y: [0, -10, 0],
            x: [0, -8, 0],
            rotate: [-12, -8, -12]
          }}
          transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.8 }}
        >
          <MousePointer2 size={36} className="text-indigo-500 dark:text-indigo-400 fill-indigo-500/20 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
        </motion.div>

        {/* Profile Avatar */}
        <motion.div variants={itemVariants} className="relative mb-8 group cursor-pointer" onClick={handleAvatarClick}>
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-[20px] opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"></div>
          <img
            src={profileImg}
            alt="Moch Novaliandra"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white dark:border-white/5 relative z-10 shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="space-y-4 mb-6 relative z-10">
          <h2 className="text-xl md:text-2xl text-blue-600 dark:text-cyan-400 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.2)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">Hi! I Am</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 py-2 transition-colors duration-500">
            Moch <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-fuchsia-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-gradient inline-block">Novaliandra</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-white/80 transition-colors duration-500">
            Backend  Developer <span className="text-fuchsia-500 mx-2">|</span> Technology Enthusiast
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="max-w-2xl mb-10">
          <p className="text-lg text-slate-600 dark:text-text-muted leading-relaxed transition-colors duration-500">
            I build modern web applications and automation systems with clean, scalable, and sophisticated solutions. Let's turn complex problems into elegant digital experiences. This portofolio webisite is made with React.js, Tailwind CSS, Framer Motion and CRM features.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-4">
          <a href="#projects" className="group relative inline-flex items-center justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-full blur opacity-40 dark:opacity-50 group-hover:opacity-80 dark:group-hover:opacity-100 transition duration-300 group-hover:scale-105"></div>
            <button className="relative bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-8 py-3.5 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 shadow-xl overflow-hidden">
              <span>View My Projects</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </button>
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
