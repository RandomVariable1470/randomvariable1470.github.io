import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Gamepad2, Mail, Send, Sparkles } from "lucide-react";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.contact(formData);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="h-[1px] w-12 bg-border/50"></div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Contact
          </h2>
          <div className="h-[1px] w-12 bg-border/50"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 hover:border-primary/30 transition-colors">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm font-mono"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm font-mono"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Message</label>
                <textarea
                  value={formData.message}
                  required
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm font-mono resize-none"
                  placeholder="Execute Order 66..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                {isSubmitting ? "Sending..." : "Send Transmission"}
              </button>
            </form>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 hover:border-primary/30 transition-colors h-full flex flex-col justify-center">
              <h4 className="font-bold mb-6 flex items-center gap-2 text-lg">
                <Sparkles className="w-4 h-4 text-primary" />
                Channels
              </h4>

              <div className="space-y-4">
                {[
                  { href: "mailto:hello@randomvariable.dev", icon: Mail, label: "Email", value: "hello@randomvariable.dev" },
                  { href: "https://github.com", icon: Github, label: "GitHub", value: "@randomvariable" },
                  { href: "https://itch.io", icon: Gamepad2, label: "itch.io", value: "randomvariable.itch.io" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <link.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{link.label}</p>
                      <p className="text-xs text-muted-foreground font-mono">{link.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
