import {PermitResponse} from '@/types/permit';

interface PermitStatusProps {
    permit: PermitResponse;
}

export function PermitStatusInfo({}: PermitStatusProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Status Information
            </h2>
            {/* TODO: add status information */}
        </div>
    );
}