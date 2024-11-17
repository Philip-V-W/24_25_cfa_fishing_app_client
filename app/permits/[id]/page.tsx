'use client';

import {use} from 'react';
import Link from "next/link";
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {PermitHeader} from '@/components/permits/detail/PermitHeader';
import {PermitInformation} from '@/components/permits/detail/PermitInformation';
import {PermitStatusInfo} from '@/components/permits/detail/PermitStatus';
import {usePermitDetail} from '@/hooks/permit/usePermitDetail';
import {PermitStatus} from "@/types/permit";

interface Props {
    params: Promise<{ id: string }>;
}

export default function PermitDetailPage({params}: Props) {
    const resolvedParams = use(params);
    const {permit, loading, error} = usePermitDetail(resolvedParams.id);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error || !permit) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {error || 'Permit not found'}
                </h2>
                <Link href="/permits">
                    <Button variant="outline">Back to Permits</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border overflow-hidden">
                <div className="p-6 space-y-8">
                    <PermitHeader
                        permitNumber={permit.permitNumber}
                        status={permit.status}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PermitInformation permit={permit}/>
                        {/*<PermitStatusInfo permit={permit}/>*/}
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t dark:border-dark-border flex justify-between items-center">
                        <Link href="/permits">
                            <Button variant="outline">Back to Permits</Button>
                        </Link>
                        {permit.status === PermitStatus.APPROVED && (
                            <Button variant="primary">Download Permit</Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}