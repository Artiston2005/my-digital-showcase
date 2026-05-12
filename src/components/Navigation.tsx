import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSelector from "./ThemeSelector";
import { createPortal } from "react-dom";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const MagneticLink = ({ children, href, isActive }: { children: React.ReactNode, href: string, isActive: boolean }) => {
  return (
    <MagneticWrapper>
      <a
        href={href}
        className={`px-4 py-2 font-body text-sm transition-colors relative group block ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
      >
        {children}
        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
      </a>
    </MagneticWrapper>
  );
};


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          // Spy on active section
          const sections = navItems.map(item => item.href.substring(1));
          let current = "";
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                current = section;
                break;
              }
            }
          }
          setActiveSection(current);

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/70 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="md:hidden w-full bg-primary/10 border-b border-primary/20 text-primary text-[10px] sm:text-xs font-mono tracking-widest uppercase text-center py-1.5 backdrop-blur-md">
          * Best experienced on desktop *
        </div>
        <nav className={`max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${isScrolled ? "py-3" : "py-6"}`}>
          {/* Updated Logo */}
          <a href="#" className="font-display font-bold text-xl lg:text-2xl gradient-text relative z-50 tracking-tight">
            Ashwin Yadav
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <MagneticLink href={item.href} isActive={activeSection === item.href.substring(1)}>
                    {item.label}
                  </MagneticLink>
                </motion.li>
              ))}
            </ul>

            {/* Theme Selector */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ThemeSelector />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button variant="hero" size="sm" asChild className="hover-lift shadow-glow hover:shadow-glow-lg transition-all duration-300">
                <a href="#contact">Let's Talk</a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden relative z-50">
            <ThemeSelector />

            <button
              className="p-2 text-foreground relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-background/98 backdrop-blur-xl z-[90] flex flex-col justify-center items-center"
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Header Elements Inside Portal */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-[100]">
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-bold text-xl gradient-text"
                >
                  Ashwin Yadav
                </a>

                <div className="flex items-center gap-4">
                  <ThemeSelector />
                  <button
                    className="p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <ul className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-4xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <Button variant="hero" size="xl" asChild>
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Let's Talk
                    </a>
                  </Button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navigation;
