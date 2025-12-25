import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeEffects = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- CHRISTMAS EFFECT (Falling Snow) ---
  if (theme === "christmas") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: window.innerHeight + 10,
              x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 100, // Wind effect
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
            }}
          />
        ))}
      </div>
    );
  }

  // --- DIWALI EFFECT (Firecrackers & Diyas) ---
  if (theme === "diwali") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Firework Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
              scale: 0,
            }}
            animate={{
              y: [window.innerHeight, window.innerHeight * 0.3, window.innerHeight * 0.3],
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
            {/* Explosion burst */}
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

        {/* Hanging Diyas (Top Corners) */}
        <div className="absolute top-0 left-10 animate-pulse">
           <DiyaIcon className="w-16 h-16 text-orange-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]" />
        </div>
        <div className="absolute top-0 right-10 animate-pulse delay-700">
           <DiyaIcon className="w-16 h-16 text-orange-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]" />
        </div>
      </div>
    );
  }

  // --- HOLI EFFECT (Dry Colors / Gulal) ---
  if (theme === "holi") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Pink Cloud */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-500/20 blur-[100px] rounded-full mix-blend-screen"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        {/* Yellow Cloud */}
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-500/20 blur-[100px] rounded-full mix-blend-screen"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        {/* Cyan Cloud */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-cyan-500/20 blur-[80px] rounded-full mix-blend-screen"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
    );
  }

  return null;
};

// Simple SVG Component for Diya
const DiyaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Flame */}
    <path d="M12 2C12 2 10 6 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6 12 2 12 2Z" className="text-yellow-400" />
    {/* Lamp Base */}
    <path d="M2 14C2 14 3 20 12 20C21 20 22 14 22 14H2Z" />
  </svg>
);

export default ThemeEffects;