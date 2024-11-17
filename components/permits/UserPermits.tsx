'use client';

import {Card} from '@/components/ui/Card';
import {PermitResponse, PermitStatus, PermitTypeDescriptions} from '@/types/permit';
import Link from "next/link";

interface UserPermitsProps {
    permits: PermitResponse[];
    loading: boolean;
    error: string | null;
}

export function UserPermits({permits, loading, error}: UserPermitsProps) {
    const getStatusColor = (status: PermitStatus) => {
        switch (status) {
            case PermitStatus.APPROVED:
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case PermitStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case PermitStatus.REJECTED:
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case PermitStatus.EXPIRED:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-dark-card px-4 py-12 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl px-5 font-bold text-gray-900 dark:text-white">
                    Your Permits
                </h2>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"/>
                </div>
            ) : error ? (
                <div className="text-center py-12 text-red-500 dark:text-red-400">
                    {error}
                </div>
            ) : permits.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                        You don't have any permits yet.
                    </p>
                </div>
            ) : (
                <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {permits.map((permit) => (
                        <Link key={permit.id} href={`/permits/${permit.id}`} className="block">
                            <Card
                                key={permit.id}
                                className="bg-white dark:bg-dark-card border dark:border-dark-border"
                            >
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {PermitTypeDescriptions[permit.permitType]}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Permit #{permit.permitNumber}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(permit.status)}`}>
                                        {permit.status}
                                    </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">Start Date:</span>
                                            <span className="text-gray-900 dark:text-white">
                                            {new Date(permit.startDate).toLocaleDateString()}
                                        </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">End Date:</span>
                                            <span className="text-gray-900 dark:text-white">
                                            {new Date(permit.endDate).toLocaleDateString()}
                                        </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">Price:</span>
                                            <span className="text-gray-900 dark:text-white">
                                            ${permit.price}
                                        </span>
                                        </div>
                                    </div>

                                    {permit.notes && (
                                        <p className="text-sm italic text-gray-500 dark:text-gray-400 border-t dark:border-dark-border pt-4">
                                            Note: {permit.notes}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
