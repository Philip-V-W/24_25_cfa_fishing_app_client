'use client';

import {useEffect, useState} from 'react';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {AddressCard} from "@/components/account/AddressCard";
import {AddressForm} from "@/components/account/AddressForm";
import {useAddresses} from "@/hooks/useAddresses";
import type {Address, AddressRequest} from '@/types/account';
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export default function AddressesPage() {
    const [isClient, setIsClient] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | undefined>();

    const {
        addresses,
        loading,
        error,
        loadAddresses,
        updateAddress,
        createAddress,
        setDefaultAddress,
        deleteAddress
    } = useAddresses();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (data: AddressRequest) => {
        try {
            if (editingAddress) {
                await updateAddress(editingAddress.id, data);
            } else {
                await createAddress(data);
            }
            setShowAddModal(false);
            setEditingAddress(undefined);
            await loadAddresses();
        } catch (err) {
            console.error('Failed to save address:', err);
        }
    };

    if (!isClient) {
        return null;
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Addresses
                    </h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add New Address
                    </Button>
                </div>

                {/* Addresses Grid */}
                {error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                        <Button variant="outline" onClick={loadAddresses}>
                            Retry
                        </Button>
                    </div>
                ) : addresses.length === 0 ? (
                    <Card className="bg-white dark:bg-dark-card border dark:border-dark-border p-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            You haven't added any addresses yet.
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => setShowAddModal(true)}
                        >
                            Add Your First Address
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                onSetDefault={setDefaultAddress}
                                onEdit={setEditingAddress}
                                onDelete={deleteAddress}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Overlay */}
            {(showAddModal || editingAddress) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
                    <div className="relative z-[70] w-full max-w-md">
                        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                            <AddressForm
                                address={editingAddress}
                                onSubmit={handleSubmit}
                                onCancel={() => {
                                    setShowAddModal(false);
                                    setEditingAddress(undefined);
                                }}
                            />
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}