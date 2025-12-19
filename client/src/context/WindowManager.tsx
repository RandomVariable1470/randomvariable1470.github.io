import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppId = 'about' | 'projects' | 'skills' | 'contact' | 'terminal';

export interface WindowState {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface WindowContextType {
    windows: Record<AppId, WindowState>;
    activeWindowId: AppId | null;
    openWindow: (id: AppId) => void;
    closeWindow: (id: AppId) => void;
    minimizeWindow: (id: AppId) => void;
    restoreWindow: (id: AppId) => void;
    maximizeWindow: (id: AppId) => void; // Toggle maximize
    focusWindow: (id: AppId) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
    about: { id: 'about', title: 'About.exe', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    skills: { id: 'skills', title: 'Skills Control Panel', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    contact: { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
};

export const WindowProvider = ({ children }: { children: ReactNode }) => {
    const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
    const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
    const [nextZIndex, setNextZIndex] = useState(10);

    const focusWindow = (id: AppId) => {
        setActiveWindowId(id);
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], zIndex: nextZIndex, isMinimized: false },
        }));
        setNextZIndex((prev) => prev + 1);
    };

    const openWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZIndex },
        }));
        setNextZIndex((prev) => prev + 1);
        setActiveWindowId(id);
    };

    const closeWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: true },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const restoreWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: false },
        }));
        focusWindow(id);
    };

    const maximizeWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
        }));
        focusWindow(id);
    };

    return (
        <WindowContext.Provider
            value={{
                windows,
                activeWindowId,
                openWindow,
                closeWindow,
                minimizeWindow,
                restoreWindow,
                maximizeWindow,
                focusWindow,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};

export const useWindow = () => {
    const context = useContext(WindowContext);
    if (context === undefined) {
        throw new Error('useWindow must be used within a WindowProvider');
    }
    return context;
};
