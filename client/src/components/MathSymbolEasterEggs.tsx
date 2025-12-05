import { motion } from "framer-motion";
import { useState } from "react";

interface MathSymbol {
  symbol: string;
  tooltip: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

const mathSymbols: MathSymbol[] = [
  { symbol: "Σ", tooltip: "Sum of my potential", position: { top: "15%", left: "10%" } },
  { symbol: "λ", tooltip: "Just a little functional", position: { top: "25%", right: "15%" } },
  { symbol: "∫", tooltip: "Integrating new skills daily", position: { bottom: "30%", left: "20%" } },
  { symbol: "π", tooltip: "3.14159... cups of coffee today", position: { bottom: "25%", right: "10%" } },
  { symbol: "∞", tooltip: "Bugs in my code", position: { top: "40%", left: "5%" } },
  { symbol: "≈", tooltip: "Approximately working", position: { top: "60%", right: "8%" } },
  { symbol: "∂", tooltip: "Partially understanding calculus", position: { bottom: "40%", left: "8%" } },
  { symbol: "∇", tooltip: "Gradient descending into madness", position: { top: "35%", right: "20%" } },
];

const MathSymbolEasterEggs = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <>
      {mathSymbols.map((item, index) => (
        <motion.div
          key={item.symbol}
          className="fixed z-20 cursor-pointer hidden lg:block"
          style={item.position}
          animate={{
            y: [0, -15, 0],
            rotate: [0, index % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          onMouseEnter={() => setActiveTooltip(item.symbol)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <span className="text-3xl md:text-4xl font-mono text-foreground/10 hover:text-primary/50 transition-colors duration-300">
            {item.symbol}
          </span>
          
          {activeTooltip === item.symbol && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass frosted-border rounded-lg px-3 py-2 whitespace-nowrap z-50"
            >
              <p className="text-xs font-mono text-muted-foreground">{item.tooltip}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default MathSymbolEasterEggs;
