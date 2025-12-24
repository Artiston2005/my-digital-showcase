import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "2nd", label: "Year CSE" },
    { value: "3+", label: "Projects Built" },
    { value: "GIT", label: "Jaipur" },
  ];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Main image container */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-border/50 shadow-elevated">
                <img 
                  src={profileImage} 
                  alt="Ashwin Yadav"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-2xl blur-2xl -z-10" />
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 glass border border-border/50 rounded-xl p-5 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display font-bold text-xl text-primary">Available</p>
                <p className="text-muted-foreground text-sm">for opportunities</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Passionate about creating{" "}
                <span className="gradient-text">innovative</span> solutions
              </h2>
            </motion.div>
            
            <motion.div 
              className="space-y-5 text-muted-foreground font-body text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                I'm Ashwin Yadav, a second year Computer Science & Engineering student 
                at GIT Jaipur. I love building software that solves real-world problems 
                and makes life easier for users.
              </p>
              <p>
                From Python automation tools to Android apps, I enjoy exploring different 
                technologies and creating projects that have practical applications. 
                I believe in learning by doing and constantly challenging myself with new projects.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center lg:text-left p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <p className="font-display font-bold text-3xl lg:text-4xl gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;