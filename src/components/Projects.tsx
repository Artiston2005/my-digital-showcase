import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerAnimation";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern shopping experience with real-time inventory, seamless checkout, and personalized recommendations.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization platform helping teams make informed decisions with real-time metrics and insights.",
    tags: ["TypeScript", "D3.js", "Python"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Social Mobile App",
    description: "Community-driven platform connecting creators with their audience through engaging content.",
    tags: ["React Native", "Firebase", "Redux"],
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "AI Writing Assistant",
    description: "Intelligent content creation tool powered by machine learning to enhance productivity.",
    tags: ["Python", "OpenAI", "FastAPI"],
    color: "from-violet-500/20 to-violet-500/5",
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
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift h-full"
              >
                {/* Project Image Placeholder */}
                <div className={`aspect-video bg-gradient-to-br ${project.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-24 h-24 border-2 border-current rounded-full" />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button variant="hero" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button variant="heroOutline" size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      Code
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
