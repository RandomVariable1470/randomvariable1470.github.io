import React, { useRef, useState, useEffect } from "react";
import { AppId, useWindow } from "@/context/WindowManager"; // Assuming alias @ points to src
import { X, Minus, Square, Maximize } from "lucide-react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface WindowFrameProps {
    appId: AppId;
    children: React.ReactNode;
    initialSize?: { width: number; height: number };
    initialPosition?: { x: number; y: number };
}

export const WindowFrame = ({
    appId,
    children,
    initialSize = { width: 600, height: 400 },
    initialPosition = { x: 100, y: 100 },
}: WindowFrameProps) => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindow();
    const windowState = windows[appId];

    const dragControls = useDragControls();
    const windowRef = useRef<HTMLDivElement>(null);

    // Custom resize state
    const [size, setSize] = useState(initialSize);
    const [isResizing, setIsResizing] = useState(false);

    // Focus on click
    const handlePointerDown = () => {
        focusWindow(appId);
    };

    // Resize logic
    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !windowRef.current) return;

            const newWidth = e.clientX - windowRef.current.getBoundingClientRect().left;
            const newHeight = e.clientY - windowRef.current.getBoundingClientRect().top;

            setSize({
                width: Math.max(300, newWidth), // Min width
                height: Math.max(200, newHeight), // Min height
            });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);

    if (!windowState.isOpen) return null;

    return (
        <motion.div
            ref={windowRef}
            initial={{
                opacity: 0,
                scale: 0.9,
                x: initialPosition.x,
                y: initialPosition.y
            }}
            animate={{
                opacity: windowState.isMinimized ? 0 : 1,
                scale: windowState.isMinimized ? 0.8 : 1,
                width: windowState.isMaximized ? "100vw" : size.width,
                height: windowState.isMaximized ? "calc(100vh - 40px)" : size.height, // Subtract taskbar height
                x: windowState.isMaximized ? 0 : undefined, // Let drag handle x/y otherwise
                y: windowState.isMaximized ? 0 : undefined,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            drag={!windowState.isMaximized}
            dragControls={dragControls}
            dragListener={false} // Only drag from title bar
            dragMomentum={false}
            onPointerDown={handlePointerDown}
            style={{
                position: "absolute",
                zIndex: windowState.zIndex,
                touchAction: "none"
            }}
            className={cn(
                "flex flex-col overflow-hidden rounded-t-lg shadow-window",
                // Vista Glass Effect
                "bg-vista-glass backdrop-blur-md border border-vista-glass-border/50 ring-1 ring-vista-glass-highlight/20",
                windowState.isMaximized ? "rounded-none" : "rounded-lg"
            )}
        >
            {/* Title Bar */}
            <div
                className="h-8 md:h-9 relative flex items-center justify-between px-2 select-none cursor-default bg-gradient-to-b from-white/20 to-transparent"
                onPointerDown={(e) => {
                    dragControls.start(e);
                    handlePointerDown();
                }}
                onDoubleClick={() => maximizeWindow(appId)}
            >
                {/* Glow behind titlebar for active state could go here */}

                {/* Title */}
                <div className="flex items-center gap-2 pl-1">
                    <div className="w-4 h-4 rounded-sm bg-blue-500/20 flex items-center justify-center shadow-inner border border-white/10">
                        {/* Icon placeholder */}
                        <div className="w-2 h-2 bg-blue-300 rounded-full blur-[1px]"></div>
                    </div>
                    <span className="text-white text-xs md:text-sm font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-wide">
                        {windowState.title}
                    </span>
                </div>

                {/* Window Controls */}
                <div className="flex items-center gap-1" onPointerDown={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => minimizeWindow(appId)}
                        className="w-6 h-5 md:w-8 md:h-6 flex items-center justify-center hover:bg-white/20 rounded-sm transition-colors group"
                    >
                        <Minus className="w-3 h-3 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => maximizeWindow(appId)}
                        className="w-6 h-5 md:w-8 md:h-6 flex items-center justify-center hover:bg-white/20 rounded-sm transition-colors group"
                    >
                        {windowState.isMaximized ? (
                            <Square className="w-2.5 h-2.5 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                        ) : (
                            <Maximize className="w-3 h-3 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                        )}
                    </button>
                    <button
                        onClick={() => closeWindow(appId)}
                        className="w-6 h-5 md:w-10 md:h-6 flex items-center justify-center hover:bg-red-500/80 rounded-sm transition-colors group"
                    >
                        <X className="w-4 h-4 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-vista-dark/90 relative">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                {children}
            </div>

            {/* Resize Handle */}
            {!windowState.isMaximized && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5 opacity-50 hover:opacity-100"
                    onMouseDown={handleResizeStart}
                >
                    <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                </div>
            )}
        </motion.div>
    );
};
