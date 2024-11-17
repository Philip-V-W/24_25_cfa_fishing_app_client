'use client';

import {useState, useEffect} from 'react';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import Link from 'next/link';
import {ContestRegistrationCard} from '@/components/contests/ContestRegistrationCard';
import {useContestRegistrations} from '@/hooks/useContestRegistrations';
import {RegistrationResponse} from "@/types/contest";
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export default function ContestsPage() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const {registrations, loading, error, loadRegistrations, cancelRegistration} = useContestRegistrations();
    const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationResponse[]>([]);

    useEffect(() => {
        if (registrations.length > 0) {
            const currentDate = new Date();
            const filtered = registrations.filter(reg => {
                const registrationDate = new Date(reg.registrationDate);
                return activeTab === 'past'
                    ? registrationDate >= currentDate
                    : registrationDate < currentDate;
            });
            setFilteredRegistrations(filtered);
        }
    }, [registrations, activeTab]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Contests
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        View your contest registrations and results
                    </p>
                </div>
                <Link href="/contests">
                    <Button variant="primary">
                        Browse Contests
                    </Button>
                </Link>
            </div>

            <div className="border-b dark:border-dark-border">
                {(['upcoming', 'past'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveTab(status)}
                        className={`px-4 py-2 border-b-2 transition-colors ${
                            activeTab === status
                                ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)} Contests
                    </button>
                ))}
            </div>

            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <Button variant="outline" onClick={loadRegistrations}>
                        Retry
                    </Button>
                </div>
            ) : filteredRegistrations.length === 0 ? (
                <Card className="bg-white dark:bg-dark-card border dark:border-dark-border p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {activeTab === 'upcoming'
                            ? "You haven't registered for any upcoming contests."
                            : "You haven't participated in any contests yet."}
                    </p>
                    <Link href="/contests">
                        <Button variant="primary">
                            Browse Contests
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRegistrations.map((registration) => (
                        <ContestRegistrationCard
                            key={registration.id}
                            registration={registration}
                            onCancel={cancelRegistration}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}