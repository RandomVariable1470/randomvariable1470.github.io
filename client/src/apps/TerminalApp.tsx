import { useState, useRef, useEffect } from "react";

const COMMANDS = {
    help: "Available commands: help, whoami, skills, clear, exit",
    whoami: "user@portfolio-os: Full Stack Engineer & Systems Enthusiast",
    skills: "Try opening the Skills app for a visual representation.",
    exit: "Closing terminal...",
} as const; // Added as const to make keys readonly

// Helper type for keys of COMMANDS
type CommandKey = keyof typeof COMMANDS;

export const TerminalApp = () => {
    const [history, setHistory] = useState<string[]>(["Welcome to Portfolio OS Terminal v1.0.0", "Type 'help' to see available commands."]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const command = input.trim().toLowerCase();
            const newHistory = [...history, `$ ${input}`];

            if (command === "clear") {
                setHistory([]);
            } else if (command === "exit") {
                newHistory.push("Closing terminal functionality not implemented in window mode yet."); // Hook up to closeWindow later if needed
                setHistory(newHistory);
            } else if (COMMANDS[command as CommandKey]) {
                newHistory.push(COMMANDS[command as CommandKey]);
                setHistory(newHistory);
            } else if (command !== "") {
                newHistory.push(`Command not found: ${command}`);
                setHistory(newHistory);
            }

            setInput("");
        }
    };

    return (
        <div className="h-full w-full bg-black text-[#cccccc] font-mono text-sm p-2 overflow-y-auto" onClick={() => document.getElementById("terminal-input")?.focus()}>
            {history.map((line, i) => (
                <div key={i} className="mb-1 break-words">{line}</div>
            ))}
            <div className="flex">
                <span className="mr-2 text-[#4af626]">$</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-[#cccccc]"
                    autoFocus
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
