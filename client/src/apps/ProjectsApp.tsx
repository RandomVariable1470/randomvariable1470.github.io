import { Folder, FileCode, Search, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FOLDERS = [
    { id: 'web', name: 'Web Dev', icon: Folder, type: 'folder' },
    { id: 'games', name: 'Game Dev', icon: Folder, type: 'folder' },
    { id: 'systems', name: 'Systems', icon: Folder, type: 'folder' },
];

const PROJECTS = {
    web: [
        { id: 'p1', name: 'E-Commerce Platform', type: 'app', desc: 'Next.js, Stripe, Tailwind' },
        { id: 'p2', name: 'Social Dashboard', type: 'app', desc: 'React, D3.js' },
    ],
    games: [
        { id: 'g1', name: 'Space Explorer', type: 'app', desc: 'Unity, C#' },
        { id: 'g2', name: 'Pixel Physics', type: 'app', desc: 'C++, SDL2' },
    ],
    systems: [
        { id: 's1', name: 'Custom OS', type: 'sys', desc: 'Rust, Assembly' },
        { id: 's2', name: 'Compiler', type: 'sys', desc: 'C, LLVM' },
    ]
};

export const ProjectsApp = () => {
    const [currentPath, setCurrentPath] = useState<string | null>(null);

    const handleNavigate = (folderId: string | null) => {
        setCurrentPath(folderId);
    };

    const currentItems = currentPath ? PROJECTS[currentPath as keyof typeof PROJECTS] : FOLDERS;

    return (
        <div className="flex flex-col h-full w-full bg-[#fcfdfe] text-black">
            {/* Address Bar */}
            <div className="h-10 bg-[#f0f0f0] border-b border-[#d9d9d9] flex items-center px-2 gap-2">
                <div className="flex gap-1 text-gray-400">
                    <button onClick={() => setCurrentPath(null)} disabled={!currentPath} className="disabled:opacity-30 hover:text-black hover:bg-white/50 rounded-full p-1"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="disabled:opacity-30 hover:text-black hover:bg-white/50 rounded-full p-1" disabled><ChevronRight className="w-4 h-4" /></button>
                    <button onClick={() => setCurrentPath(null)} disabled={!currentPath} className="disabled:opacity-30 hover:text-black hover:bg-white/50 rounded-full p-1"><ArrowUp className="w-4 h-4" /></button>
                </div>
                <div className="flex-1 bg-white border border-[#bebebe] h-7 flex items-center px-2 text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] gap-2">
                    <Folder className="w-3 h-3 text-[#e8c76d]" />
                    <span className="text-gray-700 w-full truncate cursor-text">
                        Computer &gt; Projects {currentPath ? `> ${FOLDERS.find(f => f.id === currentPath)?.name}` : ''}
                    </span>
                </div>
                <div className="w-48 bg-white border border-[#bebebe] h-7 flex items-center px-2 text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] text-gray-400">
                    <Search className="w-3 h-3 mr-2" />
                    Search Projects
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#f5f8fa] border-r border-[#d9d9d9] pt-2 hidden md:block">
                    <div className="px-2 py-1 text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Favorites</div>
                    <button onClick={() => setCurrentPath(null)} className={cn("w-full text-left px-4 py-1 flex items-center gap-2 text-xs hover:bg-[#e5f3ff] hover:border-[#ccecff] border border-transparent", !currentPath && "bg-[#d9efff] border-[#ccecff]")}>
                        <Folder className="w-3 h-3 text-[#1e5799]" />
                        Projects Root
                    </button>
                    <div className="mt-4 px-2 py-1 text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Libraries</div>
                    {FOLDERS.map(f => (
                        <button key={f.id} onClick={() => setCurrentPath(f.id)} className={cn("w-full text-left px-4 py-1 flex items-center gap-2 text-xs hover:bg-[#e5f3ff] hover:border-[#ccecff] border border-transparent", currentPath === f.id && "bg-[#d9efff] border-[#ccecff]")}>
                            <Folder className="w-3 h-3 text-[#e8c76d]" />
                            {f.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white p-4 overflow-y-auto">
                    {/* Header */}
                    <div className="border-b border-[#dadada] pb-2 mb-2 flex gap-4 text-xs text-gray-500">
                        <span className="w-1/2 border-r border-transparent hover:border-r-gray-300 cursor-pointer hover:bg-gray-50 px-1">Name</span>
                        <span className="w-1/4 border-r border-transparent hover:border-r-gray-300 cursor-pointer hover:bg-gray-50 px-1">Type</span>
                        <span className="w-1/4 cursor-pointer hover:bg-gray-50 px-1">Details</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                        {currentItems.map((item: any) => ( // eslint-disable-line
                            <div
                                key={item.id}
                                className="group flex items-center px-2 py-1.5 hover:bg-[#e5f3ff] hover:border-[#ccecff] border border-transparent rounded-sm cursor-pointer text-sm"
                                onDoubleClick={() => item.type === 'folder' ? handleNavigate(item.id) : null}
                            >
                                <div className="w-1/2 flex items-center gap-2 overflow-hidden">
                                    {item.type === 'folder' ? (
                                        <Folder className="w-5 h-5 text-[#e8c76d] drop-shadow-sm flex-shrink-0" />
                                    ) : (
                                        <FileCode className="w-4 h-4 text-[#1e5799] drop-shadow-sm flex-shrink-0" />
                                    )}
                                    <span className="truncate">{item.name}</span>
                                </div>
                                <div className="w-1/4 text-gray-500 text-xs truncate">
                                    {item.type === 'folder' ? 'File Folder' : 'Application'}
                                </div>
                                <div className="w-1/4 text-gray-400 text-xs truncate group-hover:text-gray-600">
                                    {item.desc || '--'}
                                </div>
                            </div>
                        ))}
                        {currentItems.length === 0 && (
                            <div className="text-gray-400 text-sm text-center mt-10">This folder is empty.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="h-6 bg-[#f0f0f0] border-t border-[#d9d9d9] flex items-center px-3 text-xs text-gray-500 gap-4">
                <span>{currentItems.length} items</span>
                <span className="border-l border-gray-300 pl-4">Local Disk (C:)</span>
            </div>
        </div>
    );
};
