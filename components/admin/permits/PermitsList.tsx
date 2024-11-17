import {PermitResponse} from '@/types/permit';
import {PermitCard} from './PermitCard';

interface PermitsListProps {
    permits: PermitResponse[];
    onApprove: (permitId: number) => Promise<void>;
    onRejectClick: (permit: PermitResponse) => void;
}

export function PermitsList({permits, onApprove, onRejectClick}: PermitsListProps) {
    if (permits.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No permits found for the selected filter.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {permits.map((permit) => (
                <PermitCard
                    key={permit.id}
                    permit={permit}
                    onApprove={onApprove}
                    onRejectClick={onRejectClick}
                />
            ))}
        </div>
    );
}