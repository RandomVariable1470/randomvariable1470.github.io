import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Gamepad2, Car, Brain, Palette } from "lucide-react";

const goals = [
  {
    icon: Cpu,
    title: "OS Development",
    description: "Building a tiny OS from scratch. Because who needs sleep?",
    status: "Exploring",
  },
  {
    icon: Gamepad2,
    title: "Game Engine Creation",
    description: "Custom 2D/3D engine with physics. Reinventing the wheel, but cooler.",
    status: "In Progress",
  },
  {
    icon: Car,
    title: "Multiplayer Racing",
    description: "Fast-paced racing with real-time networking. Currently: cubes racing.",
    status: "Active",
  },
  {
    icon: Brain,
    title: "AI/ML Engineering",
    description: "Neural networks, deep learning, and probably overfitting everything.",
    status: "Learning",
  },
  {
    icon: Palette,
    title: "Graphics Programming",
    description: "Shaders, raytracing, and making pixels look pretty.",
    status: "Curious",
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section title */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Future
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Where I'm <span className="text-gradient">Headed</span> 🚀
          </h3>
          <p className="text-muted-foreground font-mono text-sm">
            Goals that keep me up at night (besides debugging)
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
              className={`relative flex items-start gap-6 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/30 frosted-border flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-soft frosted-border rounded-xl p-5 group cursor-default"
                >
                  <div className={`flex items-center gap-3 mb-3 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}>
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <goal.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-full bg-card/50 text-muted-foreground">
                      {goal.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-gradient transition-all">
                    {goal.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
