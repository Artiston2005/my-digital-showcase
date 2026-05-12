import ScrollReveal from "@/components/ScrollReveal";
import profileImage from "@/assets/profile.jpg";

const About = () => {
  const stats = [
    { value: "2nd", label: "Year CSE" },
    { value: "3+", label: "Projects Built" },
    { value: "GIT", label: "Jaipur" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Profile Image - Slides in from Left */}
          <ScrollReveal direction="right" className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image container */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-border/50 shadow-elevated">
                <img 
                  src={profileImage} 
                  alt="Ashwin Yadav"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-2xl blur-2xl -z-10" />
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 glass border border-border/50 rounded-xl p-5 shadow-lg animate-in fade-in zoom-in duration-700 delay-500 fill-mode-backwards">
                <p className="font-display font-bold text-xl text-primary">Available</p>
                <p className="text-muted-foreground text-sm">for opportunities</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Content - Slides in from Right (or Up) */}
          <div className="space-y-8 order-1 lg:order-2">
            <ScrollReveal direction="left" delay={0.1} className="space-y-4">
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Passionate about creating{" "}
                <span className="gradient-text">innovative</span> solutions
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.2} className="space-y-5 text-muted-foreground font-body text-lg leading-relaxed">
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
            </ScrollReveal>
            
            {/* Stats */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-6">
                {stats.map((stat) => (
                  <div 
                    key={stat.label}
                    className="text-center lg:text-left p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card transition-colors duration-300"
                  >
                    <p className="font-display font-bold text-3xl lg:text-4xl gradient-text">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;