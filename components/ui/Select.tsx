interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    error?: string;
}

export function Select({className = '', error, ...props}: SelectProps) {
    return (
        <div>
            <select
                {...props}
                className={`block w-full rounded-md border-gray-300 dark:border-gray-600 
                         shadow-sm focus:border-primary-500 focus:ring-primary-500 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         sm:text-sm ${error ? 'border-red-500' : ''} ${className}`}
            >
                {props.children}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}