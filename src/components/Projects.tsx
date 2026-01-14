import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gitkaWifiImage from "@/assets/gitkawifi.jpeg";
import quizGameImage from "@/assets/quiz-game.png";
import portfolioImage from "@/assets/portfolio-screenshot.png";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerAnimation";

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

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-card/30">
      <div className="max-container">
        <ScrollReveal className="text-center mb-16 space-y-4">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description mx-auto">
            A selection of projects that showcase my skills and passion for creating 
            impactful digital solutions.
          </p>
        </ScrollReveal>
        
        {/* Unified Projects Grid with Stagger Effect */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isVerticalImage = project.tags.includes("Android");

            return (
              <StaggerItem key={project.title} className="h-full">
                <article 
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col"
                >
                  {/* Project Image Container */}
                  <div className="aspect-video bg-secondary relative overflow-hidden">
                    {isVerticalImage ? (
                      <>
                        <div className="absolute inset-0">
                          <img 
                            src={project.image} 
                            alt=""
                            className="w-full h-full object-cover opacity-40 blur-xl scale-110"
                            decoding="async"
                          />
                        </div>
                        <img 
                          src={project.image} 
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="relative w-full h-full object-contain p-2 z-10 transition-transform duration-700 group-hover:scale-105"
                        />
                      </>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

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
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Projects;