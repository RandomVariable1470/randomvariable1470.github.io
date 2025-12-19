import { useRef } from "react";
import { AppId, useWindow } from "@/context/WindowManager";
import { WindowFrame } from "./WindowFrame";
import { Taskbar } from "./Taskbar";
import { AboutApp } from "@/apps/AboutApp";
import { ProjectsApp } from "@/apps/ProjectsApp";
import { SkillsApp } from "@/apps/SkillsApp";
import { ContactApp } from "@/apps/ContactApp";
import { TerminalApp } from "@/apps/TerminalApp";
import { User, Code, Cpu, Mail, Terminal as TerminalIcon, FileText } from "lucide-react";

const DesktopIcon = ({
    id,
    label,
    icon: Icon,
    onClick
}: {
    id: string,
    label: string,
    icon: any, // eslint-disable-line
    onClick: () => void
}) => {
    return (
        <button
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 group w-24 text-center transition-colors focus:bg-white/20 outline-none"
            onClick={onClick}
            onDoubleClick={onClick}
        >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-200">
                <Icon className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <span className="text-white text-xs md:text-sm font-medium drop-shadow-lg shadow-black group-hover:text-blue-100 px-1 rounded bg-black/20 group-hover:bg-transparent transition-colors">
                {label}
            </span>
        </button>
    )
}

export const Desktop = () => {
    const { openWindow } = useWindow();
    const desktopRef = useRef(null);

    // Initial abstract wallpaper until user provides one or we generate one
    // Using a deep CSS gradient that mimics Vista default wallpapers
    const wallpaperStyle = {
        background: "radial-gradient(circle at 50% 30%, #1e5799 0%, #2989d8 20%, #207cca 40%, #7db9e8 100%)",
        backgroundImage: `
            radial-gradient(at 0% 0%, rgba(0,0,0,0.5) 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(0,0,0,0.5) 0%, transparent 50%),
            linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)
        `
    };

    return (
        <div
            ref={desktopRef}
            className="fixed inset-0 overflow-hidden select-none"
            style={wallpaperStyle}
        >
            {/* Desktop Icons Content */}
            <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 z-40">
                <DesktopIcon
                    id="about"
                    label="About.exe"
                    icon={User}
                    onClick={() => openWindow('about')}
                />
                <DesktopIcon
                    id="projects"
                    label="Projects"
                    icon={Code}
                    onClick={() => openWindow('projects')}
                />
                <DesktopIcon
                    id="skills"
                    label="Skills"
                    icon={Cpu}
                    onClick={() => openWindow('skills')}
                />
                <DesktopIcon
                    id="terminal"
                    label="Terminal"
                    icon={TerminalIcon}
                    onClick={() => openWindow('terminal')}
                />
                <DesktopIcon
                    id="contact"
                    label="Contact"
                    icon={Mail}
                    onClick={() => openWindow('contact')}
                />
                <DesktopIcon
                    id="resume"
                    label="Resume.pdf"
                    icon={FileText}
                    onClick={() => window.open('/resume.pdf', '_blank')}
                />
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {/* Pointer events set arrow allowed for windows */}
                <div className="relative w-full h-full pointer-events-auto">
                    <WindowFrame appId="about">
                        <AboutApp />
                    </WindowFrame>
                    <WindowFrame appId="projects">
                        <ProjectsApp />
                    </WindowFrame>
                    <WindowFrame appId="skills">
                        <SkillsApp />
                    </WindowFrame>
                    <WindowFrame appId="contact">
                        <ContactApp />
                    </WindowFrame>
                    <WindowFrame appId="terminal" initialSize={{ width: 700, height: 450 }}>
                        <TerminalApp />
                    </WindowFrame>
                </div>
            </div>

            <Taskbar />
        </div>
    );
};
