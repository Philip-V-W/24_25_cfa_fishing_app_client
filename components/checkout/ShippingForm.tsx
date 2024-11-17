'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/Button';
import {accountApi} from '@/lib/api/account';
import type {Address} from '@/types/account';

interface ShippingFormProps {
    onAddressSelect: (address: Address) => void;
    selectedAddress: Address | null;
}

export function ShippingForm({onAddressSelect, selectedAddress}: ShippingFormProps) {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const userAddresses = await accountApi.getAddresses();
            setAddresses(userAddresses);
            if (userAddresses.length > 0 && !selectedAddress) {
                onAddressSelect(userAddresses.find((addr: Address) => addr.isDefault) || userAddresses[0]);
            }
        } catch (err) {
            setError('Failed to load addresses');
            console.error('Error loading addresses:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 dark:text-red-400 text-center py-4">
                {error}
            </div>
        );
    }

    return (
        <div>
            {addresses.length > 0 && (
                <div className="space-y-4">
                    {addresses.map((address) => (
                        <label
                            key={address.id}
                            className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors
                                ${selectedAddress?.id === address.id
                                ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/10'
                                : 'border-gray-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700'}`}
                        >
                            <input
                                type="radio"
                                name="shipping-address"
                                value={address.id}
                                checked={selectedAddress?.id === address.id}
                                onChange={() => onAddressSelect(address)}
                                className="h-4 w-4 text-primary-600 dark:text-primary-400
                                          border-gray-300 dark:border-gray-600
                                          focus:ring-primary-500 dark:focus:ring-primary-400"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-gray-900 dark:text-white font-medium">
                                    {address.streetAddress}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {address.city}, {address.state} {address.postalCode}
                                </div>
                                {address.isDefault && (
                                    <div className="mt-1 text-xs text-primary-600 dark:text-primary-400">
                                        Default Address
                                    </div>
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            )}

            <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
            >
                {showNewAddressForm ? 'Cancel' : 'Add New Address'}
            </Button>

            {showNewAddressForm && (
                <div className="mt-4 p-4 border dark:border-dark-border rounded-lg">
                    {/* Add your NewAddressForm component here */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Address form will be implemented here
                    </div>
                </div>
            )}

            {addresses.length === 0 && !showNewAddressForm && (
                <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No shipping addresses found. Please add an address to continue.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => setShowNewAddressForm(true)}
                    >
                        Add Address
                    </Button>
                </div>
            )}
        </div>
    );
}