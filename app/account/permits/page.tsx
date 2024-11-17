'use client';

import {useState} from 'react';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import Link from 'next/link';
import {PermitCard} from '@/components/permits/PermitCard';
import {usePermits} from '@/hooks/usePermits';
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export default function PermitsPage() {
    const {permits, loading, error, loadPermits, downloadPermit} = usePermits();
    const [selectedStatus, setSelectedStatus] = useState<'active' | 'expired' | 'all'>('active');

    const currentDate = new Date();
    const filteredPermits = permits.filter(permit => {
        const endDate = new Date(permit.endDate);
        const isExpired = endDate < currentDate;

        switch (selectedStatus) {
            case 'active':
                return !isExpired && permit.status === 'APPROVED';
            case 'expired':
                return isExpired || permit.status === 'EXPIRED';
            default:
                return true;
        }
    });

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Permits
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        View and manage your fishing permits
                    </p>
                </div>
                <div className="flex space-x-4">
                    <Button variant="outline" onClick={loadPermits}>
                        Refresh
                    </Button>
                    <Link href="/permits">
                        <Button variant="primary">
                            Apply for Permit
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 border-b dark:border-dark-border">
                {(['active', 'expired', 'all'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-4 py-2 border-b-2 transition-colors ${
                            selectedStatus === status
                                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)} Permits
                    </button>
                ))}
            </div>

            {/* Permits List */}
            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <Button variant="outline" onClick={loadPermits}>
                        Retry
                    </Button>
                </div>
            ) : filteredPermits.length === 0 ? (
                <Card className="bg-white dark:bg-dark-card border dark:border-dark-border p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedStatus === 'active'
                            ? "You don't have any active permits."
                            : selectedStatus === 'expired'
                                ? "You don't have any expired permits."
                                : "You haven't applied for any permits yet."}
                    </p>
                    <Link href="/permits">
                        <Button variant="primary">
                            Apply for Permit
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPermits.map((permit) => (
                        <PermitCard
                            key={permit.id}
                            permit={permit}
                            onDownload={downloadPermit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}