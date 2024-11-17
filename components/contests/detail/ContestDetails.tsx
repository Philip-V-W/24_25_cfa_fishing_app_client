import {ContestResponse, ContestStatus} from '@/types/contest';

interface ContestDetailsProps {
    contest: ContestResponse;
}

interface DetailRowProps {
    label: string;
    value: string;
}

function DetailRow({label, value}: DetailRowProps) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{label}:</span>
            <span className="text-gray-900 dark:text-white">{value}</span>
        </div>
    );
}

export function ContestDetails({contest}: ContestDetailsProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Event Details
            </h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`font-medium ${
                        contest.status === ContestStatus.UPCOMING
                            ? 'text-green-600 dark:text-green-400'
                            : contest.status === ContestStatus.IN_PROGRESS
                                ? 'text-blue-600 dark:text-blue-400'
                                : contest.status === ContestStatus.COMPLETED
                                    ? 'text-gray-600 dark:text-gray-400'
                                    : 'text-red-600 dark:text-red-400'
                    }`}>
                        {ContestStatus[contest.status]}
                    </span>
                </div>
                <DetailRow label="Start Date" value={new Date(contest.startDate).toLocaleDateString()}/>
                <DetailRow label="End Date" value={new Date(contest.endDate).toLocaleDateString()}/>
                <DetailRow label="Location" value={contest.location ?? ''}/>
                <DetailRow label="Entry Fee" value={`$${contest.entryFee}`}/>
                <DetailRow
                    label="Participants"
                    value={`${contest.currentParticipants}/${contest.maxParticipants}`}
                />
            </div>
        </div>
    );
}