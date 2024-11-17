import {useState, useEffect} from 'react';
import {accountApi} from '@/lib/api/account';
import type {UserProfile, UserProfileUpdateRequest} from '@/types/account';

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await accountApi.getProfile();
            setProfile(data);
            setError(null);
        } catch (err) {
            setError('Failed to load profile');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updatedProfile: UserProfileUpdateRequest) => {
        try {
            await accountApi.updateProfile(updatedProfile);
            await loadProfile();
        } catch (err) {
            console.error('Update failed:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        loadProfile,
        updateProfile
    };
}