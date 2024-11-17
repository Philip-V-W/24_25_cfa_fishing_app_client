import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {ContestResponse, ContestStatus} from '@/types/contest';

interface ContestCardProps {
    contest: ContestResponse;
    onAction: () => void;
}

export function ContestCard({contest, onAction}: ContestCardProps) {
    const getStatusColor = (status: ContestStatus) => {
        switch (status) {
            case ContestStatus.UPCOMING:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case ContestStatus.IN_PROGRESS:
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case ContestStatus.COMPLETED:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
            case ContestStatus.CANCELLED:
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {contest.name}
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            {contest.description}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contest.status)}`}>
                        {contest.status.toString().replace('_', ' ')}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date Range</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(contest.startDate).toLocaleDateString()} - {new Date(contest.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {contest.location}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {contest.currentParticipants} / {contest.maxParticipants}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            // TODO: View participants
                            console.log('View participants:', contest.id);
                        }}
                    >
                        View Participants
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            // TODO: Edit contest
                            console.log('Edit contest:', contest.id);
                        }}
                    >
                        Edit
                    </Button>
                    {contest.status === ContestStatus.UPCOMING && (
                        <Button
                            variant="primary"
                            onClick={() => {
                                // TODO: Start contest
                                console.log('Start contest:', contest.id);
                                onAction();
                            }}
                        >
                            Start Contest
                        </Button>
                    )}
                    {contest.status === ContestStatus.IN_PROGRESS && (
                        <Button
                            variant="primary"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                                // TODO: End contest
                                console.log('End contest:', contest.id);
                                onAction();
                            }}
                        >
                            End Contest
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}