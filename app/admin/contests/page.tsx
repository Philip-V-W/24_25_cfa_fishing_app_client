'use client';

import {useRouter} from 'next/navigation';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {ContestHeader} from '@/components/admin/contests/ContestHeader';
import {ContestFilters} from '@/components/admin/contests/ContestFilters';
import {ContestsList} from '@/components/admin/contests/ContestsList';
import {ContestError} from '@/components/admin/contests/ContestError';
import {useAdminContests} from '@/hooks/admin/useAdminContests';

export default function AdminContestsPage() {
    const router = useRouter();
    const {
        contests,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        loadContests
    } = useAdminContests();

    const handleCreateContest = () => {
        // TODO: Implement contest creation
        console.log('Create new contest');
    };

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="space-y-8">
            <ContestHeader onCreateClick={handleCreateContest}/>

            <ContestFilters
                currentFilter={filterStatus}
                onFilterChange={setFilterStatus}
            />

            {error ? (
                <ContestError
                    error={error}
                    onRetry={loadContests}
                />
            ) : (
                <ContestsList
                    contests={contests}
                    onContestAction={loadContests}
                />
            )}
        </div>
    );
}