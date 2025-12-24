import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 lg:px-12">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          {/* Greeting */}
          <p className="text-muted-foreground font-body text-lg reveal-up">
            Hello, I'm
          </p>
          
          {/* Name */}
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight reveal-up reveal-up-delay-1">
            <span className="gradient-text">Creative</span>
            <br />
            Developer
          </h1>
          
          {/* Tagline */}
          <p className="text-muted-foreground font-body text-xl lg:text-2xl max-w-xl leading-relaxed reveal-up reveal-up-delay-2">
            I craft digital experiences that blend aesthetics with functionality. 
            Turning ideas into elegant, performant web applications.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 reveal-up reveal-up-delay-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 reveal-up reveal-up-delay-4">
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-body tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
