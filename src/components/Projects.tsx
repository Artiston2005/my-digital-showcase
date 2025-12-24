import { Github, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import gitkaWifiImage from "@/assets/gitkawifi.jpeg";

const projects = [
  {
    title: "Git Ka Wifi",
    description: "A system tray utility built with Python that automatically logs you into the GIT Jaipur captive Wi-Fi portal with dynamic block loader. Also available as an Android app developed in Android Studio.",
    tags: ["Python", "Android Studio", "System Tray", "Automation"],
    image: gitkaWifiImage,
    windowsLink: "https://github.com/Artiston2005/git-ka-wifi",
    androidLink: "https://github.com/Artiston2005/git-ka-wifi-android/releases",
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
        
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {projects.map((project) => (
              <article 
                key={project.title}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift"
              >
                {/* Project Image */}
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button variant="hero" size="sm" asChild>
                      <a href={project.windowsLink} target="_blank" rel="noopener noreferrer">
                        <Monitor className="w-4 h-4 mr-2" />
                        Windows
                      </a>
                    </Button>
                    <Button variant="heroOutline" size="sm" asChild>
                      <a href={project.androidLink} target="_blank" rel="noopener noreferrer">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Android
                      </a>
                    </Button>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-8 space-y-4">
                  <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4">
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
                    <a 
                      href={project.windowsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                    >
                      <Github className="w-4 h-4" />
                      Windows Version
                    </a>
                    <a 
                      href={project.androidLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                    >
                      <Github className="w-4 h-4" />
                      Android App
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
