import { Terminal, Monitor, Cpu, Settings, Globe, HardDrive, Keyboard } from "lucide-react";

const toolsData = [
    { icon: Monitor, label: "OS", value: "Fedora Workstation", color: "text-blue-400" },
    { icon: Settings, label: "WM", value: "Niri Helper", color: "text-purple-400" },
    { icon: Terminal, label: "Shell", value: "Fish + Starship", color: "text-green-400" },
    { icon: Keyboard, label: "Editor", value: "Neovim (LazyVim)", color: "text-emerald-400" },
    { icon: Globe, label: "Browser", value: "Firefox Developer", color: "text-orange-400" },
    { icon: HardDrive, label: "Rig", value: "Rx 6700 XT / R5 5600", color: "text-red-400" },
    // { icon: Cpu, label: "Arch", value: "x86_64", color: "text-gray-400" },
];

const ToolsPanel = () => {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-primary">System Arsenal</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1">
                {toolsData.map((tool, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-background/30 border border-border/30 hover:bg-background/50 transition-colors">
                        <div className={`mt-0.5 ${tool.color}`}>
                            <tool.icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-bold leading-tight mb-0.5">{tool.label}</p>
                            <p className="text-xs font-medium leading-tight">{tool.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToolsPanel;
