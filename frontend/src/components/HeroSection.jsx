import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import profileImg from '../assets/profile.jpeg';

const FloatingBadge = ({ text, delay = 0, yOffset = [0, -50, 0], top, left, right, bottom }) => {
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
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#070b14]">
      {/* Yin-Yang Mesh Gradient — Two halves rotating as one */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Rotating Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-30%] w-[160%] h-[160%]"
        >
          {/* Yang — Blue half */}
          <div className="absolute top-[10%] left-[10%] w-[55%] h-[55%] rounded-full blur-[120px] bg-blue-400/50 dark:bg-blue-500/25"></div>

          {/* Yin — Green half */}
          <div className="absolute bottom-[10%] right-[10%] w-[55%] h-[55%] rounded-full blur-[120px] bg-emerald-400/50 dark:bg-emerald-500/25"></div>
        </motion.div>

        {/* Static accent blobs for depth */}
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full blur-[100px] bg-teal-300/30 dark:bg-teal-500/15"></div>
        <div className="absolute bottom-[25%] right-[25%] w-[35%] h-[35%] rounded-full blur-[100px] bg-sky-300/25 dark:bg-sky-500/10"></div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
            loading="lazy"
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
