

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
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                    <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <img
                            alt="User Profile"
                            className="h-full w-full object-cover"
                            src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                        />
                    </div>
                    <div className="hidden md:block text-sm font-medium">
                        <p className="text-slate-700 dark:text-slate-200">Admin User</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
