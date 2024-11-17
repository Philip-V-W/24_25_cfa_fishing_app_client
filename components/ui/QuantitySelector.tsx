'use client';

import {Button} from '@/components/ui/Button';

interface QuantitySelectorProps {
    value: number;
    max: number;
    onChange: (value: number) => void;
    min?: number;
}

export function QuantitySelector({
                                     value,
                                     max,
                                     onChange,
                                     min = 1
                                 }: QuantitySelectorProps) {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                onClick={handleDecrement}
                disabled={value <= min}
                className="h-8 w-8 flex items-center justify-center"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
            </Button>

            <span className="w-12 text-center text-sm">
                {value}
            </span>

            <Button
                variant="outline"
                onClick={handleIncrement}
                disabled={value >= max}
                className="h-8 w-8 flex items-center justify-center"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
            </Button>
        </div>
    );
}