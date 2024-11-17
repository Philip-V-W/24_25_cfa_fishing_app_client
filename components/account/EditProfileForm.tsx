import type {UserProfileUpdateRequest} from "@/types/account";
import {useState} from "react";
import {Button} from "@/components/ui/Button";

interface EditProfileFormProps {
    profile: UserProfileUpdateRequest;
    onSave: (data: UserProfileUpdateRequest) => Promise<void>;
    onCancel: () => void;
}

export function EditProfileForm({profile, onSave, onCancel}: EditProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const data: UserProfileUpdateRequest = {
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                phoneNumber: formData.get('phoneNumber') as string,
            };

            await onSave(data);
        } catch (err) {
            setError('Failed to save profile');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Profile
            </h2>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        defaultValue={profile.firstName}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                               bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                               focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        defaultValue={profile.lastName}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                               bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                               focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        defaultValue={profile.phoneNumber}
                        required
                        pattern="[0-9]*"
                        inputMode="numeric"
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
               bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
               focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Profile'}
                </Button>
            </div>
        </form>
    );
}