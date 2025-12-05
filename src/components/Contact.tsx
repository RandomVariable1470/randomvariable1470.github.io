import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Gamepad2, Mail, Send, Sparkles } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 bg-primary/6 rounded-full blur-3xl pointer-events-none"
        style={{ y: orb1Y }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none"
        style={{ y: orb2Y }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        {/* Section title */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Contact
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Connect <span className="text-gradient">✨</span>
          </h3>
          <p className="text-muted-foreground">
            Got a project idea? Want to collaborate? Or just want to say hi?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-soft frosted-border rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 frosted-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 frosted-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 frosted-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="hoverable w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:glow-soft transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </div>
          </motion.form>

          {/* Social links and info */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {/* Quick contact */}
            <div className="glass-soft frosted-border rounded-2xl p-6 md:p-8">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Quick Links
              </h4>
              
              <div className="space-y-3">
                {[
                  { href: "mailto:hello@randomvariable.dev", icon: Mail, label: "Email", value: "hello@randomvariable.dev" },
                  { href: "https://github.com", icon: Github, label: "GitHub", value: "@randomvariable" },
                  { href: "https://itch.io", icon: Gamepad2, label: "itch.io", value: "randomvariable.itch.io" },
                ].map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="hoverable flex items-center gap-3 p-3 rounded-xl bg-card/40 hover:bg-card/60 transition-colors group frosted-border"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{link.label}</p>
                      <p className="text-xs text-muted-foreground font-mono">{link.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Fun message */}
            <motion.div
              className="glass-soft frosted-border rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground text-sm font-mono">
                "I don't always respond immediately,<br />
                but when I do, it's probably 3 AM."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
