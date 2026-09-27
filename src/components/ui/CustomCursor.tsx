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

        document.body.classList.add('cursor-none-global');

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
            document.body.classList.remove('cursor-none-global');
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Tech Ring Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border-[1.5px] border-primary/60 pointer-events-none z-[9999] hidden md:block flex items-center justify-center backdrop-invert-[0.1]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-4px",
                    translateY: "-4px",
                }}
                animate={{
                    scale: isHovering ? 1.4 : 1,
                    backgroundColor: isHovering ? "hsl(var(--primary) / 0.1)" : "transparent",
                    borderColor: isHovering ? "hsl(var(--primary) / 0.8)" : "hsl(var(--primary) / 0.4)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {isHovering && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 border-[1px] border-primary/30 rounded-full scale-[1.2] animate-pulse"
                />
              )}
            </motion.div>

            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-none bg-primary pointer-events-none z-[9999] hidden md:block shadow-[0_0_8px_hsl(var(--primary))]"
                style={{
                    x: innerCursorXSpring,
                    y: innerCursorYSpring,
                    translateX: "13px",
                    translateY: "13px",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
