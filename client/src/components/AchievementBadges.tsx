import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, Eye, Scroll, Target, Zap } from "lucide-react";

interface Achievement {
  id: string;
  icon: typeof Trophy;
  title: string;
  description: string;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: "explorer",
    icon: Eye,
    title: "Explorer",
    description: "Started scrolling through the site",
    unlocked: false,
  },
  {
    id: "curious",
    icon: Scroll,
    title: "Curious Mind",
    description: "Scrolled past the About section",
    unlocked: false,
  },
  {
    id: "skill_seeker",
    icon: Target,
    title: "Skill Seeker",
    description: "Discovered the Skills section",
    unlocked: false,
  },
  {
    id: "project_hunter",
    icon: Zap,
    title: "Project Hunter",
    description: "Explored the Projects section",
    unlocked: false,
  },
  {
    id: "completionist",
    icon: Trophy,
    title: "Completionist",
    description: "Scrolled through the entire page",
    unlocked: false,
  },
];

const AchievementBadges = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      const newUnlocked: string[] = [];
      
      if (scrollPercent > 5) newUnlocked.push("explorer");
      if (scrollPercent > 20) newUnlocked.push("curious");
      if (scrollPercent > 40) newUnlocked.push("skill_seeker");
      if (scrollPercent > 60) newUnlocked.push("project_hunter");
      if (scrollPercent > 90) newUnlocked.push("completionist");

      newUnlocked.forEach((id) => {
        if (!unlockedAchievements.includes(id)) {
          const achievement = achievements.find((a) => a.id === id);
          if (achievement) {
            setShowNotification(achievement);
            setTimeout(() => setShowNotification(null), 3000);
          }
        }
      });

      setUnlockedAchievements(newUnlocked);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [unlockedAchievements]);

  return (
    <>
      {/* Achievement notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-4 left-1/2 z-50 glass frosted-border rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <showNotification.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-primary font-mono">Achievement Unlocked!</p>
              <p className="text-sm font-medium">{showNotification.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement badges display */}
      <div className="glass-soft frosted-border rounded-2xl p-6">
        <h4 className="font-medium text-center mb-4 flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Achievements
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          {achievements.map((achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.1 }}
                className={`relative group p-3 rounded-xl transition-all ${
                  isUnlocked
                    ? "bg-primary/20 frosted-border"
                    : "bg-card/30 opacity-40"
                }`}
              >
                <achievement.icon
                  className={`w-6 h-6 ${isUnlocked ? "text-primary" : "text-muted-foreground"}`}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="glass frosted-border rounded-lg px-3 py-2 text-center whitespace-nowrap">
                    <p className="text-xs font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
          {unlockedAchievements.length}/{achievements.length} unlocked
        </p>
      </div>
    </>
  );
};

export default AchievementBadges;
