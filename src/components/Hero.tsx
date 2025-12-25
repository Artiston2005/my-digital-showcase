import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Hero = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "100%"]);

  // Staggered text animation for name
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 lg:px-12">
      {/* Morphing Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-20 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] hardware-accelerated"
          animate={{ 
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "50%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] hardware-accelerated"
          animate={{ 
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
            borderRadius: ["50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "50%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div className="space-y-10" style={{ y: textY }}>
          {/* Greeting */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <span className="w-12 h-[2px] bg-primary" />
            <p className="text-muted-foreground font-body text-lg tracking-wide">
              Hello, I'm
            </p>
          </motion.div>
          
          {/* Name with Staggered Character Reveal */}
          <motion.h1 
            className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-[9rem] tracking-tight leading-[0.9]"
            variants={nameVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="block gradient-text-hero">
              {Array.from("Ashwin").map((char, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block origin-bottom">
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block text-foreground">
              {Array.from("Yadav").map((char, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block origin-bottom">
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            className="text-muted-foreground font-body text-xl lg:text-2xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            Second year <span className="text-foreground">Computer Science & Engineering</span> student 
            at GIT Jaipur. Building innovative software solutions that make a difference.
          </motion.p>
          
          {/* CTA Buttons & Socials */}
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild className="hover-lift">
                <a href="#projects">View My Work</a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild className="hover-lift">
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:ml-4 sm:pl-4 sm:border-l sm:border-border">
              {[
                { Icon: Github, href: "https://github.com/Artiston2005" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/ashwin-yadav-1704a1248" }
              ].map(({ Icon, href }, index) => (
                <motion.a 
                  key={href}
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
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
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs font-body tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
            animate={{ borderColor: ['hsl(var(--muted-foreground))', 'hsl(var(--primary))', 'hsl(var(--muted-foreground))'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-current"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;