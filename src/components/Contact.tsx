import { Mail, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import ScrollReveal from "@/components/ScrollReveal";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-card/30">
      <div className="max-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <ScrollReveal className="space-y-4">
              <p className="section-label">Contact</p>
              <h2 className="section-title">
                Let's work{" "}
                <span className="gradient-text">together</span>
              </h2>
              <p className="section-description">
                Have a project in mind? I'd love to hear about it. Send me a message
                and let's create something amazing together.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="space-y-4 pt-4">
              <a
                href="mailto:ashwinyadav2408@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="font-body font-medium text-foreground">ashwinyadav2408@gmail.com</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </ScrollReveal>

            {/* Decorative element */}
            <ScrollReveal delay={0.2} className="hidden lg:block pt-8">
              <div className="w-full h-px bg-gradient-to-r from-border via-primary/30 to-transparent" />
              <p className="text-muted-foreground text-sm mt-4 font-body">
                I typically respond within 24 hours.
              </p>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="up" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-card border border-border rounded-2xl p-6 lg:p-8"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-body font-medium text-foreground ml-1">
                  Name
                </label>
                <div className="relative group/input">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="input-field disabled:opacity-50 pl-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all duration-300 group-hover/input:border-primary/30"
                    placeholder="Your name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-body font-medium text-foreground ml-1">
                  Email
                </label>
                <div className="relative group/input">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="input-field disabled:opacity-50 pl-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all duration-300 group-hover/input:border-primary/30"
                    placeholder="your@email.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-body font-medium text-foreground ml-1">
                  Message
                </label>
                <div className="relative group/input">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="input-field resize-none disabled:opacity-50 pl-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all duration-300 group-hover/input:border-primary/30"
                    placeholder="Tell me about your project..."
                  />
                  <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500" />
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;