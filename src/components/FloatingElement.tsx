import { motion, useMotionValue } from "framer-motion";
import { useGravity } from "@/context/GravityContext";
import { useEffect, useRef, useState } from "react";

interface FloatingElementProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const FloatingElement = ({ children, className = "", delay = 0 }: FloatingElementProps) => {
    const { isGravityActive } = useGravity();
    const [randomConfig, setRandomConfig] = useState({
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0,
    });

    const constraintsRef = useRef(null);

    useEffect(() => {
        if (isGravityActive) {
            // Calculate random positions based on viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Random position within 80% of viewport to keep somewhat visible
            const randomX = (Math.random() - 0.5) * viewportWidth * 0.8;
            const randomY = (Math.random() - 0.5) * viewportHeight * 0.8;
            const randomRotate = (Math.random() - 0.5) * 90; // Rotate between -45 and 45 degrees
            const randomDuration = 10 + Math.random() * 20; // Slow float duration 10-30s

            setRandomConfig({
                x: randomX,
                y: randomY,
                rotate: randomRotate,
                duration: randomDuration,
            });
        }
    }, [isGravityActive]);

    const floatAnimation = isGravityActive ? {
        x: [randomConfig.x, randomConfig.x + (Math.random() - 0.5) * 50, randomConfig.x],
        y: [randomConfig.y, randomConfig.y + (Math.random() - 0.5) * 50, randomConfig.y],
        rotate: [randomConfig.rotate, randomConfig.rotate + (Math.random() - 0.5) * 10, randomConfig.rotate],
        transition: {
            duration: randomConfig.duration,
            repeat: Infinity,
            ease: "easeInOut",
        }
    } : {
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20
        }
    };

    return (
        <motion.div
            className={`relative ${className}`}
            animate={floatAnimation}
            drag={isGravityActive}
            dragMomentum={true}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            whileTap={{ cursor: "grabbing" }}
            style={{
                cursor: isGravityActive ? "grab" : "auto",
                zIndex: isGravityActive ? 50 : "auto",
                // When active, we want to break out of layout flow ideally, 
                // but for simplicity in this implementation we rely on transform
                // capable of moving it visually anywhere.
            }}
        >
            {children}
        </motion.div>
    );
};

export default FloatingElement;
