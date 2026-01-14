import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, Smartphone, Wrench, Brain } from "lucide-react";
import { MouseEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerAnimation";

const skills = [
  { 
    category: "Languages", 
    icon: Code2,
    items: ["Python", "Kotlin", "JavaScript", "TypeScript", "C/C++", "Java"] 
  },
  { 
    category: "Web & Mobile", 
    icon: Smartphone,
    items: ["React", "HTML/CSS", "Tailwind CSS", "Android Development", "REST APIs"] 
  },
  { 
    category: "Tools", 
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Android Studio", "Tkinter"] 
  },
  { 
    category: "Core Skills", 
    icon: Brain,
    items: ["Problem Solving", "Data Structures", "Algorithms", "OOP", "Team Collaboration"] 
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-container">
        <ScrollReveal className="text-center mb-16 space-y-4">
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-description mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </ScrollReveal>
        
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <StaggerItem key={skill.category}>
              <SpotlightCard>
                <div className="relative z-10 h-full p-6 lg:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-5 group-hover:text-primary transition-colors">
                    {skill.category}
                  </h3>
                  
                  <ul className="space-y-3">
                    {skill.items.map((item) => (
                      <li 
                        key={item}
                        className="text-muted-foreground font-body flex items-center gap-3 text-sm cursor-default transition-transform hover:translate-x-1 hover:text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Internal component for the Spotlight effect
function SpotlightCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border border-border bg-card/50 rounded-2xl overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--primary) / 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}