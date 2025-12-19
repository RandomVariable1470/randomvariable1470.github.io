import { useRef, useState, useEffect } from "react";
import { useWindow } from "@/context/WindowManager";
import { cn } from "@/lib/utils";
import { ChevronUp, Wifi, Volume2, Battery } from "lucide-react";

export const Taskbar = () => {
    const { windows, activeWindowId, openWindow, minimizeWindow, restoreWindow } = useWindow();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-vista-glass backdrop-blur-lg border-t border-white/20 z-[9999] flex items-center px-1 shadow-glass-active select-none">
            {/* Start Button */}
            <div
                className="group relative cursor-pointer"
                onClick={() => {
                    // Logic to toggle start menu will go here
                    console.log("Start menu clicked");
                }}
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 p-[2px] shadow-[0_0_10px_rgba(0,100,255,0.6)] flex items-center justify-center hover:brightness-110 transition-all active:scale-95 -mt-2 ml-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/50 to-blue-900/50 border border-white/40 flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-0.5 opacity-90 p-1.5">
                            <div className="bg-[#f25022] w-full h-full rounded-[1px] shadow-sm"></div>
                            <div className="bg-[#7fba00] w-full h-full rounded-[1px] shadow-sm"></div>
                            <div className="bg-[#00a4ef] w-full h-full rounded-[1px] shadow-sm"></div>
                            <div className="bg-[#ffb900] w-full h-full rounded-[1px] shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Launch / Divider */}
            <div className="w-[1px] h-6 bg-white/10 mx-3 rounded-full"></div>

            {/* Active Apps */}
            <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar">
                {Object.values(windows).map((win) => {
                    if (!win.isOpen && !win.isMinimized) return null; // Only show open or minimized apps
                    const isActive = activeWindowId === win.id && !win.isMinimized;

                    return (
                        <button
                            key={win.id}
                            onClick={() => {
                                if (isActive) {
                                    minimizeWindow(win.id);
                                } else {
                                    if (win.isMinimized) restoreWindow(win.id);
                                    else openWindow(win.id); // Brings to front
                                }
                            }}
                            className={cn(
                                "flex items-center gap-2 px-3 h-8 rounded-md transition-all min-w-[140px] max-w-[200px] border",
                                isActive
                                    ? "bg-white/20 border-white/30 shadow-inner"
                                    : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            <div className="w-4 h-4 bg-blue-400 rounded-sm shadow-sm flex-shrink-0"></div>
                            <span className="text-xs text-white truncate drop-shadow-md font-sans">
                                {win.title}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-3 px-3 h-full bg-black/10 rounded-lg ml-2 border border-white/5 inner-shadow">
                <ChevronUp className="w-4 h-4 text-white/80 cursor-pointer hover:text-white" />
                <div className="w-[1px] h-5 bg-white/10"></div>
                <div className="flex gap-2">
                    <Wifi className="w-4 h-4 text-white drop-shadow-md" />
                    <Volume2 className="w-4 h-4 text-white drop-shadow-md" />
                    <Battery className="w-4 h-4 text-white drop-shadow-md rotate-90" />
                </div>

                {/* Clock */}
                <div className="flex flex-col items-end justify-center leading-none text-white drop-shadow-md cursor-default hover:bg-white/10 px-2 rounded py-1 transition-colors">
                    <span className="text-xs font-medium">{formatTime(time)}</span>
                    <span className="text-[10px] opacity-80">{formatDate(time)}</span>
                </div>
            </div>

            {/* Show Desktop Button */}
            <div className="w-3 h-full bg-white/10 hover:bg-white/30 border-l border-white/20 ml-1 cursor-pointer" title="Show Desktop"></div>
        </div>
    );
};
