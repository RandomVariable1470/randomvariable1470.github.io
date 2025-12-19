import { Mail, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming I can use shadcn button for inner controls or just raw HTML

export const ContactApp = () => {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setTimeout(() => {
            setStatus("sent");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <div className="h-full w-full bg-[#f0f0f0] flex flex-col p-6 text-black">
            <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-white rounded-lg border border-[#d9d9d9] shadow-sm">
                    <Mail className="w-10 h-10 text-[#1e5799]" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-[#1e5799]">Contact Administrator</h2>
                    <p className="text-sm text-gray-600">Send a message directly to the system owner.</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6">
                {/* Form */}
                <form onSubmit={handleSend} className="flex-1 flex flex-col gap-3">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500">Subject</label>
                        <input type="text" className="w-full bg-white border border-[#bebebe] rounded-sm px-2 py-1.5 text-sm outline-none focus:border-[#0078d7] focus:ring-1 focus:ring-[#0078d7]/30" placeholder="Inquiry..." required />
                    </div>
                    <div className="space-y-1 flex-1 flex flex-col">
                        <label className="text-xs font-semibold text-gray-500">Message</label>
                        <textarea className="w-full flex-1 bg-white border border-[#bebebe] rounded-sm px-2 py-1.5 text-sm outline-none focus:border-[#0078d7] focus:ring-1 focus:ring-[#0078d7]/30 resize-none min-h-[100px]" placeholder="Type your message here..." required></textarea>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={status !== "idle"}
                            className="px-6 py-1.5 bg-[#e1e1e1] border border-[#adadad] rounded-sm text-sm hover:bg-[#e5f1fb] hover:border-[#0078d7] focus:outline-none focus:border-[#0078d7] shadow-sm active:bg-[#cce4f7] transition-colors disabled:opacity-50"
                        >
                            {status === "idle" ? "Send Message" : status === "sending" ? "Sending..." : "Sent!"}
                        </button>
                    </div>
                </form>

                {/* Social Links */}
                <div className="w-full md:w-48 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-[#d9d9d9] pt-4 md:pt-0 md:pl-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Connect</h3>

                    <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 hover:bg-white rounded border border-transparent hover:border-[#d9d9d9] transition-colors group">
                        <Github className="w-4 h-4 text-gray-700 group-hover:text-black" />
                        <span className="text-sm text-blue-600 underline">GitHub</span>
                    </a>

                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 hover:bg-white rounded border border-transparent hover:border-[#d9d9d9] transition-colors group">
                        <Linkedin className="w-4 h-4 text-gray-700 group-hover:text-[#0077b5]" />
                        <span className="text-sm text-blue-600 underline">LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
