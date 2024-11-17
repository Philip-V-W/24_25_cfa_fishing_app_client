import {ContestResponse} from '@/types/contest';
import {ContestCard} from '@/components/admin/contests/ContestCard';

interface ContestsListProps {
    contests: ContestResponse[];
    onContestAction: () => void;
}

export function ContestsList({contests, onContestAction}: ContestsListProps) {
    if (contests.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No contests found for the selected filter.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {contests.map((contest) => (
                <ContestCard
                    key={contest.id}
                    contest={contest}
                    onAction={onContestAction}
                />
            ))}
        </div>
    );
}
