import {ReactNode} from 'react';
import {Card} from "@/components/ui/Card";

interface SuccessMessageProps {
    title: string;
    message: string;
    actions: ReactNode;
    footer?: ReactNode;
}

export function SuccessMessage({
                                   title,
                                   message,
                                   actions,
                                   footer
                               }: SuccessMessageProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border text-center p-8">
            <div
                className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {title}
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
                {message}
            </p>

            <div className="mt-8 space-y-4">
                {actions}
            </div>

            {footer && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {footer}
                </div>
            )}
        </Card>
    );
}