import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerAnimation";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-transparent">
      <div className="max-container">
        <ScrollReveal className="text-center mb-16 space-y-4">
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-description mx-auto">
            A selection of projects that showcase my skills and passion for creating
            impactful digital solutions.
          </p>
        </ScrollReveal>

        {/* Unified Projects Grid with Stagger Effect */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8 perspective-1000">
          {projects.map((project, index) => (
            <StaggerItem
              key={project.title}
              className={`h-full ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <ProjectCard project={project} isLandscape={index === 0} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Projects;
