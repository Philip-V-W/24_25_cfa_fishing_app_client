'use client';

import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import type {Address} from '@/types/account';

interface AddressCardProps {
    address: Address;
    onSetDefault: (id: number) => Promise<void>;
    onEdit: (address: Address) => void;
    onDelete: (id: number) => Promise<void>;
}

export function AddressCard({address, onSetDefault, onEdit, onDelete}: AddressCardProps) {
    return (
        <Card
            key={address.id}
            className={`bg-white dark:bg-dark-card border dark:border-dark-border 
                ${address.isDefault ? 'ring-2 ring-primary-500' : ''}`}
        >
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">
                            {address.streetAddress}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            {address.country}
                        </p>
                    </div>
                    {address.isDefault && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30
                             dark:text-primary-400 text-xs font-medium rounded-full">
                    Default
                </span>
                    )}
                </div>

                <div className="flex justify-end space-x-4">
                    {!address.isDefault && (
                        <Button
                            variant="outline"
                            onClick={() => onSetDefault(address.id)}
                        >
                            Set as Default
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => onEdit(address)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400
                                 hover:bg-red-50 dark:hover:bg-red-900/30"
                        onClick={() => onDelete(address.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );
}