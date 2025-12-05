import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import RandomFactGenerator from "./RandomFactGenerator";
import DistributionChart from "./DistributionChart";
import AchievementBadges from "./AchievementBadges";

const EasterEggsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fun" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section title */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Fun Zone
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
            Interactive <span className="text-gradient">Goodies</span> 🎮
          </h3>
          <p className="text-muted-foreground font-mono text-sm">
            Because portfolios should be fun too
          </p>
        </motion.div>

        {/* Easter eggs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <RandomFactGenerator />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <DistributionChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <AchievementBadges />
          </motion.div>
        </div>

        {/* Secret hint */}
        <motion.p
          className="text-center text-xs text-muted-foreground/50 mt-12 font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Psst... try the Konami Code ↑↑↓↓←→←→BA
        </motion.p>
      </div>
    </section>
  );
};

export default EasterEggsSection;
