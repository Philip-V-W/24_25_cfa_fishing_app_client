import {Card} from "@/components/ui/Card";

interface AuthCardProps {
    title: string;
    subtitle: string;
    error: string | null;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function AuthCard({title, subtitle, error, children, footer}: AuthCardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-dark-bg">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                </div>

                <Card className="p-6 space-y-6 bg-white dark:bg-dark-card border dark:border-dark-border">
                    {error && (
                        <div
                            className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {children}
                    {footer && (
                        <div className="text-center text-sm">
                            {footer}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}