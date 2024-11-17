'use client';

import {useRouter} from 'next/navigation';
import {Card} from "@/components/ui/Card";
import {PermitForm} from '@/components/permits/PermitForm';
import {usePermitApplication} from '@/hooks/permit/usePermitApplication';

export default function ApplyPermitPage() {
    const {
        user,
        formData,
        setFormData,
        loading,
        error,
        handleSubmit
    } = usePermitApplication();

    const router = useRouter();

    if (!user) {
        router.push('/auth/login');
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Apply for Fishing Permit
                    </h1>

                    {error && (
                        <div
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                            {error}
                        </div>
                    )}

                    <PermitForm
                        formData={formData}
                        loading={loading}
                        onSubmit={handleSubmit}
                        onChange={setFormData}
                    />
                </div>
            </Card>
        </div>
    );
}