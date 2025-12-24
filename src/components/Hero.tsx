import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 lg:px-12">
      {/* Animated background elements with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-20 -left-40 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] hardware-accelerated"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[80px] hardware-accelerated"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
          
          {/* Name */}
          <motion.h1 
            className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-[9rem] tracking-tight leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
          >
            <span className="gradient-text-hero">Ashwin</span>
            <br />
            <span className="text-foreground">Yadav</span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            className="text-muted-foreground font-body text-xl lg:text-2xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Second year <span className="text-foreground">Computer Science & Engineering</span> student 
            at GIT Jaipur. Building innovative software solutions that make a difference.
          </motion.p>
          
          {/* CTA Buttons & Socials */}
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
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
              <a 
                href="https://github.com/Artiston2005" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ashwin-yadav-1704a1248" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
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
