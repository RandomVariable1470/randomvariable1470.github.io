import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

const facts = [
  "The first computer bug was an actual bug — a moth stuck in a relay.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "A group of programmers is called a 'merge conflict'.",
  "π is irrational, but so is spending 6 hours debugging a missing semicolon.",
  "The Σ of all my potential is still computing...",
  "I'd tell you a UDP joke, but you might not get it.",
  "Why do Java developers wear glasses? Because they can't C#.",
  "There's no place like 127.0.0.1",
  "In theory, theory and practice are the same. In practice, they're not.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "The λ calculus is just functions all the way down.",
  "My code works, I have no idea why. My code doesn't work, I have no idea why.",
  "Recursion: see 'Recursion'.",
  "I would love to change the world, but they won't give me the source code.",
];

const RandomFactGenerator = () => {
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const generateFact = () => {
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * facts.length);
    setTimeout(() => {
      setCurrentFact(facts[randomIndex]);
      setIsSpinning(false);
    }, 500);
  };

  return (
    <div className="glass-soft frosted-border rounded-2xl p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h4 className="font-medium">Random Fact Generator</h4>
      </div>

      <AnimatePresence mode="wait">
        {currentFact && (
          <motion.p
            key={currentFact}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground mb-4 min-h-[3rem] font-mono"
          >
            "{currentFact}"
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        onClick={generateFact}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="hoverable px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium flex items-center gap-2 mx-auto transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
        {currentFact ? "Another One" : "Generate Fact"}
      </motion.button>
    </div>
  );
};

export default RandomFactGenerator;
