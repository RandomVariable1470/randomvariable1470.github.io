import { useEffect, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import InteractiveCursor from "@/components/InteractiveCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import EasterEggsSection from "@/components/EasterEggsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MathSymbolEasterEggs from "@/components/MathSymbolEasterEggs";
import AvatarEvolution from "@/components/AvatarEvolution";
import KonamiCode from "@/components/KonamiCode";
import BackToTop from "@/components/BackToTop";
import { PageTransitionProvider } from "@/components/PageTransition";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.title = "Random Variable | Game Developer & CS Enthusiast";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleKonamiActivate = () => {
    setDevMode(true);
    document.documentElement.classList.add("dev-mode");
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <PageTransitionProvider>
      <div className={`relative min-h-screen bg-premium text-foreground overflow-x-hidden ${devMode ? "dev-mode-active" : ""}`}>
        {/* Particle background */}
        <ParticleBackground />
        
        {/* Interactive cursor - only on desktop */}
        <div className="hidden md:block">
          <InteractiveCursor />
        </div>

        {/* Math symbol easter eggs */}
        <MathSymbolEasterEggs />

        {/* Avatar evolution widget */}
        <AvatarEvolution />

        {/* Back to top button */}
        <BackToTop />

        {/* Konami code handler */}
        <KonamiCode onActivate={handleKonamiActivate} />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <EasterEggsSection />
          <Contact />
          <Footer />
        </main>

        {/* Soft gradient overlays for depth */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Vignette overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 vignette" />
      </div>
    </PageTransitionProvider>
  );
};

export default Index;
