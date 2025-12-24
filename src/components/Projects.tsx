import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
      { label: "Live Site", url: "#", icon: "external" },
    ],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-card/30" ref={ref}>
      <div className="max-container">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description mx-auto">
            A selection of projects that showcase my skills and passion for creating 
            impactful digital solutions.
          </p>
        </motion.div>
        
        {/* Featured Project */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <article className="group relative bg-card border border-border rounded-3xl overflow-hidden card-hover">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="aspect-video lg:aspect-auto lg:h-full bg-secondary relative overflow-hidden">
                <img 
                  src={projects[0].image} 
                  alt={projects[0].title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
              </div>
              
              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-xs font-body tracking-widest text-primary uppercase mb-4">Featured Project</span>
                <h3 className="font-display font-bold text-3xl lg:text-4xl mb-4 group-hover:text-primary transition-colors">
                  {projects[0].title}
                </h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                  {projects[0].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[0].tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {projects[0].links.map((link) => (
                    <Button key={link.label} variant="hero" size="default" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                        {link.icon === "external" ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </motion.div>
        
        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.slice(1).map((project, index) => (
            <motion.article 
              key={project.title}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Project Image */}
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 flex-wrap p-4">
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
                <h3 className="font-display font-bold text-xl lg:text-2xl group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
