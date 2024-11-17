'use client';

import Link from 'next/link';
import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {PermitType, PermitTypeDescriptions} from '@/types/permit';

const permitTypes = [
    {
        type: PermitType.DAILY,
        price: 15,
        description: 'Perfect for a day trip',
        features: ['Valid for 24 hours', 'All species included', 'Immediate start possible']
    },
    {
        type: PermitType.WEEKLY,
        price: 45,
        description: 'Ideal for vacations',
        features: ['Valid for 7 days', 'All species included', 'Best value for short trips']
    },
    {
        type: PermitType.MONTHLY,
        price: 90,
        description: 'Regular fisherman\'s choice',
        features: ['Valid for 30 days', 'All species included', 'Perfect for frequent fishing']
    },
    {
        type: PermitType.ANNUAL,
        price: 250,
        description: 'For dedicated anglers',
        features: ['Valid for 365 days', 'All species included', 'Best value for regular use']
    }
];

export function PermitTypeGrid() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Choose Your Permit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {permitTypes.map((permit) => (
                    <Card
                        key={permit.type}
                        className="bg-white dark:bg-dark-card border dark:border-dark-border flex flex-col"
                    >
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {PermitTypeDescriptions[permit.type]}
                            </h3>
                            <div className="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-400">
                                ${permit.price}
                            </div>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                {permit.description}
                            </p>
                            <ul className="mt-4 space-y-2 flex-1">
                                {permit.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                                        <svg className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`/permits/apply?type=${permit.type}`}
                                className="mt-6 block"
                            >
                                <Button variant="primary" className="w-full">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}