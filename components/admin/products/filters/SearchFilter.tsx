import {Card} from "@/components/ui/Card";

export function SearchFilter({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Products
                </label>
                <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                             focus:border-primary-500 focus:ring-primary-500"
                />
            </div>
        </Card>
    );
}