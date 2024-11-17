import {Button} from '@/components/ui/Button';
import Link from 'next/link';

interface PageHeaderProps {
    onAddCategory: () => void;
}

export function PageHeader({onAddCategory}: PageHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Product Categories
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your product categories and view their performance
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="/admin/products">
                    <Button variant="outline">
                        Back to Products
                    </Button>
                </Link>
                {/*<Button variant="primary" onClick={onAddCategory}>*/}
                {/*    Add Category*/}
                {/*</Button>*/}
            </div>
        </div>
    );
}