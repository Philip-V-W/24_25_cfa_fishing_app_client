import Link from 'next/link';

export function ContestNotFound() {
    return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contest not found
            </h2>
            <Link
                href="/contests"
                className="text-primary-600 dark:text-primary-400 hover:underline mt-4 inline-block"
            >
                Back to contests
            </Link>
        </div>
    );
}