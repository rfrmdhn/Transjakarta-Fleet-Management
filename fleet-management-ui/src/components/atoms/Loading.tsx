

export const Loading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 h-48 flex flex-col justify-between">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
