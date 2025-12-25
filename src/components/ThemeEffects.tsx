import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeEffects = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showNewYearFireworks, setShowNewYearFireworks] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer: Fireworks start 2.5s AFTER the New Year confetti begins
  useEffect(() => {
    if (theme === "newyear") {
      const timer = setTimeout(() => {
        setShowNewYearFireworks(true);
      }, 2500); 
      return () => clearTimeout(timer);
    } else {
      setShowNewYearFireworks(false);
    }
  }, [theme]);

  if (!mounted) return null;

  // --- CHRISTMAS EFFECT (Optimized: Fewer flakes, background only) ---
  if (theme === "christmas") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`snow-${i}`}
            className="absolute bg-white rounded-full opacity-60"
            initial={{
              x: Math.random() * windowSize.width,
              y: -10,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: windowSize.height + 10,
              x: Math.random() * windowSize.width + (Math.random() - 0.5) * 50,
            }}
            transition={{
              duration: Math.random() * 10 + 10, // Slower, smoother
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            style={{
              width: Math.random() * 3 + 2 + "px",
              height: Math.random() * 3 + 2 + "px",
            }}
          />
        ))}
      </div>
    );
  }

  // --- NEW YEAR EFFECT (Optimized) ---
  if (theme === "newyear") {
    const colors = ["#FFD700", "#FF00FF", "#00FFFF", "#FF3333", "#33FF33"];
    
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center">
        
        {/* 1. Background Watermark (Static, low opacity for performance) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none z-[-1]">
          <div className="flex flex-col items-center">
            <h1 className="font-display font-black text-[12vw] leading-none text-foreground">
              HAPPY
            </h1>
            <h1 className="font-display font-black text-[25vw] leading-[0.8] text-foreground blur-[1px]">
              2026
            </h1>
          </div>
        </div>

        {/* 2. Fireworks (Simple burst, low particle count) */}
        {showNewYearFireworks && (
          <div className="absolute inset-0 z-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`ny-firework-${i}`}
                className="absolute"
                initial={{
                  x: Math.random() * windowSize.width,
                  y: windowSize.height,
                  scale: 0,
                }}
                animate={{
                  y: [windowSize.height, windowSize.height * (0.2 + Math.random() * 0.5)],
                  opacity: [1, 1, 0],
                  scale: [0, 1, 2.5], 
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              >
                <div className="relative w-4 h-4">
                  {[...Array(12)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute top-0 left-0 w-1 h-3 rounded-full"
                      style={{
                        backgroundColor: colors[j % colors.length],
                        transform: `rotate(${j * 30}deg) translateY(-30px)`,
                        boxShadow: `0 0 5px ${colors[j % colors.length]}`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 3. Falling Confetti (Reduced count for performance) */}
        <div className="absolute inset-0 z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`confetti-fall-${i}`}
              className="absolute"
              initial={{
                x: Math.random() * windowSize.width,
                y: -20,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: windowSize.height + 50,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                width: Math.random() * 6 + 4 + "px",
                height: Math.random() * 6 + 4 + "px",
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // --- DIWALI EFFECT (Optimized) ---
  if (theme === "diwali") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height,
              scale: 0,
            }}
            animate={{
              y: [windowSize.height, windowSize.height * 0.3, windowSize.height * 0.3],
              opacity: [1, 1, 0],
              scale: [0, 1, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              times: [0, 0.5, 1],
            }}
          >
            <div className="relative w-4 h-4">
              {[...Array(8)].map((_, j) => (
                <div
                  key={j}
                  className="absolute top-0 left-0 w-1 h-2 bg-yellow-500 rounded-full"
                  style={{
                    transform: `rotate(${j * 45}deg) translateY(-20px)`,
                    boxShadow: "0 0 10px gold",
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
        <div className="absolute top-0 left-4 md:left-10 animate-pulse origin-top z-0">
           <DiyaIcon className="w-12 h-12 md:w-16 md:h-16 text-orange-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]" />
        </div>
        <div className="absolute top-0 right-4 md:right-10 animate-pulse delay-700 origin-top z-0">
           <DiyaIcon className="w-12 h-12 md:w-16 md:h-16 text-orange-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]" />
        </div>
      </div>
    );
  }

  // --- HOLI EFFECT (Reduced Blur usage) ---
  if (theme === "holi") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Using opacity instead of heavy blur filters for performance */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-pink-500/10 rounded-full mix-blend-multiply"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-500/10 rounded-full mix-blend-multiply"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full mix-blend-multiply"
          animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
    );
  }

  return null;
};

const DiyaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C12 2 10 6 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6 12 2 12 2Z" className="text-yellow-400" />
    <path d="M2 14C2 14 3 20 12 20C21 20 22 14 22 14H2Z" />
  </svg>
);

export default ThemeEffects;