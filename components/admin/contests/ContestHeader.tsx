import {Button} from '@/components/ui/Button';

interface ContestHeaderProps {
    onCreateClick: () => void;
}

export function ContestHeader({onCreateClick}: ContestHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Contest Management
            </h1>
            <Button
                variant="primary"
                onClick={onCreateClick}
            >
                Create Contest
            </Button>
        </div>
    );
}