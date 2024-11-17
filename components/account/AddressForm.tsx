import type {Address, AddressRequest} from "@/types/account";
import {useState} from "react";
import {Button} from "@/components/ui/Button";

interface AddressFormProps {
    address?: Address;
    onSubmit: (data: AddressRequest) => Promise<void>;
    onCancel: () => void;
}

export function AddressForm({address, onSubmit, onCancel}: AddressFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const data: AddressRequest = {
                streetAddress: formData.get('streetAddress') as string,
                city: formData.get('city') as string,
                state: formData.get('state') as string,
                postalCode: formData.get('postalCode') as string,
                country: formData.get('country') as string,
                isDefault: formData.get('isDefault') === 'true' || formData.get('isDefault') === 'on'
            };

            await onSubmit(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save address');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {address ? 'Edit Address' : 'Add New Address'}
            </h2>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Street Address
                    </label>
                    <input
                        name="streetAddress"
                        defaultValue={address?.streetAddress}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                               bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                               focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            City
                        </label>
                        <input
                            name="city"
                            defaultValue={address?.city}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                                   bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                                   focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State
                        </label>
                        <input
                            name="state"
                            defaultValue={address?.state}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                                   bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                                   focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            defaultValue={address?.postalCode}
                            required
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
           bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
           focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Country
                        </label>
                        <input
                            name="country"
                            defaultValue={address?.country}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                                   bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                                   focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        defaultChecked={address?.isDefault}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500
                               border-gray-300 rounded"
                    />
                    <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Set as default address
                    </label>
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
                    {loading ? 'Saving...' : 'Save Address'}
                </Button>
            </div>
        </form>
    );
}