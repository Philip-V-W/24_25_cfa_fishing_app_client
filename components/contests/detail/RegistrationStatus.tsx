import {Button} from "@/components/ui/Button";
import {ContestResponse, ContestStatus} from '@/types/contest';
import {formatContestStatus} from "@/utils/formatters";

interface RegistrationStatusProps {
    contest: ContestResponse;
    onRegister: () => void;
}

export function RegistrationStatus({contest, onRegister}: RegistrationStatusProps) {
    const getStatusLabel = (status: ContestStatus) => {
        return formatContestStatus(status);
    };

    const getStatusMessage = () => {
        if (contest.isRegistered) {
            return (
                <div className="text-center space-y-2">
                    <div className="text-green-600 dark:text-green-400 font-medium">
                        You are registered for this contest
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check your email for registration details
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Status: {getStatusLabel(contest.status)}
                    </p>
                </div>
            );
        }

        switch (contest.status) {
            case ContestStatus.UPCOMING:
                return (
                    <div className="text-center space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            Spots remaining: {contest.maxParticipants - contest.currentParticipants}
                        </p>
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={onRegister}
                            disabled={contest.currentParticipants >= contest.maxParticipants}
                        >
                            {contest.currentParticipants >= contest.maxParticipants
                                ? 'Fully Booked'
                                : 'Register Now'}
                        </Button>
                    </div>
                );
            case ContestStatus.IN_PROGRESS:
                return (
                    <div className="text-center text-yellow-600 dark:text-yellow-400">
                        This contest is currently in progress
                    </div>
                );
            case ContestStatus.COMPLETED:
                return (
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        This contest has ended
                    </div>
                );
            default:
                return (
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        Registration status unavailable
                    </div>
                );
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Registration Status
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
                {getStatusMessage()}
            </div>
        </div>
    );
}