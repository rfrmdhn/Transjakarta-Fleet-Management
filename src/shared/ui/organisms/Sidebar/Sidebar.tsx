import React from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={clsx(
                "w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-card-light dark:bg-card-dark p-4 gap-4 transition-transform duration-300 ease-in-out z-40",
                // Mobile styles
                "fixed top-0 bottom-0 left-0 h-full shadow-2xl lg:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full",
                // Desktop styles
                "lg:translate-x-0 lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] lg:flex"
            )}>
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    {/* <img src="/logo-transjakarta.webp" alt="Transjakarta" className="h-8 w-auto" /> */}

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden ml-auto p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>
                <div className="flex flex-col gap-1">
                    <NavItem
                        icon="directions_bus"
                        label="Vehicles"
                        to="/"
                        active={location.pathname === '/' || location.pathname.startsWith('/vehicles')}
                        onClick={onClose}
                    />
                    <NavItem
                        icon="map"
                        label="Live Map"
                        to="/map"
                        active={location.pathname === '/map'}
                        onClick={onClose}
                    />
                    {/* <NavItem icon="person" label="Drivers" to="#" /> */}
                    {/* <NavItem icon="build" label="Maintenance" to="#" /> */}
                    {/* <NavItem icon="warning" label="Alerts" to="#" /> */}
                </div>
                {/* <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <span className="material-symbols-outlined text-sm">info</span>
                            <span className="text-xs font-bold uppercase tracking-wider">System Status</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">All systems operational.</p>
                    </div>
                </div> */}
            </aside>
        </>
    );
};

interface NavItemProps {
    icon: string;
    label: string;
    to: string;
    active?: boolean;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active, onClick }) => (
    <Link
        to={to}
        className={clsx(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
            active
                ? "bg-primary/10 text-primary"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
        )}
        onClick={onClick}
    >
        <span className={clsx("material-symbols-outlined", !active && "group-hover:text-primary")}>{icon}</span>
        <p className="text-sm font-medium">{label}</p>
    </Link>
);
