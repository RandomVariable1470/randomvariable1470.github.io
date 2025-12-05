import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
  speed?: number; // negative = moves slower, positive = moves faster
  direction?: "up" | "down";
}

export const ParallaxLayer = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxBackgroundProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * multiplier]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ParallaxSection = ({ children, className = "", id }: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Content with opacity fade */}
      <motion.div style={{ opacity }} className="relative z-10">
        {children}
      </motion.div>
    </section>
  );
};

// Floating orb component for parallax decoration
export const ParallaxOrb = ({
  size = "md",
  color = "primary",
  position,
  speed = 0.3,
}: {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "white";
  position: { top?: string; bottom?: string; left?: string; right?: string };
  speed?: number;
}) => {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  };

  const colors = {
    primary: "bg-primary/10",
    accent: "bg-accent/10",
    white: "bg-white/5",
  };

  return (
    <ParallaxLayer speed={speed} className="absolute pointer-events-none">
      <div
        className={`${sizes[size]} ${colors[color]} rounded-full blur-3xl`}
        style={position}
      />
    </ParallaxLayer>
  );
};
