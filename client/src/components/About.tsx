import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Brain, Code2 } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none"
        style={{ y: orbY }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
              About Me
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-soft frosted-border rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative gradient - soft teal */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-8"
              >
                I'm a{" "}
                <span className="text-gradient font-medium">random variable</span>{" "}
                trying to find my distribution in the world of code.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Think of me as that friend who gets way too excited about game engines, 
                spends hours debugging physics simulations, and probably has too many 
                half-finished projects on GitHub. Currently on a quest to understand 
                computers at every level—from transistors to Unity shaders.
              </motion.p>

              {/* Fun facts / interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid md:grid-cols-3 gap-4 mt-12"
              >
                {[
                  { icon: Code2, title: "Currently", desc: "Breaking things in C++ and calling it \"learning\"" },
                  { icon: Brain, title: "Long-term", desc: "Curious about AI/ML engineering" },
                  { icon: Sparkles, title: "Philosophy", desc: "Ship it, break it, fix it, repeat" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/40 frosted-border"
                  >
                    <item.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-sm text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Real name signature */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="mt-12 text-right font-mono text-sm text-muted-foreground/60"
              >
                — Naman, a.k.a. Random Variable
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
