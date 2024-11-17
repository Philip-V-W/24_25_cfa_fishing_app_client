import {ContestResponse, ContestStatus} from "@/types/contest";
import {Card} from "@/components/ui/Card";
import Link from "next/link";
import {Button} from "@/components/ui/Button";

export function ContestCard({contests}: { contests: ContestResponse[] }) {
    const getButtonConfig = (
        contestStatus: ContestStatus,
    ) => {

        switch (contestStatus) {
            case ContestStatus.UPCOMING:
                return {
                    text: "Register Now",
                    disabled: false,
                    variant: "primary" as const,
                    className: ""
                };
            case ContestStatus.IN_PROGRESS:
                return {
                    text: "In Progress",
                    disabled: true,
                    variant: "outline" as const,
                    className: "text-yellow-600 dark:text-yellow-400"
                };
            case ContestStatus.COMPLETED:
                return {
                    text: "Completed",
                    disabled: true,
                    variant: "outline" as const,
                    className: "text-gray-600 dark:text-gray-400"
                };
            case ContestStatus.CANCELLED:
                return {
                    text: "Cancelled",
                    disabled: true,
                    variant: "outline" as const,
                    className: "text-red-600 dark:text-red-400"
                };
            default:
                return {
                    text: "Unavailable",
                    disabled: true,
                    variant: "outline" as const,
                    className: "text-gray-600 dark:text-gray-400"
                };
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => {
                const buttonConfig = getButtonConfig(contest.status);

                return (
                    <Card key={contest.id}
                          className="overflow-hidden bg-white dark:bg-dark-card border dark:border-dark-border">
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {contest.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {contest.description}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                                    <span className="text-gray-900 dark:text-gray-200">
                                        {new Date(contest.startDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                                    <span className="text-gray-900 dark:text-gray-200">
                                        {new Date(contest.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                    <span className="text-gray-900 dark:text-gray-200">
                                        {contest.location}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Entry Fee:</span>
                                    <span className="text-gray-900 dark:text-gray-200">
                                        ${contest.entryFee}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Spots:</span>
                                    <span className="text-gray-900 dark:text-gray-200">
                                        {contest.currentParticipants}/{contest.maxParticipants}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Link href={`/contests/${contest.id}`}>
                                    <Button
                                        variant={buttonConfig.variant}
                                        disabled={buttonConfig.disabled}
                                        className={buttonConfig.className}
                                    >
                                        {buttonConfig.text}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}