import {Button} from "@/components/ui/Button";

interface AnalyticsErrorProps {
    error: string;
    onRetry: () => void;
}

export function AnalyticsError({ error, onRetry }: AnalyticsErrorProps) {
    return (
        <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <Button variant="outline" className="mt-4" onClick={onRetry}>
                Retry
            </Button>
        </div>
    );
}