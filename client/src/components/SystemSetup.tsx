import { ExternalLink, Terminal, Monitor, Cpu, Settings } from "lucide-react";
import { motion } from "framer-motion";

const SystemSetup = () => {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors group flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        System Info
                    </h3>
                    <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                        <Monitor className="w-3 h-3" />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* OS Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            {/* Fedora Icon SVG */}
                            <svg viewBox="0 0 128 128" className="w-6 h-6 fill-blue-500">
                                <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 116.4c-28.9 0-52.4-23.5-52.4-52.4S35.1 11.6 64 11.6s52.4 23.5 52.4 52.4-23.5 52.4-52.4 52.4z" />
                                <path d="M64 23.3c-22.5 0-40.7 18.2-40.7 40.7 0 22.5 18.2 40.7 40.7 40.7 22.5 0 40.7-18.2 40.7-40.7 0-22.5-18.2-40.7-40.7-40.7zm0 69.8c-16 0-29.1-13.1-29.1-29.1 0-16 13.1-29.1 29.1-29.1 16 0 29.1 13.1 29.1 29.1 0 16.1-13.1 29.1-29.1 29.1z" />
                                <path d="M64 40.7c-9.6 0-17.5 7.8-17.5 17.5 0 9.6 7.8 17.5 17.5 17.5 9.6 0 17.5-7.8 17.5-17.5 0-9.7-7.9-17.5-17.5-17.5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">Fedora Linux</p>
                            <p className="text-xs text-muted-foreground font-mono">Workstation 41</p>
                        </div>
                    </div>

                    {/* WM Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">Niri WM</p>
                            <p className="text-xs text-muted-foreground font-mono">Wayland Compositor</p>
                        </div>
                    </div>

                    {/* Hardware/Shell */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-primary/5 rounded-md p-2 border border-primary/10">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold">Shell</p>
                            <p className="text-xs font-mono text-primary">Fish</p>
                        </div>
                        <div className="bg-primary/5 rounded-md p-2 border border-primary/10">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold">Editor</p>
                            <p className="text-xs font-mono text-primary">Neovim</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/50">
                <a href="https://github.com/randomvariable1470/dotfiles" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link">
                    <span className="text-xs text-muted-foreground group-hover/link:text-primary transition-colors">View Dotfiles</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover/link:text-primary transition-colors" />
                </a>
            </div>
        </div>
    );
};

export default SystemSetup;
