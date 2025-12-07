import { useEffect, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CyberGlobe from "@/components/CyberGlobe";
import GithubActivity from "@/components/GithubActivity";
import ToolsPanel from "@/components/ToolsPanel";
import FunStats from "@/components/FunStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PageTransitionProvider } from "@/components/PageTransition";
import LoadingScreen from "@/components/LoadingScreen";
import NotesSection from "@/components/NotesSection"; // Will create next

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.title = "Random Variable | Game Developer & CS Enthusiast";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <PageTransitionProvider>
      <div className="relative min-h-screen bg-premium text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <ParticleBackground />
        <BackToTop />
        <Navbar />

        <main className="relative z-10">
          <section id="home">
            <Hero />
          </section>

          {/* Dashboard Grid Section */}
          <section id="dashboard" className="container mx-auto px-4 py-8 md:py-16 space-y-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-border/50"></div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Command Center</span>
              <div className="h-[1px] flex-1 bg-border/50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
              {/* Row 1 */}
              <div className="md:col-span-2 h-full">
                <About />
              </div>
              <div className="md:col-span-1 h-full">
                <FunStats />
              </div>

              {/* Row 2 */}
              <div className="md:col-span-1 h-full">
                <GithubActivity />
              </div>
              <div className="md:col-span-1 h-full">
                <CyberGlobe />
              </div>
              <div className="md:col-span-1 h-full">
                <Skills />
              </div>

              {/* Row 3 - Full Width Tools */}
              <div className="md:col-span-3 h-full">
                <ToolsPanel />
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-20">
            <Projects />
          </section>

          {/* Notes Section */}
          <section id="notes" className="scroll-mt-20 py-20 bg-background/50 backdrop-blur-sm">
            <NotesSection />
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-20">
            <Contact />
          </section>

        </main>

        <Footer />

        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="fixed inset-0 pointer-events-none z-0 vignette" />
      </div>
    </PageTransitionProvider>
  );
};

export default Index;
