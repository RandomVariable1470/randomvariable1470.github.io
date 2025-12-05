import { useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import InteractiveCursor from "@/components/InteractiveCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Update page title and meta
    document.title = "Random Variable | Game Developer & CS Enthusiast";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Interactive cursor - only on desktop */}
      <div className="hidden md:block">
        <InteractiveCursor />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>

      {/* Soft gradient overlays for depth - white/teal tints */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-accent/3 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-accent/3 to-transparent" />
      </div>
    </div>
  );
};

export default Index;
