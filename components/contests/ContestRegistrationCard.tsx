'use client';

import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import Link from 'next/link';
import {RegistrationResponse, RegistrationStatus} from '@/types/contest';

const RegistrationStatusColors: Record<string, string> = {
    'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'CONFIRMED': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'CANCELLED': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

interface ContestRegistrationCardProps {
    registration: RegistrationResponse;
    onCancel: (id: number) => Promise<void>;
}

export function ContestRegistrationCard({registration, onCancel}: ContestRegistrationCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {registration.contestName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Registration #{registration.participantNumber}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${RegistrationStatusColors[registration.status]}`}>
                        {registration.status}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Contest Name:</span>
                        <span className="text-gray-900 dark:text-white">
                            {registration.contestName}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Registered:</span>
                        <span className="text-gray-900 dark:text-white">
                            {new Date(registration.registrationDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="pt-4 border-t dark:border-dark-border flex justify-end space-x-4">
                    <Link href={`/contests/${registration.id}`}>
                        <Button variant="outline">
                            View Contest
                        </Button>
                    </Link>
                    {registration.status === RegistrationStatus.CONFIRMED && (
                        <Button
                            variant="outline"
                            className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400"
                            onClick={() => {
                                if (confirm('Are you sure you want to cancel your registration?')) {
                                    onCancel(registration.id);
                                }
                            }}
                        >
                            Cancel Registration
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}