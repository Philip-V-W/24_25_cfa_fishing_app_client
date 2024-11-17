import {ReactNode} from 'react';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";

interface CheckoutStatusCardProps {
    icon: ReactNode;
    title: string;
    message: string;
    primaryButton: {
        label: string;
        onClick: () => void;
    };
    secondaryButton: {
        label: string;
        onClick: () => void;
    };
}

export function CheckoutStatusCard({
                                       icon,
                                       title,
                                       message,
                                       primaryButton,
                                       secondaryButton
                                   }: CheckoutStatusCardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-white dark:bg-dark-card
                         border dark:border-dark-border text-center p-8">
                <div className="mx-auto w-16 h-16 flex items-center justify-center
                            rounded-full bg-red-100 dark:bg-red-900/30">
                    {icon}
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {message}
                </p>
                <Button
                    variant="primary"
                    className="mt-8 w-full"
                    onClick={primaryButton.onClick}
                >
                    {primaryButton.label}
                </Button>
                <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={secondaryButton.onClick}
                >
                    {secondaryButton.label}
                </Button>
            </Card>
        </div>
    );
}