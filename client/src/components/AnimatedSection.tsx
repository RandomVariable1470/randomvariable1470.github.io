import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "rotate";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

const animations: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -5, y: 30 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
};

const AnimatedSection = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
