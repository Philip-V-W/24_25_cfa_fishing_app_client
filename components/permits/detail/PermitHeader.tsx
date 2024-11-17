import {PermitStatus} from '@/types/permit';

interface PermitHeaderProps {
    permitNumber: string;
    status: PermitStatus;
}

export function PermitHeader({permitNumber, status}: PermitHeaderProps) {
    const getStatusColor = (status: PermitStatus) => {
        const colors = {
            [PermitStatus.APPROVED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            [PermitStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            [PermitStatus.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            [PermitStatus.EXPIRED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        };
        return colors[status] || colors[PermitStatus.EXPIRED];
    };

    return (
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Fishing Permit
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Permit #{permitNumber}
                </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status}
            </span>
        </div>
    );
}