'use client';

import Link from 'next/link';
import {Card} from "@/components/ui/Card";

interface StatCardProps {
    title: string;
    count: number;
    subtitle: string;
    href: string;
}

export function StatCard({title, count, subtitle, href}: StatCardProps) {
    return (
        <Link href={href}>
            <Card
                className="bg-white dark:bg-dark-card border dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {count}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
                </div>
            </Card>
        </Link>
    );
}