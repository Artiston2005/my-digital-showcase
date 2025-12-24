import { Github, Linkedin, Twitter } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const socialLinks = [
  { icon: Github, href: "https://github.com/Artiston2005", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-border">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-muted-foreground font-body text-sm">
            © {new Date().getFullYear()} Ashwin Yadav. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <a
            href="#"
            className="text-muted-foreground hover:text-primary font-body text-sm transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
