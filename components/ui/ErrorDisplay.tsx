import {Button} from '@/components/ui/Button';

interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

export function ErrorDisplay({error, onRetry}: ErrorDisplayProps) {
    return (
        <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <Button variant="outline" className="mt-4" onClick={onRetry}>
                Retry
            </Button>
        </div>
    );
}