'use client';

import Link from 'next/link';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {ContestHeader} from '@/components/contests/detail/ContestHeader';
import {ContestDetails} from '@/components/contests/detail/ContestDetails';
import {RegistrationStatus} from '@/components/contests/detail/RegistrationStatus';
import {ContestNotFound} from '@/components/contests/ContestNotFound';
import {useContestPage} from '@/hooks/contest/useContestPage';

interface Props {
    params: Promise<{ id: string }>;
}

export default function ContestDetailPage({params}: Props) {
    const {contest, loading, handleRegisterClick} = useContestPage(params);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (!contest) {
        return <ContestNotFound/>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border overflow-hidden">
                <div className="p-6 space-y-8">
                    <ContestHeader
                        name={contest.name}
                        description={contest.description ?? ''}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContestDetails contest={contest}/>
                        <RegistrationStatus
                            contest={contest}
                            onRegister={handleRegisterClick}
                        />
                    </div>

                    <div className="pt-6 border-t dark:border-dark-border">
                        <Link href="/contests">
                            <Button variant="outline">
                                Back to Contests
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
}