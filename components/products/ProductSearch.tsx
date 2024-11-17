import {Button} from "@/components/ui/Button";

interface ProductSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSearch: () => void;
}

export function ProductSearch({searchTerm, onSearchChange, onSearch}: ProductSearchProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                    className="w-full rounded-lg border border-gray-300 dark:border-dark-border
                           bg-white dark:bg-dark-card px-4 py-2 text-gray-900 dark:text-white"
                />
            </div>
            <Button variant="primary" onClick={onSearch}>
                Search
            </Button>
        </div>
    );
}
