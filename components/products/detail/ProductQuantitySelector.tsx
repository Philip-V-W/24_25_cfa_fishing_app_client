interface ProductQuantitySelectorProps {
    quantity: number;
    maxQuantity: number;
    onQuantityChange: (value: number) => void;
}

export function ProductQuantitySelector({
                                            quantity,
                                            maxQuantity,
                                            onQuantityChange
                                        }: ProductQuantitySelectorProps) {
    return (
        <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-lg">
            <button
                onClick={() => onQuantityChange(quantity - 1)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400
                         hover:text-primary-600 dark:hover:text-primary-400"
                disabled={quantity <= 1}
            >
                -
            </button>
            <input
                type="number"
                min="1"
                max={maxQuantity}
                value={quantity}
                onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center border-x border-gray-300 dark:border-dark-border
                         bg-white dark:bg-dark-card text-gray-900 dark:text-white py-2"
            />
            <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400
                         hover:text-primary-600 dark:hover:text-primary-400"
                disabled={quantity >= maxQuantity}
            >
                +
            </button>
        </div>
    );
}