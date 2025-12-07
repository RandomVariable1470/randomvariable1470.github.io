import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";

import { api } from "@/services/api";
import { useState, useEffect } from "react";

// ... (keep imports)

// Remove local projects array

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  // ... (keep ProjectCard implementation mostly same, just update type if needed)
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hoverable relative group h-full"
    >
      <div className="glass-soft frosted-border rounded-2xl p-6 md:p-8 h-full relative overflow-hidden transition-all duration-300 group-hover:border-primary/30 flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsla(185, 40%, 60%, 0.08) 45%, transparent 50%)",
            transform: "translateZ(0)",
          }}
        />

        <div className="relative flex flex-col flex-grow" style={{ transform: "translateZ(50px)" }}>
          <div className="flex justify-between items-start mb-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              viewport={{ once: true }}
              className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary frosted-border"
            >
              {project.status}
            </motion.span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors frosted-border">
                <Github className="w-4 h-4" />
              </button>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors frosted-border inline-block">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag: string, tagIndex: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.4 + tagIndex * 0.1 }}
                viewport={{ once: true }}
                className="text-xs font-mono px-2 py-1 rounded bg-card/50 text-muted-foreground frosted-border"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    api.getProjects().then(setProjects).catch(console.error);
  }, []);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="flex items-center gap-3 mb-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Projects
          </h2>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-border/50" />
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Recent Work <span className="inline-block animate-wiggle">✨</span>
          </h3>
          <p className="text-muted-foreground font-mono text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Physics simulations, engine experiments, and breaking things in C++.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {projects.filter(p => p.status === 'Completed' || p.status === 'Featured').map((project, index) => (
            <ProjectCard key={project._id || project.title} project={project} index={index} />
          ))}
        </div>

        {/* WIP Section */}
        {projects.some(p => p.status === 'In Progress' || p.status === 'Concept') && (
          <motion.div
            className="mt-24 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8 justify-center opacity-50">
              <div className="h-px bg-yellow-500/50 w-24"></div>
              <span className="text-yellow-500 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                In The Lab <span className="animate-pulse">🚧</span>
              </span>
              <div className="h-px bg-yellow-500/50 w-24"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80" style={{ perspective: "1000px" }}>
              {projects.filter(p => p.status === 'In Progress' || p.status === 'Concept').map((project, index) => (
                <ProjectCard key={project._id || project.title} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/randomvariable1470"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full frosted-border bg-card/30 hover:bg-card/50 text-muted-foreground hover:text-primary transition-all duration-300 group"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">View more on GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
