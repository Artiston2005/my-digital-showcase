import { motion } from "framer-motion";
import { Code2, Smartphone, Wrench, Brain } from "lucide-react";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-container">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-description mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div 
                key={skill.category}
                variants={itemVariants}
                className="group p-6 lg:p-8 bg-card border border-border rounded-2xl card-hover h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="font-display font-bold text-xl mb-5 group-hover:text-primary transition-colors">
                  {skill.category}
                </h3>
                
                <ul className="space-y-3">
                  {skill.items.map((item) => (
                    <li 
                      key={item}
                      className="text-muted-foreground font-body flex items-center gap-3 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;