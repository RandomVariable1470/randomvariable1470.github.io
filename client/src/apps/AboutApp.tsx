import { User } from "lucide-react";

export const AboutApp = () => {
    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-[#f0f0f0] text-black">
            {/* Sidebar / Left Panel */}
            <div className="w-full md:w-48 bg-gradient-to-b from-[#b4d2f0] to-[#dcedfc] p-4 flex flex-col items-center border-r border-white/50 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.05)]">
                <div className="w-24 h-24 bg-white/50 rounded-full border-4 border-white/80 shadow-lg flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-[#1e5799] drop-shadow-md" />
                </div>
                <h2 className="text-[#1e5799] font-bold text-lg text-center drop-shadow-sm">System Admin</h2>
                <p className="text-gray-600 text-xs text-center mt-1">Full Stack Engineer</p>

                <div className="mt-8 w-full border-t border-white/50 pt-4">
                    <div className="text-[10px] uppercase font-bold text-[#1e5799] mb-2 tracking-wider">Specs</div>
                    <div className="text-xs text-gray-700 space-y-1">
                        <div className="flex justify-between"><span>Role:</span> <span className="font-semibold">Dev</span></div>
                        <div className="flex justify-between"><span>Exp:</span> <span className="font-semibold">5+ Yrs</span></div>
                        <div className="flex justify-between"><span>Loc:</span> <span className="font-semibold">Remote</span></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
                <div className="mb-6 flex items-center gap-3 border-b border-[#d9d9d9] pb-4">
                    <img src="/logo-placeholder.png" alt="Logo" className="w-12 h-12 object-contain hidden" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <div>
                        <h1 className="text-2xl font-bold text-[#0c3252] font-sans">Portfolio OS</h1>
                        <p className="text-sm text-gray-500">Ultimate Edition</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <section>
                        <h3 className="text-[#1e5799] font-bold mb-1 border-b border-dotted border-gray-400 inline-block">System Description</h3>
                        <p className="text-sm text-gray-800 leading-relaxed max-w-2xl mt-2">
                            I am a passionate computer scientist and full-stack engineer with a deep love for systems programming, game development, and interactive web experiences.
                            This portfolio is a reflection of my philosophy: software should not just work, it should feel like a cohesive, living system.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-[#1e5799] font-bold mb-1 border-b border-dotted border-gray-400 inline-block">Experience</h3>
                        <ul className="mt-2 space-y-2 text-sm text-gray-800">
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">2022-Pres</span>
                                <span>Senior Systems Engineer at TechCorp</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">2020-2022</span>
                                <span>Game Play Programmer at IndieStudio</span>
                            </li>
                        </ul>
                    </section>

                    {/* Fake Windows Rating/Score */}
                    <div className="mt-8 p-3 bg-[#f0f5fb] border border-[#d2e4f7] rounded flex items-center gap-4">
                        <div className="bg-[#1e5799] text-white font-bold p-2 text-xl rounded shadow-inner min-w-[40px] text-center">
                            9.8
                        </div>
                        <div>
                            <div className="font-bold text-gray-700 text-sm">Windows Experience Index</div>
                            <div className="text-xs text-gray-500">Determined by code quality and performance metrics</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
