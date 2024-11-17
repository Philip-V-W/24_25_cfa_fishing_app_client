import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {authApi} from '@/lib/api/auth';
import type {User} from '@/types/user';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await authApi.getCurrentUser();
            setUser(response.user);
        } catch (error) {
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login({email, password});
            localStorage.setItem('token', response.token);
            setUser(response.user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const logout = useCallback(() => {
        authApi.logout();
        setUser(null);
        router.push('/auth/login');
    }, [router]);

    return {user, loading, login, logout};
}