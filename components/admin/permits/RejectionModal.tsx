import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {PermitResponse} from '@/types/permit';

interface RejectionModalProps {
    isOpen: boolean;
    permit: PermitResponse | null;
    reason: string;
    onReasonChange: (reason: string) => void;
    onConfirm: () => void;
    onClose: () => void;
}

export function RejectionModal({
                                   isOpen,
                                   permit,
                                   reason,
                                   onReasonChange,
                                   onConfirm,
                                   onClose
                               }: RejectionModalProps) {
    if (!isOpen || !permit) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 bg-white dark:bg-dark-card border dark:border-dark-border">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Reject Permit
                    </h3>
                    <textarea
                        className="w-full p-2 border rounded-lg dark:bg-dark-bg dark:border-dark-border"
                        rows={4}
                        placeholder="Enter rejection reason..."
                        value={reason}
                        onChange={(e) => onReasonChange(e.target.value)}
                    />
                    <div className="mt-6 flex justify-end space-x-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={onConfirm}
                            disabled={!reason.trim()}
                        >
                            Confirm Rejection
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}