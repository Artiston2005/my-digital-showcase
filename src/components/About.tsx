const About = () => {
  return (
    <section id="about" className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-display font-semibold tracking-widest uppercase text-sm">
                About Me
              </p>
              <h2 className="font-display font-bold text-4xl lg:text-5xl tracking-tight">
                Passion for creating exceptional digital products
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed">
              <p>
                I'm a developer and designer with over 5 years of experience building 
                modern web applications. I specialize in creating intuitive user interfaces 
                and robust backend systems.
              </p>
              <p>
                My approach combines clean code with thoughtful design, ensuring every 
                project not only works flawlessly but also provides an exceptional user 
                experience. I believe in the power of simplicity and attention to detail.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="font-display font-bold text-4xl gradient-text">5+</p>
                <p className="text-muted-foreground text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="font-display font-bold text-4xl gradient-text">50+</p>
                <p className="text-muted-foreground text-sm mt-1">Projects Done</p>
              </div>
              <div>
                <p className="font-display font-bold text-4xl gradient-text">30+</p>
                <p className="text-muted-foreground text-sm mt-1">Happy Clients</p>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-card to-secondary border border-border overflow-hidden relative">
              {/* Abstract decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border border-primary/20" />
                <div className="absolute w-1/2 h-1/2 rounded-full border border-primary/30" />
                <div className="absolute w-1/4 h-1/4 rounded-full bg-primary/10" />
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 blur-xl" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg">
              <p className="font-display font-bold text-2xl text-foreground">Available</p>
              <p className="text-muted-foreground text-sm">for freelance work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
