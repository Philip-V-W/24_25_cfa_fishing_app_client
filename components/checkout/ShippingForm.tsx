import {Address} from '@/types/account';

interface ShippingFormProps {
    addresses: Address[];
    selectedAddressId: number | null;
    onAddressSelect: (addressId: number) => void;
}

export function ShippingForm({addresses, selectedAddressId, onAddressSelect}: ShippingFormProps) {
    if (!addresses.length) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-600 dark:text-gray-400">
                    No addresses found. Please add a shipping address.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {addresses.map((address) => (
                <div
                    key={address.id}
                    onClick={() => onAddressSelect(address.id)}
                    className={`
                        p-4 cursor-pointer transition-colors
                        bg-white dark:bg-dark-card
                        border dark:border-dark-border
                        rounded-lg
                        ${
                        selectedAddressId === address.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'hover:border-gray-300 dark:hover:border-gray-600'
                    }
                    `}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-medium">{address.streetAddress}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {address.city}, {address.state} {address.postalCode}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {address.country}
                            </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            {selectedAddressId === address.id && (
                                <span className="text-primary-500">✓</span>
                            )}
                            {address.isDefault && (
                                <span
                                    className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                                    Default
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}