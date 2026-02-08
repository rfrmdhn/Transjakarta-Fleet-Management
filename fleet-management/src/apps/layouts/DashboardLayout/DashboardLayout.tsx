import React, { type ReactNode } from 'react';
import { Sidebar } from '../../../shared/ui/organisms/Sidebar';
import { Header } from '../../../shared/ui/organisms/Header';

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-200">
            <Header onMenuClick={toggleSidebar} />
            <div className="flex flex-1 w-full max-w-[1440px] mx-auto relative">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <main className="flex-1 flex flex-col min-w-0 p-6 gap-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
