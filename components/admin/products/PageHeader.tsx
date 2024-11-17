import Link from "next/link";
import {Button} from "@/components/ui/Button";

export function PageHeader() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Product Management
            </h1>
            <div className="flex items-center space-x-4">
                <Link href="/admin/products/categories">
                    <Button variant="outline">
                        Manage Categories
                    </Button>
                </Link>
                <Link href="/admin/products/add">
                    <Button variant="primary">
                        Add Product
                    </Button>
                </Link>
            </div>
        </div>
    );
}