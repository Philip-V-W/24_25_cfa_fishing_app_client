interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function AuthInput({label, ...props}: AuthInputProps) {
    return (
        <div>
            <label
                htmlFor={props.id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
            <input
                {...props}
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-dark-border
                         bg-white dark:bg-dark-card px-3 py-2 text-gray-900 dark:text-white
                         focus:border-primary-500 focus:ring-primary-500 outline-none"
            />
        </div>
    );
}