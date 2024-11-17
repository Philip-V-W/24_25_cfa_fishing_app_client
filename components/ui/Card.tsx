interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({children, className = ''}: CardProps) {
    return (
        <div
            className={`bg-white dark:bg-dark-card rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-dark-border p-6 ${className}`}>
            {children}
        </div>
    );
}