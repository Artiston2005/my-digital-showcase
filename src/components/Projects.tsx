import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerAnimation";
import gitkaWifiImage from "@/assets/gitkawifi.jpeg";
import quizGameImage from "@/assets/quiz-game.png";
import portfolioImage from "@/assets/portfolio-screenshot.png";

const projects = [
  {
    title: "Git Ka Wifi",
    description: "A system tray utility built with Python that automatically logs you into the GIT Jaipur captive Wi-Fi portal with dynamic block loader. Also available as an Android app developed in Android Studio.",
    tags: ["Python", "Android Studio", "System Tray", "Automation"],
    image: gitkaWifiImage,
    links: [
      { label: "Windows", url: "https://github.com/Artiston2005/git-ka-wifi", icon: "github" },
      { label: "Android", url: "https://github.com/Artiston2005/git-ka-wifi-android/releases", icon: "github" },
    ],
  },
  {
    title: "Quiz Game",
    description: "A trivia quiz game built with Python featuring both CLI and GUI versions. Fetches questions from Open Trivia DB API with multiple difficulty levels, timer, score tracking, and category selection.",
    tags: ["Python", "Tkinter", "API", "GUI"],
    image: quizGameImage,
    links: [
      { label: "GitHub", url: "https://github.com/Artiston2005/Quiz-Game-Project", icon: "github" },
    ],
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth scroll animations, dark theme with coral accents, and a clean editorial design.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: portfolioImage,
    links: [
      { label: "Live Site", url: "#", icon: "external" },
    ],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 lg:px-12 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm">
              Portfolio
            </p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl tracking-tight">
              Featured Projects
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
              A selection of projects that showcase my skills and passion for creating 
              impactful digital solutions.
            </p>
          </div>
        </ScrollReveal>
        
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <article 
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift h-full flex flex-col"
              >
                {/* Project Image */}
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 flex-wrap p-4">
                    {project.links.map((link) => (
                      <Button key={link.label} variant="hero" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.icon === "external" ? <ExternalLink className="w-4 h-4 mr-2" /> : <Github className="w-4 h-4 mr-2" />}
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full font-body"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links below card */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    {project.links.map((link) => (
                      <a 
                        key={link.label}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                      >
                        {link.icon === "external" ? <ExternalLink className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Projects;
