interface OrderShippingProps {
    address: string;
    trackingNumber?: string;
}

export function OrderShipping({address, trackingNumber}: OrderShippingProps) {
    return (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium text-gray-900 dark:text-white">
                Shipping Address:
            </p>
            <p>{address}</p>
            {trackingNumber && (
                <p className="mt-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                        Tracking Number:
                    </span> {trackingNumber}
                </p>
            )}
        </div>
    );
}