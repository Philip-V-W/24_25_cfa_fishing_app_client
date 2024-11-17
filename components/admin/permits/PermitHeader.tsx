import {Button} from "@/components/ui/Button";

interface PermitHeaderProps {
    totalPermits: number;
    onRefresh: () => void;
}

export function PermitHeader({totalPermits, onRefresh}: PermitHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Permit Management
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400">
                    Total Permits: {totalPermits}
                </span>
                <Button variant="outline" onClick={onRefresh}>
                    Refresh
                </Button>
            </div>
        </div>
    );
}