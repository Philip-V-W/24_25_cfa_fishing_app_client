// components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', children, onClick, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`bg-white dark:bg-dark-card border dark:border-dark-border rounded-lg ${className}`}
                onClick={onClick}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';