import { motion } from "framer-motion";
import { Github, Gamepad2, ChevronDown } from "lucide-react";
import LocationPin from "./LocationPin";
import TypingAnimation from "./TypingAnimation";

const roles = [
  "Game Developer",
  "CS Enthusiast", 
  "Curious Learner",
  "Code Breaker",
  "Physics Simulator",
  "Bug Generator",
];

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-premium vignette">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Location Pin */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LocationPin />
        </motion.div>

        {/* Main Title with soft white halo */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight halo"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-gradient glow-text">Random</span>
          <br />
          <span className="text-foreground">Variable</span>
        </motion.h1>

        {/* Tagline with typing animation */}
        <motion.div
          className="text-lg md:text-xl mb-4 font-light tracking-wide h-8 flex items-center justify-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-muted-foreground">I'm a</span>
          <TypingAnimation 
            words={roles} 
            typingSpeed={80} 
            deletingSpeed={40} 
            pauseDuration={2500} 
          />
        </motion.div>

        {/* Real name reveal */}
        <motion.p
          className="text-sm text-muted-foreground/70 mb-12 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Hey, I'm <span className="text-primary">Naman</span> 👋 (but Random Variable sounds cooler)
        </motion.p>

        {/* Social Links - frosted glass style */}
        <motion.div
          className="flex gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hoverable group flex items-center gap-2 px-6 py-3 glass-soft frosted-border rounded-full hover:bg-secondary/60 transition-all duration-300"
          >
            <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href="https://itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hoverable group flex items-center gap-2 px-6 py-3 glass-soft frosted-border rounded-full hover:bg-secondary/60 transition-all duration-300"
          >
            <Gamepad2 className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">itch.io</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          className="hoverable absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;