import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1; // 100 steps * 30ms = 3000ms approx
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center cursor-none">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-12 flex flex-col items-center"
            >
                <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-[0_0_40px_rgba(0,120,255,0.4)]">
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/20 to-transparent animate-pulse"></div>
                    </div>
                </div>
                <h1 className="text-white text-2xl font-sans tracking-widest font-light">
                    PORTFOLIO <span className="font-bold">OS</span>
                </h1>
                <p className="text-gray-500 text-xs mt-2 tracking-wider uppercase">Ultimate Edition</p>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 h-2 bg-[#1a1a1a] rounded-full p-0.5 border border-[#333]">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full shadow-[0_0_10px_rgba(30,144,255,0.6)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="mt-4 text-gray-500 text-xs font-mono">
                {progress < 100 ? `Loading System... ${progress}%` : "Starting Desktop Environment..."}
            </div>

            <div className="absolute bottom-8 text-gray-700 text-[10px] font-mono">
                &copy; 2024 RandomVariable Systems. All rights reserved.
            </div>
        </div>
    );
};
