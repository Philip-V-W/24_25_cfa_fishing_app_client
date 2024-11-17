'use client';

import {use} from 'react';
import {Card} from "@/components/ui/Card";
import {RegistrationForm} from '@/components/contests/registration/RegistrationForm';
import {useRegisterContest} from '@/hooks/useRegisterContest';

interface Props {
    params: Promise<{ id: string }>;
}

export default function ContestRegistrationPage({params}: Props) {
    const resolvedParams = use(params);
    const {user, submitting, error, register} = useRegisterContest(resolvedParams.id);

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Contest Registration Confirmation
                    </h1>

                    {error && (
                        <div
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                            {error}
                        </div>
                    )}

                    <RegistrationForm
                        contestId={resolvedParams.id}
                        submitting={submitting}
                        onSubmit={register}
                    />
                </div>
            </Card>
        </div>
    );
}