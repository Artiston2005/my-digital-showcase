import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerAnimation";

const skills = [
  { category: "Languages", items: ["Python", "Kotlin", "JavaScript", "TypeScript", "C/C++", "Java"] },
  { category: "Web & Mobile", items: ["React", "HTML/CSS", "Tailwind CSS", "Android Development", "REST APIs"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Android Studio", "Tkinter"] },
  { category: "Core Skills", items: ["Problem Solving", "Data Structures", "Algorithms", "OOP", "Team Collaboration"] },
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm">
              Expertise
            </p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl tracking-tight">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>
        
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <StaggerItem key={skill.category}>
              <div 
                className="p-8 bg-card border border-border rounded-2xl hover-lift group h-full"
              >
                <h3 className="font-display font-bold text-xl mb-6 group-hover:text-primary transition-colors">
                  {skill.category}
                </h3>
                <ul className="space-y-3">
                  {skill.items.map((item) => (
                    <li 
                      key={item}
                      className="text-muted-foreground font-body flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Skills;
