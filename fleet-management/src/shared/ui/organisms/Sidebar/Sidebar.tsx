import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-card-light dark:bg-card-dark p-4 gap-4 h-[calc(100vh-65px)] sticky top-[65px]">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <img src="/logo-transjakarta.webp" alt="Transjakarta" className="h-8 w-auto" />
                <div className="flex flex-col">
                    <h1 className="text-slate-900 dark:text-white text-sm font-bold leading-normal">Fleet Admin</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-normal leading-normal uppercase tracking-wider">Operational</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <NavItem icon="dashboard" label="Overview" to="#" />
                <NavItem icon="directions_bus" label="Vehicles" to="/" active />
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
    );
};

interface NavItemProps {
    icon: string;
    label: string;
    to: string;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active }) => (
    <Link
        to={to}
        className={clsx(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
            active
                ? "bg-primary/10 text-primary"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
        )}
    >
        <span className={clsx("material-symbols-outlined", !active && "group-hover:text-primary")}>{icon}</span>
        <p className="text-sm font-medium">{label}</p>
    </Link>
);
