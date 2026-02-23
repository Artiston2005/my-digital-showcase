import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Project } from "@/data/projects";
import { LottiePlayer, LottiePlayerHandle } from "@/components/ui/LottiePlayer";

const ProjectCard = ({ project, isLandscape = false }: { project: Project; isLandscape?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<LottiePlayerHandle>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [imagesRevealed, setImagesRevealed] = useState(!project.lottieAnimation);
    const [skipTransition, setSkipTransition] = useState(false);
    const lastProgressRef = useRef(0);

    // Scroll-scrub: track how far the card has traveled through the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "start 0.4"], // animation plays while card travels from bottom of viewport to upper-middle area
    });

    // Scrub the Lottie animation frame based on scroll progress
    const handleScrollScrub = useCallback(() => {
        if (!project.lottieAnimation || !lottieRef.current) return;
        if (!lottieRef.current.isReady) return;

        const progress = scrollYProgress.get();
        const totalFrames = lottieRef.current.totalFrames;
        if (totalFrames <= 0) return;

        // Detect fast scrolling (progress jumped > 0.3 in one frame)
        const delta = Math.abs(progress - lastProgressRef.current);
        lastProgressRef.current = progress;
        const isFastScroll = delta > 0.3;

        const animProgress = Math.min(progress / 0.9, 1);
        const frame = Math.floor(animProgress * (totalFrames - 1));
        lottieRef.current.goToFrame(frame);

        // Reveal images once animation completes
        if (animProgress >= 1 && !imagesRevealed) {
            if (isFastScroll) setSkipTransition(true); // instant reveal for fast scrollers
            setImagesRevealed(true);
        }
    }, [project.lottieAnimation, scrollYProgress, imagesRevealed]);

    useEffect(() => {
        if (!project.lottieAnimation) return;
        const unsubscribe = scrollYProgress.on("change", handleScrollScrub);
        return () => unsubscribe();
    }, [scrollYProgress, handleScrollScrub, project.lottieAnimation]);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(mobile);
            if (mobile && project.lottieAnimation) {
                setImagesRevealed(true); // Skip Lottie on mobile for performance
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [project.lottieAnimation]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            className="h-full relative"
        >
            <article
                className={`group relative glass-panel rounded-3xl overflow-hidden h-full flex flex-col ${isLandscape ? "md:flex-row" : ""
                    } transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary/40`}
                style={{ transform: "translateZ(0)" }}
            >
                {/* Shine Effect (Desktop only) */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 hidden md:block"
                    style={{
                        background: "radial-gradient(800px circle at calc(var(--mouse-x, 50%) * 100%) calc(var(--mouse-y, 50%) * 100%), rgba(255,255,255,0.06), transparent 40%)"
                    }}
                />

                {/* Project Image Container */}
                <div
                    className={`${isLandscape ? "w-full md:w-[55%] md:h-auto" : "w-full aspect-video"
                        } bg-black/40 relative overflow-hidden group-hover:shadow-inner transition-shadow duration-500 shrink-0 border-b md:border-b-0 md:border-r border-border/30`}
                >
                    {/* Scroll-scrubbed Lottie layer (behind images) */}
                    {project.lottieAnimation && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-0"
                            style={{
                                opacity: imagesRevealed ? 0 : 1,
                                transition: "opacity 1.2s ease-in-out",
                            }}
                        >
                            <LottiePlayer
                                ref={lottieRef}
                                animationData={project.lottieAnimation}
                                className="w-2/3 max-w-[280px]"
                                autoplay={false}
                                loop={false}
                            />
                        </motion.div>
                    )}

                    {/* Project images — fade in once scroll-scrub animation completes */}
                    <div
                        className="relative w-full h-full z-10"
                        style={{
                            opacity: imagesRevealed ? 1 : 0,
                            transition: skipTransition ? "none" : "opacity 1.2s ease-in-out",
                        }}
                    >
                        {project.gallery ? (
                            <div className="w-full h-full flex divide-x divide-white/10">
                                {project.gallery.map((item, index) => (
                                    <div key={index} className="flex-1 h-full relative group/item overflow-hidden">
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white pointer-events-none z-20 border border-white/10 shadow-sm whitespace-nowrap">
                                            {item.label}
                                        </div>
                                        <div className="w-full h-full p-2 flex items-center justify-center">
                                            <img
                                                src={item.src}
                                                alt={`${project.title} - ${item.label}`}
                                                className="w-full h-full object-contain transition-transform duration-700 group-hover/item:scale-110"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons Overlay */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 flex-wrap p-4 backdrop-blur-[2px] z-20 pointer-events-none">
                        <div className="pointer-events-auto flex gap-2 flex-wrap justify-center">
                            {project.links.map((link) => (
                                <Button key={link.label} variant="hero" size="sm" asChild className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                        {link.icon === "external" ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                                        {link.label}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project Info */}
                <div className={`p-6 lg:p-10 space-y-6 flex-1 flex flex-col relative z-20 ${isLandscape ? "justify-center" : ""}`}>
                    <div className="flex flex-col gap-2">
                        {project.featured && (
                            <span className="text-xs font-mono tracking-widest text-primary uppercase inline-block font-semibold">
                                FEATURED_VIBE
                            </span>
                        )}
                        <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors tracking-tight">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground font-body leading-relaxed text-sm lg:text-base">
                        {project.description}
                    </p>

                    {/* Detailed Sub-modules (if available) */}
                    {project.details && (
                        <div className={`grid gap-4 mt-2 ${isLandscape ? "xl:grid-cols-2" : ""}`}>
                            {project.details.map((detail, idx) => (
                                <div key={idx} className="bg-background/40 border border-border/50 rounded-lg p-3 hover:bg-background/60 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                                            <detail.icon className="w-4 h-4" />
                                        </div>
                                        <h4 className="font-display font-semibold text-sm">{detail.title}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                                        {detail.role} <span className="text-foreground/80">{detail.features.join(", ")}</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                                            {detail.tech}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 bg-secondary/50 border border-border/50 text-secondary-foreground text-xs rounded-md font-mono transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </motion.div>
    );
};

export default ProjectCard;
