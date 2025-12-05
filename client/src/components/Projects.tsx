import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const projects = [
  {
    title: "Game Engine",
    description: "A custom 2D/3D game engine built from scratch. Because why use Unity when you can suffer?",
    tags: ["C++", "OpenGL", "Physics"],
    status: "In Progress",
  },
  {
    title: "Physics Simulation",
    description: "Real-time fluid dynamics and particle systems. Very satisfying to watch, painful to debug.",
    tags: ["Rust", "WGPU", "Math"],
    status: "Concept",
  },
  {
    title: "Multiplayer Game",
    description: "Fast-paced multiplayer racing game. Currently just cubes racing, but it's a start.",
    tags: ["Unity", "C#", "Networking"],
    status: "In Progress",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
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
      className="hoverable relative group"
    >
      <div className="glass-soft frosted-border rounded-2xl p-6 md:p-8 h-full relative overflow-hidden transition-all duration-300 group-hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsla(185, 40%, 60%, 0.08) 45%, transparent 50%)",
            transform: "translateZ(0)",
          }}
        />

        <div className="relative" style={{ transform: "translateZ(50px)" }}>
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
              <button className="p-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors frosted-border">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [-50, 100]);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div
        className="absolute -top-20 left-1/4 w-72 h-72 bg-primary/6 rounded-full blur-3xl pointer-events-none"
        style={{ y: orb1Y }}
      />
      <motion.div
        className="absolute -bottom-20 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none"
        style={{ y: orb2Y }}
      />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Projects
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50" />
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Work In Progress <span className="inline-block animate-wiggle">👀</span>
          </h3>
          <p className="text-muted-foreground font-mono text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Cool stuff coming soon. Probably involving physics, engines, or breaking things in C++.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full frosted-border bg-card/30 text-muted-foreground text-sm">
            <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" />
            More projects loading...
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
