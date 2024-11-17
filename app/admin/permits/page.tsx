'use client';

import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {Button} from '@/components/ui/Button';
import {PermitHeader} from '@/components/admin/permits/PermitHeader';
import {PermitFilters} from '@/components/admin/permits/PermitFilters';
import {PermitsList} from '@/components/admin/permits/PermitsList';
import {RejectionModal} from '@/components/admin/permits/RejectionModal';
import {useAdminPermits} from '@/hooks/admin/useAdminPermits';
import {usePermitRejection} from '@/hooks/admin/usePermitRejection';

export default function AdminPermitsPage() {
    const {
        permits,
        totalPermits,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        loadPermits,
        handleApprove
    } = useAdminPermits();

    const {
        showModal,
        selectedPermit,
        rejectionReason,
        setRejectionReason,
        handleReject,
        handleCloseModal,
        handleOpenModal
    } = usePermitRejection(loadPermits);

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="space-y-8">
            <PermitHeader
                totalPermits={totalPermits}
                onRefresh={loadPermits}
            />

            <PermitFilters
                currentFilter={filterStatus}
                onFilterChange={setFilterStatus}
            />

            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={loadPermits}>
                        Retry
                    </Button>
                </div>
            ) : (
                <PermitsList
                    permits={permits}
                    onApprove={handleApprove}
                    onRejectClick={handleOpenModal}
                />
            )}

            <RejectionModal
                isOpen={showModal}
                permit={selectedPermit}
                reason={rejectionReason}
                onReasonChange={setRejectionReason}
                onConfirm={() => selectedPermit && handleReject(selectedPermit.id)}
                onClose={handleCloseModal}
            />
        </div>
    );
}