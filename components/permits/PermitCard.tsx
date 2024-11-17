'use client';

import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import type {PermitResponse, PermitStatus, PermitType} from '@/types/permit';

const PermitStatusColors: Record<PermitStatus, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
};

const PermitTypeDescriptions: Record<PermitType, string> = {
    DAILY: '1 Day Permit',
    WEEKLY: '7 Day Permit',
    MONTHLY: '30 Day Permit',
    ANNUAL: 'Annual Permit',
    LIFETIME: 'Lifetime Permit'
};

interface PermitCardProps {
    permit: PermitResponse;
    onDownload: (permitId: number) => Promise<void>;
}

export function PermitCard({permit, onDownload}: PermitCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {PermitTypeDescriptions[permit.permitType]}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Permit #{permit.permitNumber}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${PermitStatusColors[permit.status]}`}>
                        {permit.status}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Valid From:</span>
                        <span className="text-gray-900 dark:text-white">
                            {new Date(permit.startDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                        <span className="text-gray-900 dark:text-white">
                            {new Date(permit.endDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Price:</span>
                        <span className="text-gray-900 dark:text-white">
                            ${permit.price}
                        </span>
                    </div>
                </div>

                {permit.notes && (
                    <div className="pt-4 border-t dark:border-dark-border">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {permit.notes}
                        </p>
                    </div>
                )}

                {permit.status === 'APPROVED' && (
                    <div className="pt-4 flex justify-end">
                        <Button
                            variant="outline"
                            onClick={() => onDownload(permit.id)}
                        >
                            Download Permit
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}