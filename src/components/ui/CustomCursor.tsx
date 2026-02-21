import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const innerCursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.1 });
    const innerCursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.1 });

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Glowing Orb Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999] mix-blend-screen hidden md:block bg-primary/10 shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? "rgba(255, 0, 255, 0.2)" : "rgba(255, 0, 255, 0.05)",
                    boxShadow: isHovering ? "0 0 40px rgba(255,0,255,0.8)" : "0 0 20px rgba(255,0,255,0.4)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground pointer-events-none z-[9999] mix-blend-difference hidden md:block shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{
                    x: innerCursorXSpring,
                    y: innerCursorYSpring,
                    translateX: "12px",
                    translateY: "12px",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
