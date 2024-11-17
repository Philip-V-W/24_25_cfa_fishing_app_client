'use client';

import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import type {UserProfile} from '@/types/account';

interface ProfileSectionProps {
    profile: UserProfile;
    onEdit: () => void;
}

export function ProfileSection({profile, onEdit}: ProfileSectionProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Profile Information
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                First Name
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">
                                {profile.firstName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Last Name
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">
                                {profile.lastName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">
                                {profile.email}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">
                                {profile.phoneNumber || 'Not provided'}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={onEdit}>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}