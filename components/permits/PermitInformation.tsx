'use client';

export function PermitInformation() {
    return (
        <section className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Important Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Permit Rules
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Permits must be carried while fishing
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Non-transferable between individuals
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Must comply with local fishing regulations
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Subject to inspection by authorities
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Processing Information
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Applications processed within 24 hours
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Digital permit sent via email
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Payment required upon approval
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Support available for questions
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}