
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WindowProvider } from "@/context/WindowManager";
import { Desktop } from "@/components/os/Desktop";
import { BootScreen } from "@/components/os/BootScreen";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [booted, setBooted] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!booted ? (
          <BootScreen onComplete={() => setBooted(true)} />
        ) : (
          <WindowProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Desktop />} />
                <Route path="*" element={<Desktop />} />
              </Routes>
            </BrowserRouter>
          </WindowProvider>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
