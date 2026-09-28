import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Artiston2005", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ashwin-yadav-1704a1248", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/theenthusiast_24/", label: "Instagram" },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-border" ref={ref}>
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-bold text-xl gradient-text">Ashwin Yadav.</span>
            <p className="text-muted-foreground font-body text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 relative py-4">
            {/* Mobile-only Blueprint Grid */}
            <div className="absolute inset-0 pointer-events-none flex md:hidden items-center justify-center">
              {/* Horizontal line cutting through all icons */}
              <div className="absolute w-[120%] h-[1px] bg-border/50 top-1/2 -translate-y-1/2" />
              
              {/* Vertical lines cutting through each icon */}
              <div className="flex gap-4 w-[164px] h-[150%] absolute top-1/2 -translate-y-1/2 justify-between">
                <div className="w-[1px] h-full bg-border/50 ml-[22px]" />
                <div className="w-[1px] h-full bg-border/50" />
                <div className="w-[1px] h-full bg-border/50 mr-[22px]" />
              </div>
            </div>

            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="relative z-10 w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 bg-background transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Icon className="w-5 h-5 relative z-10 bg-background" />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm transition-colors group"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;