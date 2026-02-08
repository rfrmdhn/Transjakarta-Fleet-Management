

interface HeaderProps {
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md px-6 py-3 shadow-sm">
            <div className="flex items-center gap-3 lg:hidden">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg active:bg-slate-100 dark:active:bg-slate-800"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <img src="/logo-transjakarta.webp" alt="Transjakarta" className="h-8 w-auto" />
                <div>
                    <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Fleet Management</h1>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
                <img src="/logo-transjakarta.webp" alt="Transjakarta" className="h-8 w-auto" />
                <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Fleet Management</h1>
            </div>
            <div className="flex gap-3 items-center">
                <button className="relative p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                </button>
                <button className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                {/* User Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                            <img
                                alt="User Profile"
                                className="h-full w-full object-cover"
                                src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                            />
                        </div>
                        <div className="hidden md:block text-sm font-medium text-left">
                            <p className="text-slate-700 dark:text-slate-200 leading-none">Admin User</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-card-dark rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/50">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin User</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@transjakarta.co.id</p>
                        </div>

                        <div className="px-4 py-2">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Role</div>
                            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                <span className="material-symbols-outlined text-[18px] text-primary">admin_panel_settings</span>
                                Fleet Admin
                            </div>
                        </div>

                        <div className="px-4 py-2">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Department</div>
                            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                <span className="material-symbols-outlined text-[18px] text-blue-500">domain</span>
                                Operational
                            </div>
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800/50 mt-1 pt-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
