interface ContestHeaderProps {
    name: string;
    description: string;
}

export function ContestHeader({name, description}: ContestHeaderProps) {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {name ?? 'Contest Name'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                {description ?? 'Contest description'}
            </p>
        </div>
    );
}