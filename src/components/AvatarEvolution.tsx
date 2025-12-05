import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const evolutionStages = [
  { emoji: "🥚", label: "Egg", threshold: 0 },
  { emoji: "🐣", label: "Hatching", threshold: 15 },
  { emoji: "🐥", label: "Chick", threshold: 30 },
  { emoji: "🐤", label: "Growing", threshold: 45 },
  { emoji: "🐔", label: "Chicken", threshold: 60 },
  { emoji: "🦅", label: "Eagle", threshold: 75 },
  { emoji: "🚀", label: "Rocket", threshold: 90 },
];

const AvatarEvolution = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollPercent(Math.min(100, Math.max(0, percent)));
      
      const newStage = evolutionStages.reduce((acc, stage, index) => {
        return percent >= stage.threshold ? index : acc;
      }, 0);
      
      setCurrentStage(newStage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stage = evolutionStages[currentStage];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 right-4 z-40 glass frosted-border rounded-xl p-3 hidden md:block"
    >
      <div className="flex items-center gap-3">
        <motion.div
          key={currentStage}
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-3xl"
        >
          {stage.emoji}
        </motion.div>
        <div>
          <p className="text-xs text-muted-foreground font-mono">{stage.label}</p>
          <div className="w-16 h-1.5 bg-card/50 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${scrollPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AvatarEvolution;
