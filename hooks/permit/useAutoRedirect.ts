'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export function useAutoRedirect(path: string, delay: number = 5000) {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(path);
        }, delay);

        return () => clearTimeout(timeout);
    }, [router, path, delay]);

    return Math.ceil(delay / 1000); // Returns seconds for display
}