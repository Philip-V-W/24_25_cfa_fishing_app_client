'use client';

import {useState} from 'react';
import {Button} from "@/components/ui/Button";
import {StatCard} from '@/components/account/StatCard';
import {ProfileSection} from '@/components/account/ProfileSection';
import {RecentActivity} from '@/components/account/RecentActivity';
import {EditProfileForm} from '@/components/account/EditProfileForm';
import {useProfile} from '@/hooks/useProfile';
import {Card} from "@/components/ui/Card";
import React from "react";
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export default function AccountPage() {
    const {profile, loading, error, loadProfile, updateProfile} = useProfile();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedProfile: any) => {
        try {
            await updateProfile(updatedProfile);
            setIsEditing(false);
            await loadProfile();
        } catch (err) {
            console.error('Failed to save profile:', err);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error || !profile) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 dark:text-red-400 mb-4">{error || 'Profile not found'}</p>
                <Button variant="outline" onClick={loadProfile}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Header Section */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Account
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Welcome back, {profile.firstName}
                    </p>
                </div>
                <Button variant="primary" onClick={loadProfile}>
                    Refresh
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Active Permits"
                    count={profile.activePermits.length}
                    subtitle="Manage permits"
                    href="/account/permits"
                />
                <StatCard
                    title="Upcoming Contests"
                    count={profile.upcomingContests.length}
                    subtitle="View registrations"
                    href="/account/contests"
                />
                <StatCard
                    title="Addresses"
                    count={profile.addresses.length}
                    subtitle="Manage addresses"
                    href="/account/addresses"
                />
            </div>

            {/* Profile Section */}
            {isEditing ? (
                <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                    <EditProfileForm profile={profile} onSave={handleSave} onCancel={handleCancel}/>
                </Card>
            ) : (
                <ProfileSection profile={profile} onEdit={handleEdit}/>
            )}

            {/* Recent Activity Section */}
            <RecentActivity profile={profile}/>
        </div>
    );
}