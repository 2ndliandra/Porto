import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ skill, IconComponent, colorTheme = 'cyan', itemVariants }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoHovering, setIsAutoHovering] = useState(false);

  useEffect(() => {
    let timeoutId;
    let autoHoverTimeoutId;
    
    const triggerAutoHover = () => {
      // Only trigger auto hover if the user isn't actively hovering
      if (!isHovered) {
        setIsAutoHovering(true);
        
        // Auto-hover lasts 1s to 2s
        const duration = Math.random() * 1000 + 1000;
        autoHoverTimeoutId = setTimeout(() => {
          setIsAutoHovering(false);
          scheduleNextAutoHover();
        }, duration);
      } else {
        scheduleNextAutoHover();
      }
    };

    const scheduleNextAutoHover = () => {
      // Interval of 4s to 8s
      const waitTime = Math.random() * 4000 + 4000;
      timeoutId = setTimeout(triggerAutoHover, waitTime);
    };

    // Stagger initial random start so they don't all fire at 4s simultaneously
    const initialDelay = Math.random() * 4000;
    timeoutId = setTimeout(scheduleNextAutoHover, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoHoverTimeoutId);
    };
  }, [isHovered]);

  const activeState = isHovered ? 'hover' : isAutoHovering ? 'auto' : 'idle';

  const themeConfig = {
    cyan: {
      lightBg: 'bg-cyan-400 dark:bg-cyan-500',
      iconTextId: 'text-blue-500 dark:text-blue-400',
      iconHoverId: 'text-cyan-500 dark:text-cyan-400',
      shadowColorStr: '6, 182, 212', // rgb for cyan-500
      ringClass: ''
    },
    amber: {
      lightBg: 'bg-amber-400 dark:bg-amber-500',
      iconTextId: 'text-amber-500 dark:text-amber-600',
      iconHoverId: 'text-amber-400 dark:text-amber-400',
      shadowColorStr: '245, 158, 11', // rgb for amber-500
      ringClass: 'ring-1 ring-slate-200 dark:ring-white/5 border border-transparent'
    }
  };

  const config = themeConfig[colorTheme];

  // Animation values based on active state
  let cardScale = 1;
  let cardY = 0;
  let cardShadow = 'none';
  let lightOpacity = 0;
  let iconFilter = 'drop-shadow(0 0 0px rgba(0,0,0,0))';
  let iconColor = ''; // We will rely on CSS classes for color to keep dark mode simple, mostly animating the glow.
  
  if (activeState === 'hover') {
    cardScale = 1.06;
    cardY = -5;
    cardShadow = `0 20px 40px -10px rgba(${config.shadowColorStr}, 0.25)`;
    lightOpacity = 0.5;
    iconFilter = `drop-shadow(0 0 15px rgba(${config.shadowColorStr}, 0.8))`;
  } else if (activeState === 'auto') {
    cardScale = 1.03;
    cardY = -2;
    cardShadow = `0 10px 30px -10px rgba(${config.shadowColorStr}, 0.15)`;
    lightOpacity = 0.25;
    iconFilter = `drop-shadow(0 0 10px rgba(${config.shadowColorStr}, 0.5))`;
  }

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        y: cardY, 
        scale: cardScale, 
        boxShadow: cardShadow 
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`glass p-6 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden bg-white/40 dark:bg-[#0b1120]/40 transition-colors ${config.ringClass} ${
        activeState !== 'idle' && colorTheme === 'amber' ? 'border-amber-300/30 dark:border-amber-500/30' : ''
      }`}
    >
      {/* Central Ambient Glow */}
      <motion.div
        className={`absolute w-32 h-32 rounded-full blur-[40px] pointer-events-none z-0 ${config.lightBg}`}
        animate={{ opacity: lightOpacity }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Overlay gradient fade-in for depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 z-0 pointer-events-none"
        animate={{ opacity: activeState !== 'idle' ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Icon Wrapper */}
      <motion.div
        className={`transition-colors duration-500 relative z-10 ${activeState !== 'idle' ? config.iconHoverId : config.iconTextId}`}
        animate={{ filter: iconFilter }}
        transition={{ duration: 0.6 }}
      >
        <IconComponent size={28} />
      </motion.div>
      
      <span className="font-semibold tracking-wide text-slate-800 dark:text-white/90 relative z-10 transition-colors duration-500">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default SkillCard;
