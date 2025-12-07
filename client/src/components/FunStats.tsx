import { Coffee, Bug, GitCommit, Zap } from "lucide-react";
import { motion } from "framer-motion";

const funStats = [
    { icon: Coffee, label: "Caffeine Level", value: "98%", color: "text-amber-500" },
    { icon: Bug, label: "Bugs Created", value: "∞", color: "text-red-500" }, // Playful infinity
    { icon: GitCommit, label: "Commits", value: "1,337", color: "text-blue-500" },
    { icon: Zap, label: "Focus", value: "High", color: "text-yellow-500" },
];

const FunStats = () => {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors h-full flex flex-col justify-center">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground mb-4 text-center">Live Telemetry</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
                {funStats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 group">
                        <div className={`p-2 rounded-full bg-background/50 border border-border/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-4 h-4" />
                        </div>
                        <div className="mt-1">
                            <p className="text-sm font-bold">{stat.value}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FunStats;
