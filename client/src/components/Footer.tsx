import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Random Variable
          </p>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> and too much caffeine
          </p>

          <p className="text-xs text-muted-foreground/50 font-mono">
            P(success) = 1 - P(failure)
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;