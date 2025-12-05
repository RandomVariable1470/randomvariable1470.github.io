import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingMessages = [
  { text: "computing variance…", delay: 0 },
  { text: "adjusting bias…", delay: 800 },
  { text: "plotting future…", delay: 1600 },
  { text: "done ✔", delay: 2400 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    loadingMessages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentLine(index + 1);
      }, loadingMessages[index].delay);
      timers.push(timer);
    });

    // Complete after all messages shown
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 600);
    }, 3200);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-sm md:text-base space-y-2 px-6">
            {loadingMessages.slice(0, currentLine).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-primary">$</span>
                <span className={index === currentLine - 1 && msg.text === "done ✔" 
                  ? "text-primary" 
                  : "text-muted-foreground"
                }>
                  {msg.text}
                </span>
                {index === currentLine - 1 && msg.text !== "done ✔" && (
                  <motion.span
                    className="w-2 h-4 bg-primary"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
