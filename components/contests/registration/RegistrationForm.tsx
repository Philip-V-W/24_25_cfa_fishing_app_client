import Link from 'next/link';
import {Button} from '@/components/ui/Button';
import {ContestRules} from './ContestRules';

interface RegistrationFormProps {
    contestId: string;
    submitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export function RegistrationForm({
                                     contestId,
                                     submitting,
                                     onSubmit
                                 }: RegistrationFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <ContestRules/>

            <div className="flex items-center justify-end space-x-4 pt-6">
                <Link href={`/contests/${contestId}`}>
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </Link>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                    className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                    {submitting ? 'Registering...' : 'Confirm Registration'}
                </Button>
            </div>
        </form>
    );
}