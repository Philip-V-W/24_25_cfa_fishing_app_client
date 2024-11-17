'use client';

import {useEffect} from 'react';
import {Card} from '@/components/ui/Card';
import {createPortal} from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({isOpen, onClose, title, children}: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="min-h-full flex items-center justify-center p-4">
                <div className="relative z-50 w-full max-w-md">
                    <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b dark:border-dark-border">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 dark:text-gray-500
                                         dark:hover:text-gray-400 transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {children}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    // Use createPortal to render the modal at the end of the document body
    return createPortal(modalContent, document.body);
}