'use client';

import {useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {permitApi} from '@/lib/api/permits';
import {PermitRequest, PermitType} from '@/types/permit';

export function usePermitApplication() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const defaultType = searchParams.get('type') as PermitType || PermitType.DAILY;

    const [formData, setFormData] = useState<{
        permitType: PermitType;
        startDate: string;
        notes: string;
    }>({
        permitType: defaultType,
        startDate: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            router.push('/auth/login');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const request: PermitRequest = {
                permitType: formData.permitType,
                startDate: formData.startDate,
                notes: formData.notes,
            };

            await permitApi.create(request);
            router.push('/permits/apply/success');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to apply for permit');
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        formData,
        setFormData,
        loading,
        error,
        handleSubmit
    };
}