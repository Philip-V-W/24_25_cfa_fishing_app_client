import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {PermitResponse, PermitStatus, PermitTypeDescriptions} from '@/types/permit';
import {getStatusColor} from '@/utils/permitUtils';

interface PermitCardProps {
    permit: PermitResponse;
    onApprove: (permitId: number) => Promise<void>;
    onRejectClick: (permit: PermitResponse) => void;
}

export function PermitCard({permit, onApprove, onRejectClick}: PermitCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Permit #{permit.permitNumber}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {permit.userEmail}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(permit.status)}`}>
                        {permit.status}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {PermitTypeDescriptions[permit.permitType]}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Valid Period</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(permit.startDate).toLocaleDateString()} - {new Date(permit.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            ${permit.price}
                        </p>
                    </div>
                </div>

                {permit.notes && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white font-medium">Notes:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {permit.notes}
                        </p>
                    </div>
                )}

                {permit.status === PermitStatus.PENDING && (
                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <Button
                            variant="outline"
                            className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400"
                            onClick={() => onRejectClick(permit)}
                        >
                            Reject
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => onApprove(permit.id)}
                        >
                            Approve
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
