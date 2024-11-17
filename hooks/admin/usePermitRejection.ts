'use client';

import {useState} from 'react';
import {PermitResponse} from '@/types/permit';
import {permitApi} from '@/lib/api/permits';

export function usePermitRejection(onRejectionComplete: () => void) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPermit, setSelectedPermit] = useState<PermitResponse | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleReject = async (permitId: number) => {
        try {
            await permitApi.reject(permitId, rejectionReason);
            handleCloseModal();
            onRejectionComplete();
        } catch (err) {
            console.error('Error rejecting permit:', err);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPermit(null);
        setRejectionReason('');
    };

    const handleOpenModal = (permit: PermitResponse) => {
        setSelectedPermit(permit);
        setShowModal(true);
    };

    return {
        showModal,
        selectedPermit,
        rejectionReason,
        setRejectionReason,
        handleReject,
        handleCloseModal,
        handleOpenModal
    };
}