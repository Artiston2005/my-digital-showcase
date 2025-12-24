const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "GraphQL", "REST APIs"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Figma", "VS Code"] },
  { category: "Soft Skills", items: ["Problem Solving", "Communication", "Team Lead", "Agile", "Mentoring"] },
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
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
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.category}
              className="p-8 bg-card border border-border rounded-2xl hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
