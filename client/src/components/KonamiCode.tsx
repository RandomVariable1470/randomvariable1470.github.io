import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

interface KonamiCodeProps {
  onActivate: () => void;
}

const KonamiCode = ({ onActivate }: KonamiCodeProps) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showActivation, setShowActivation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-10);
      setInputSequence(newSequence);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setShowActivation(true);
        onActivate();
        setTimeout(() => setShowActivation(false), 3000);
        setInputSequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, onActivate]);

  return (
    <AnimatePresence>
      {showActivation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="glass frosted-border rounded-2xl p-8 text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Terminal className="w-16 h-16 text-primary mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Developer Mode</h3>
            <p className="text-muted-foreground font-mono text-sm">Activated! 🎮</p>
            <p className="text-xs text-muted-foreground mt-2">Matrix theme enabled</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiCode;
