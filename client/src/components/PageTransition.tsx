import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState, ReactNode } from "react";

interface TransitionContextType {
  triggerTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
};

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      callback();
    }, 200);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] pointer-events-none bg-background/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
