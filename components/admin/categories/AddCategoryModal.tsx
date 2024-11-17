import {Button} from "@/components/ui/Button";
import {Modal} from "@/components/ui/Modal";
import {Input} from "@/components/ui/Input";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    categoryName: string;
    onCategoryNameChange: (value: string) => void;
    error: string | null;
    loading: boolean;
}

export function AddCategoryModal({
                                     isOpen,
                                     onClose,
                                     onSubmit,
                                     categoryName,
                                     onCategoryNameChange,
                                     error,
                                     loading
                                 }: AddCategoryModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="categoryName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Category Name
                    </label>
                    <Input
                        id="categoryName"
                        type="text"
                        value={categoryName}
                        onChange={(e) => onCategoryNameChange(e.target.value)}
                        placeholder="Enter category name"
                        className="mt-1"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Name will be automatically formatted (e.g., "Fishing Rods" → "FISHING_RODS")
                    </p>
                </div>

                {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Category'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
