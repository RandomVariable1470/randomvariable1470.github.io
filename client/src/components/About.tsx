import { User } from "lucide-react";

const About = () => {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
          <User className="w-3 h-3" />
          About Me
        </h3>
        <span className="flex h-1.5 w-1.5 rounded-full bg-primary/50" />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        <p className="text-sm text-foreground/90 leading-relaxed font-light">
          I'm a <span className="font-semibold text-primary">random variable</span> trying to find my distribution in the world of code.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I get way too excited about game engines, spend hours debugging physics simulations, and probably have too many half-finished projects on GitHub.
          Currently on a quest to understand computers at every level—from transistors to Unity shaders.
        </p>

        <div className="pt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary/5 rounded-md p-2 border border-primary/10">
              <p className="text-[10px] uppercase text-muted-foreground font-bold">Focus</p>
              <p className="text-xs font-mono text-primary">Game Dev & CS</p>
            </div>
            <div className="bg-primary/5 rounded-md p-2 border border-primary/10">
              <p className="text-[10px] uppercase text-muted-foreground font-bold">Status</p>
              <p className="text-xs font-mono text-primary">Learning C++</p>
            </div>
          </div>
        </div>

        <p className="mt-auto pt-2 text-right font-mono text-[10px] text-muted-foreground/60">
          — Naman, a.k.a. Random Variable
        </p>
      </div>
    </div>
  );
};

export default About;
