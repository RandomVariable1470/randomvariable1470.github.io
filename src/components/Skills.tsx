import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users } from "lucide-react";

const skills = [
  { name: "C", icon: "C" },
  { name: "C++", icon: "C++" },
  { name: "Rust", icon: "🦀" },
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "JS" },
  { name: "TypeScript", icon: "TS" },
  { name: "C#", icon: "C#" },
  { name: "Unity", icon: "🎮" },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [-30, 80]);

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none"
        style={{ y: orb1Y }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-72 h-72 bg-accent/6 rounded-full blur-3xl pointer-events-none"
        style={{ y: orb2Y }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        {/* Section title */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Skills
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </motion.div>

        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Skills I'm leveling up <span className="text-gradient">🎮</span>
        </motion.h3>

        <motion.p
          className="text-center text-muted-foreground mb-16 font-mono text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          Still learning, still leveling up. XP bar loading...
        </motion.p>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40, scale: 0.8, rotate: -5 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
              transition={{
                delay: 0.3 + index * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              className="hoverable group relative"
            >
              <div className="glass-soft frosted-border rounded-xl p-6 text-center relative overflow-hidden transition-all duration-300 group-hover:border-primary/30">
                {/* Soft gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <motion.span
                    className="text-3xl mb-3 block"
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.icon.length <= 3 ? (
                      <span className="font-mono font-bold text-2xl text-primary">
                        {skill.icon}
                      </span>
                    ) : (
                      skill.icon
                    )}
                  </motion.span>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft skill */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -3 }}
            className="hoverable glass-soft frosted-border rounded-full px-6 py-3 flex items-center gap-3"
          >
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Team Collaboration</span>
            <span className="text-xs text-muted-foreground font-mono">+1 soft skill unlocked</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
