import {Card} from '@/components/ui/Card';

interface StatusToggleProps {
    value: boolean;
    onChange: (showInactive: boolean) => void;
}

export function StatusToggle({value, onChange}: StatusToggleProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-4 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Inactive Products
                </label>
                <button
                    onClick={() => onChange(!value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full
                        ${value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                            ${value ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                </button>
            </div>
        </Card>
    );
}