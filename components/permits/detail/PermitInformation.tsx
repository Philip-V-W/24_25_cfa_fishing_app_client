import {PermitResponse} from '@/types/permit';

interface PermitInformationProps {
    permit: PermitResponse;
}

export function PermitInformation({permit}: PermitInformationProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Permit Information
            </h2>
            <div className="space-y-2">
                <div className="flex">
                    <span className="mr-2 text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                        {permit.permitType}
                    </span>
                </div>
            </div>
        </div>
    );
}