import {ContestResponse} from '@/types/contest';
import {ContestCard} from '@/components/contests/ContestCard';

interface ContestSectionProps {
    title: string;
    contests: ContestResponse[];
    loading: boolean;
    error?: string | null;
}

export function ContestSection({title, contests, loading, error}: ContestSectionProps) {
    if (contests.length === 0 && !loading && !error) {
        return null;
    }

    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h2>
            </div>
            {loading ? (
                <div className="text-center py-12">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"/>
                </div>
            ) : error ? (
                <div className="text-center py-12 text-red-500 dark:text-red-400">
                    {error}
                </div>
            ) : (
                <ContestCard contests={contests}/>
            )}
        </section>
    );
}