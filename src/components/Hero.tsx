/* src/components/Hero.tsx */
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import TerminalWindow from "@/components/ui/TerminalWindow";

const Hero = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse movement effect for background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        mouseX.set((clientX - centerX) / 20);
        mouseY.set((clientY - centerY) / 20);
      }
    };

    window.addEventListener("resize", checkMobile);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 2]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);

  return (
    <section ref={ref} className="h-[150vh] md:h-[200vh] relative">
      <div className="sticky top-0 h-[100dvh] w-full relative overflow-hidden selection:bg-primary/20">
        <motion.div 
          className="w-full h-full flex flex-col px-6 lg:px-12 relative"
          style={{ 
            scale: contentScale,
            opacity: contentOpacity,
            transformOrigin: "center center",
            willChange: "transform, opacity"
          }}
        >
      {/* --- BACKGROUND LAYERS --- */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          className="absolute top-20 -left-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] hardware-accelerated mix-blend-screen"
          style={{ x: springX, y: springY }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px] hardware-accelerated mix-blend-screen"
          style={{ x: useTransform(springX, (val) => val * -1), y: useTransform(springY, (val) => val * -1) }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto my-auto w-full relative z-10 pt-24 pb-16 md:pt-40 md:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div className="space-y-4 md:space-y-8">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground font-mono text-xs md:text-sm tracking-wider uppercase font-medium">
              System.Status = <span className="text-emerald-500 font-bold">"Online"</span>
            </p>
          </motion.div>

          <div className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9]">
            <ScrambleText
              text="Ashwin"
              className="block gradient-text-hero cursor-default"
              delay={0}
            />
            <ScrambleText
              text="Yadav"
              className="block text-foreground cursor-default"
              delay={400}
            />
          </div>

          <motion.div
            className="text-muted-foreground font-body text-base sm:text-xl max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <p className="mb-1 md:mb-2">CSE Student & <span className="text-primary glow-text font-semibold">Systems Engineer</span>.</p>
            <p className="mb-2">Building high-performance ecosystems. From orchestrating local Agentic AI pipelines to engineering multi-platform network architectures, I bridge the gap between complex backend logic and seamless user experiences.</p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 pt-4 md:pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-3 md:gap-4">
              <MagneticWrapper>
                <Button variant="hero" size="xl" asChild className="hover-lift group relative overflow-hidden bg-primary text-primary-foreground">
                  <a href="#projects">
                    <span className="relative z-10">Deploy.Init()</span>
                  </a>
                </Button>
              </MagneticWrapper>
              <MagneticWrapper>
                <Button variant="heroOutline" size="xl" asChild className="hover-lift font-mono border-border text-foreground hover:bg-secondary">
                  <a href="#contact">Contact_Me</a>
                </Button>
              </MagneticWrapper>
            </div>

            <div className="flex items-center gap-3 sm:ml-4 sm:pl-4 sm:border-l sm:border-border/50">
              {[
                { Icon: Github, href: "https://github.com/Artiston2005" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/ashwin-yadav-1704a1248" }
              ].map(({ Icon, href }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-background/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Window on the right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="hidden lg:block w-full"
        >
          <TerminalWindow 
            commands={[
              "systemctl start aura-ai-daemon",
              "[AuraAI] Initializing LangGraph state machine...",
              "[AuraAI] Mounting local Ollama node...",
              "[HeyGIT] Starting cross-platform proxy servers...",
              "[System] Ecosystem online. Monitoring secure traffic."
            ]}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-3 text-muted-foreground/50 hover:text-primary transition-colors group"
        >
          {isMobile ? (
            // Mobile: Swipe Up Animation
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70">Swipe Up</span>
              <div className="relative h-12 w-6 overflow-hidden">
                <motion.div
                  animate={{ y: [10, -20], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                </motion.div>
              </div>
            </div>
          ) : (
            // Desktop: Mouse Scroll Animation
            <>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">Scroll</span>
              <div className="w-[30px] h-[50px] rounded-full border-2 border-muted-foreground/30 flex justify-center p-2 group-hover:border-primary/50 transition-colors">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </>
          )}
        </a>
      </motion.div>
      </motion.div>
      </div>
    </section>
  );
};



export default Hero;
