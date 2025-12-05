import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  isTeal: boolean;
  isSymbol: boolean;
  symbol: string;
  wobbleSpeed: number;
  wobbleOffset: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinkleOffset: number;
  rotation: number;
  rotationSpeed: number;
}

const mathSymbols = ["Σ", "π", "λ", "{}", ";", "∫", "∞", "≈", "∂", "→", "⟨⟩", "//"];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        const baseOpacity = Math.random() * 0.35 + 0.1;
        const isSymbol = Math.random() > 0.85; // 15% are symbols
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: Math.random() * 0.3 + 0.1,
          size: isSymbol ? Math.random() * 10 + 8 : Math.random() * 2 + 0.5,
          baseOpacity: isSymbol ? baseOpacity * 0.6 : baseOpacity,
          opacity: baseOpacity,
          isTeal: Math.random() > 0.75,
          isSymbol,
          symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleOffset: Math.random() * Math.PI * 2,
          twinkle: Math.random() > 0.6,
          twinkleSpeed: Math.random() * 0.05 + 0.02,
          twinkleOffset: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        const wobble = Math.sin(timeRef.current * particle.wobbleSpeed + particle.wobbleOffset) * 0.3;
        
        particle.x += wobble + particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        if (particle.twinkle) {
          const twinkleValue = Math.sin(timeRef.current * particle.twinkleSpeed + particle.twinkleOffset);
          particle.opacity = particle.baseOpacity * (0.4 + 0.6 * (twinkleValue * 0.5 + 0.5));
        }

        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          particle.vx -= (dx / dist) * force * 0.008;
          particle.vy -= (dy / dist) * force * 0.004;
        }

        particle.vx *= 0.98;
        if (particle.vy < 0.1) particle.vy = 0.1;
        if (particle.vy > 0.5) particle.vy = 0.5;

        if (particle.y > canvas.height + 20) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;

        if (particle.isSymbol) {
          // Draw math/code symbols
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.font = `${particle.size}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          if (particle.isTeal) {
            ctx.fillStyle = `hsla(185, 40%, 70%, ${particle.opacity})`;
          } else {
            ctx.fillStyle = `hsla(0, 0%, 90%, ${particle.opacity})`;
          }
          ctx.fillText(particle.symbol, 0, 0);
          ctx.restore();
        } else {
          // Draw regular particles
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          
          if (particle.isTeal) {
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, `hsla(185, 40%, 70%, ${particle.opacity})`);
            gradient.addColorStop(1, `hsla(185, 40%, 70%, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          } else {
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, `hsla(0, 0%, 90%, ${particle.opacity})`);
            gradient.addColorStop(1, `hsla(0, 0%, 90%, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
