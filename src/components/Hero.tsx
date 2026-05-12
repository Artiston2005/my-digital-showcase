/* src/components/Hero.tsx */
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { LottiePlayer } from "@/components/ui/LottiePlayer";
// import sampleAnimation from "@/assets/lottie/sample.json"; // <--- Add your downloaded .json file here

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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "100%"]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 lg:px-12 selection:bg-primary/20">

      {/* --- BACKGROUND LAYERS --- */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
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
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-24 md:pt-0">
        <motion.div className="space-y-8" style={{ y: textY }}>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground font-body text-sm tracking-wider uppercase font-medium">
              Status: <span className="text-foreground font-bold">Available for work</span>
            </p>
          </motion.div>

          <div className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9]">
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

          {/* -- LOTTIE ANIMATION EXAMPLE -- */}
          {/* Uncomment the code below and the import above once you have a Lottie JSON file */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-0 right-10 w-64 h-64 pointer-events-none opacity-50 hidden lg:block"
          >
            <LottiePlayer animationData={sampleAnimation} loop={true} autoplay={true} />
            {/* Or fetch directly from a URL: <LottiePlayer url="https://assetsX.lottiefiles.com/.../anim.json" /> *\/}
          </motion.div> */}

          <motion.div
            className="text-muted-foreground font-body text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <p className="mb-2">Crafting digital aesthetics & writing code at <span className="text-foreground font-medium border-b border-primary/30 pb-0.5">2 AM</span>.</p>
            <p className="mb-2">A creative developer obsessed with <span className="text-primary glow-text">beautiful interfaces</span> and smooth interactions.</p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-4">
              <MagneticWrapper>
                <Button variant="hero" size="xl" asChild className="hover-lift group relative overflow-hidden">
                  <a href="#projects">
                    <span className="relative z-10">View My Work</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </a>
                </Button>
              </MagneticWrapper>
              <MagneticWrapper>
                <Button variant="heroOutline" size="xl" asChild className="hover-lift">
                  <a href="#contact">Get in Touch</a>
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
    </section>
  );
};



export default Hero;
