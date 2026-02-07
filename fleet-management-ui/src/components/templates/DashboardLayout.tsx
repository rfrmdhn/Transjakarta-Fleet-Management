import React, { type ReactNode } from 'react';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-200">
            <Header />
            <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
                <Sidebar />
                <main className="flex-1 flex flex-col min-w-0 p-6 gap-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
