import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const ScrambleText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const [displayText, setDisplayText] = useState(text);
    // Using a mix of uppercase, lowercase and special chars for a "matrix" feel, but cleaner
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const requestRef = useRef<number>();
    const startTimeRef = useRef<number>();
    const isHovering = useRef(false);

    const scramble = (triggerDelay = 0) => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);

        const startDelay = triggerDelay;
        startTimeRef.current = Date.now() + startDelay;

        // Slower duration for a more "cinematic" feel
        const DURATION = 800;

        const animate = () => {
            const now = Date.now();

            if (now < (startTimeRef.current || 0)) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }

            const elapsed = now - (startTimeRef.current || now);
            const progress = Math.min(elapsed / DURATION, 1);

            // Quartic easing for very smooth slowdown
            const ease = 1 - Math.pow(1 - progress, 4);

            const revealCount = Math.floor(ease * text.length);

            const nextText = text
                .split("")
                .map((char, index) => {
                    if (index < revealCount) return char;
                    if (char === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            setDisplayText(nextText);

            if (progress < 1) {
                requestRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(text); // Ensure final text is correct
            }
        };

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Initial scramble effect
        scramble(delay);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [text, delay]);

    return (
        <motion.span
            className={className}
            onHoverStart={() => {
                isHovering.current = true;
                scramble(0);
            }}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
        >
            {displayText}
        </motion.span>
    );
};
