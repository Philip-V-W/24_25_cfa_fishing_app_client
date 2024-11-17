import { PermitStatus } from '@/types/permit';

export const getStatusColor = (status: PermitStatus) => {
    switch (status) {
        case PermitStatus.PENDING:
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case PermitStatus.APPROVED:
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case PermitStatus.REJECTED:
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        case PermitStatus.EXPIRED:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
};