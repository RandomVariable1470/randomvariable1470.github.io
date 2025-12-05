import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const LocationPin = () => {
  return (
    <motion.div
      className="flex items-center gap-2 text-muted-foreground text-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MapPin className="w-4 h-4 text-primary" />
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <span className="font-mono text-xs">New Delhi, India</span>
    </motion.div>
  );
};

export default LocationPin;
