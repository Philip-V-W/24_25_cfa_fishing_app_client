import Link from "next/link";
import {Button} from "@/components/ui/Button";
import {PermitTerms} from './PermitTerms';
import {PermitType, PermitTypeDescriptions} from '@/types/permit';

interface PermitFormProps {
    formData: {
        permitType: PermitType;
        startDate: string;
        notes: string;
    };
    loading: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (formData: any) => void;
}

export function PermitForm({formData, loading, onSubmit, onChange}: PermitFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Permit Type
                </label>
                <select
                    value={formData.permitType}
                    onChange={(e) => onChange({
                        ...formData,
                        permitType: e.target.value as PermitType
                    })}
                    className="w-full rounded-md border border-gray-300 dark:border-dark-border
                           bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                           focus:border-primary-500 focus:ring-primary-500"
                    required
                >
                    {Object.values(PermitType).map((type) => (
                        <option key={type} value={type}>
                            {PermitTypeDescriptions[type]}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                </label>
                <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => onChange({
                        ...formData,
                        startDate: e.target.value
                    })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-md border border-gray-300 dark:border-dark-border
                           bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                           focus:border-primary-500 focus:ring-primary-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes (Optional)
                </label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => onChange({
                        ...formData,
                        notes: e.target.value
                    })}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 dark:border-dark-border
                           bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                           focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Any additional information..."
                />
            </div>

            <PermitTerms/>

            <div className="flex items-center justify-end space-x-4 pt-4">
                <Link href="/permits">
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </Link>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
            </div>
        </form>
    );
}