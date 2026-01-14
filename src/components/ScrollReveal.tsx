/* src/components/ScrollReveal.tsx */
import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

const directionVariants: Record<string, { hidden: object; visible: object }> = {
  up: {
    hidden: { opacity: 0, y: 40 }, // Reduced distance from 60 to 40
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.4, // Faster default duration (was 0.6)
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" }); // Smaller margin to trigger earlier

  const variants = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants as Variants}
      transition={{
        duration,
        delay,
        ease: "easeOut", // Simpler easeOut is often snappier than complex beziers
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;