import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState("");
  const fullText = "Ashwin's Portfolio";

  useEffect(() => {
    // Reduced total waiting time from 2000ms to 1500ms for a snappier load
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); 

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 75); // Speed increased: 75ms per character (was 150ms)

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} // Faster fade out
    >
      <div className="relative">
        <motion.span
          className="font-display text-4xl md:text-6xl font-bold gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }} // Faster blinking cursor
            className="text-primary inline-block ml-1"
          >
            _
          </motion.span>
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Preloader;