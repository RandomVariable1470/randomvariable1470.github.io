import { motion } from "framer-motion";
import { Terminal, Cpu, Code2, Globe, Database, Gamepad2 } from "lucide-react";

const skillCategories = [
  {
    name: "Languages",
    icon: Code2,
    skills: ["TypeScript", "Javascript", "Python", "Rust", "C++", "C#", "SQL"]
  },
  {
    name: "Frontend",
    icon: Globe,
    skills: ["React", "Next.js", "TailwindRef", "Three.js", "Framer Motion"]
  },
  {
    name: "Backend",
    icon: Database,
    skills: ["Node.js", "Express", "PostgreSQL", "Supabase", "MongoDB"]
  },
  {
    name: "Tools",
    icon: Terminal,
    skills: ["Git", "Docker", "Linux", "Unity", "Unreal"]
  }
];

const Skills = () => {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
          <Cpu className="w-3 h-3" />
          Tech Stack
        </h3>
        <span className="flex h-1.5 w-1.5 rounded-full bg-primary/50" />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {skillCategories.map((category, i) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <category.icon className="w-3 h-3 text-muted-foreground/70" />
              <span>{category.name}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-medium text-foreground/80 hover:bg-primary/20 hover:border-primary/20 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
