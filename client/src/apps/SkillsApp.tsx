import { Cpu, Database, Globe, Layers, Zap } from "lucide-react";

const SkillBar = ({ label, level, color }: { label: string, level: number, color: string }) => (
    <div className="flex items-center gap-4 mb-3">
        <span className="w-32 text-xs font-semibold text-gray-600 truncate text-right">{label}</span>
        <div className="flex-1 h-3 bg-[#e6e6e6] rounded-full border border-[#bcbcbc] shadow-inner overflow-hidden relative">
            <div
                className="h-full rounded-l-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out"
                style={{ width: `${level}%`, backgroundColor: color }}
            >
                {/* Glass shine effect */}
                <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/30 to-transparent"></div>
            </div>
        </div>
        <span className="w-8 text-xs text-gray-500">{level}%</span>
    </div>
);

const Category = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => ( // eslint-disable-line
    <div className="mb-6 bg-white border border-[#d9d9d9] rounded p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4 border-b border-[#eee] pb-2">
            <Icon className="w-5 h-5 text-[#1e5799]" />
            <h3 className="font-bold text-[#1e5799]">{title}</h3>
        </div>
        {children}
    </div>
);

export const SkillsApp = () => {
    return (
        <div className="h-full bg-[#f0f0f0] overflow-y-auto p-6 text-black">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-[#333]">System Capabilities</h1>
                    <p className="text-sm text-gray-500">View and manage system proficiency levels.</p>
                </div>

                <Category title="Core Processing (Languages)" icon={Cpu}>
                    <SkillBar label="TypeScript / JS" level={95} color="#0078d7" />
                    <SkillBar label="Rust" level={85} color="#e36920" />
                    <SkillBar label="C++" level={80} color="#005a9e" />
                    <SkillBar label="Go" level={75} color="#00add8" />
                </Category>

                <Category title="Web Interfaces (Frontend)" icon={Globe}>
                    <SkillBar label="React / Next.js" level={90} color="#61dafb" />
                    <SkillBar label="Tailwind CSS" level={95} color="#38bdf8" />
                    <SkillBar label="Three.js / WebGL" level={70} color="#333333" />
                </Category>

                <Category title="Data Storage (Backend)" icon={Database}>
                    <SkillBar label="PostgreSQL" level={85} color="#336791" />
                    <SkillBar label="Redis" level={80} color="#d82c20" />
                    <SkillBar label="Node.js" level={88} color="#68a063" />
                </Category>

                <Category title="Graphics & Tools" icon={Layers}>
                    <SkillBar label="Unity / Unreal" level={75} color="#222c37" />
                    <SkillBar label="Docker / K8s" level={80} color="#326ce5" />
                    <SkillBar label="Git workflow" level={95} color="#f05032" />
                </Category>
            </div>
        </div>
    );
};
