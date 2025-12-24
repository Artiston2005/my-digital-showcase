import ScrollReveal from "@/components/ScrollReveal";
import profileImage from "@/assets/profile.jpg";

const About = () => {
  return (
    <section id="about" className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="space-y-4">
                <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm">
                  About Me
                </p>
                <h2 className="font-display font-bold text-4xl lg:text-5xl tracking-tight">
                  Passionate about creating innovative solutions
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed">
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
              </div>
            </ScrollReveal>
            
            {/* Stats */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div>
                  <p className="font-display font-bold text-4xl gradient-text">2nd</p>
                  <p className="text-muted-foreground text-sm mt-1">Year CSE</p>
                </div>
                <div>
                  <p className="font-display font-bold text-4xl gradient-text">3+</p>
                  <p className="text-muted-foreground text-sm mt-1">Projects</p>
                </div>
                <div>
                  <p className="font-display font-bold text-4xl gradient-text">GIT</p>
                  <p className="text-muted-foreground text-sm mt-1">Jaipur</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Profile Image */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden relative border border-border">
                <img 
                  src={profileImage} 
                  alt="Profile photo"
                  className="w-[110%] h-[110%] object-cover object-top -mb-[10%]"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg">
                <p className="font-display font-bold text-2xl text-foreground">Available</p>
                <p className="text-muted-foreground text-sm">for freelance work</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
