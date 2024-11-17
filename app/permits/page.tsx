'use client';

import { PermitHero } from '@/components/permits/PermitHero';
import { PermitTypeGrid } from '@/components/permits/PermitTypeGrid';
import { UserPermits } from '@/components/permits/UserPermits';
import { PermitInformation } from '@/components/permits/PermitInformation';
import { useUserPermits } from '@/hooks/permit/useUserPermits';

export default function PermitsPage() {
    const { permits, loading, error, user } = useUserPermits();

    return (
        <div className="space-y-16">
            <PermitHero />
            <PermitTypeGrid />
            {user && (
                <UserPermits
                    permits={permits}
                    loading={loading}
                    error={error}
                />
            )}
            <PermitInformation />
        </div>
    );
}