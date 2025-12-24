import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gitkaWifiImage from "@/assets/gitkawifi.jpeg";
import quizGameImage from "@/assets/quiz-game.png";
import portfolioImage from "@/assets/portfolio-screenshot.png";

const projects = [
  {
    title: "Git Ka Wifi",
    description: "A system tray utility built with Python that automatically logs you into the GIT Jaipur captive Wi-Fi portal. Also available as an Android app developed in Kotlin.",
    tags: ["Python", "Kotlin", "Android", "Automation"],
    image: gitkaWifiImage,
    featured: true,
    links: [
      { label: "Windows", url: "https://github.com/Artiston2005/git-ka-wifi", icon: "github" },
      { label: "Android", url: "https://github.com/Artiston2005/git-ka-wifi-android/releases", icon: "github" },
    ],
  },
  {
    title: "Quiz Game",
    description: "A trivia quiz game built with Python featuring both CLI and GUI versions. Fetches questions from Open Trivia DB API with multiple difficulty levels.",
    tags: ["Python", "Tkinter", "API", "GUI"],
    image: quizGameImage,
    featured: false,
    links: [
      { label: "GitHub", url: "https://github.com/Artiston2005/Quiz-Game-Project", icon: "github" },
    ],
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth scroll animations and dark theme.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    image: portfolioImage,
    featured: false,
    links: [
      { label: "Live Site", url: "https://my-digital-showcase-nine.vercel.app", icon: "external" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-card/30">
      <div className="max-container">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description mx-auto">
            A selection of projects that showcase my skills and passion for creating 
            impactful digital solutions.
          </p>
        </motion.div>
        
        {/* Unified Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => {
            // Check if this is the vertical Android project
            const isVerticalImage = project.tags.includes("Android");

            return (
              <motion.article 
                key={project.title}
                variants={itemVariants}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col"
              >
                {/* Project Image Container */}
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  {isVerticalImage ? (
                    /* Special Layout for Vertical Images (Blur Effect) */
                    <>
                      {/* Blurred Background to fill space */}
                      <div className="absolute inset-0">
                        <img 
                          src={project.image} 
                          alt=""
                          className="w-full h-full object-cover opacity-40 blur-xl scale-110"
                        />
                      </div>
                      {/* Main Image (Contained) */}
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        className="relative w-full h-full object-contain p-2 z-10 transition-transform duration-700 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    /* Standard Layout for Landscape Images */
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Hover overlay with buttons */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 flex-wrap p-4 backdrop-blur-[2px] z-20">
                    {project.links.map((link) => (
                      <Button key={link.label} variant="hero" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                          {link.icon === "external" ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6 lg:p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex flex-col gap-2">
                    {project.featured && (
                      <span className="text-xs font-body tracking-widest text-primary uppercase inline-block">
                        Featured
                      </span>
                    )}
                    <h3 className="font-display font-bold text-xl lg:text-2xl group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground font-body leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="skill-tag text-xs">{tag}</span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    {project.links.map((link) => (
                      <a 
                        key={link.label}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body group/link"
                      >
                        {link.icon === "external" ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
