'use client';

import Link from 'next/link';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import type {UserProfile} from '@/types/account';

interface RecentActivityProps {
    profile: UserProfile;
}

export function RecentActivity({profile}: RecentActivityProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Recent Activity
                </h2>
                <div className="space-y-6">
                    {/* Recent Orders */}
                    {profile.recentOrders.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Latest Orders
                            </h3>
                            <div className="space-y-4">
                                {profile.recentOrders.slice(0, 3).map((order) => (
                                    // TODO: fix link
                                    // <Link
                                    //     key={order.id}
                                    //     href={`/account/orders/${order.id}`}
                                    //     className="block"
                                    // >
                                        <div
                                            className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-dark-bg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    Order #{order.id}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(order.orderDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-primary-600 dark:text-primary-400">
                                                    ${order.totalAmount}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {order.itemCount} items
                                                </p>
                                            </div>
                                        </div>
                                    // </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Show more link */}
                    <div className="flex justify-end">
                        <Link href="/account/orders">
                            <Button variant="outline">
                                View All Activity
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}