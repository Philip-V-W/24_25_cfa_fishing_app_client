import {Button} from "@/components/ui/Button";

interface OrderHeaderProps {
    totalOrders: number;
    onRefresh: () => void;
}

export function OrderHeader({totalOrders, onRefresh}: OrderHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order Management
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400">
                    Total Orders: {totalOrders}
                </span>
                <Button variant="outline" onClick={onRefresh}>
                    Refresh
                </Button>
            </div>
        </div>
    );
}