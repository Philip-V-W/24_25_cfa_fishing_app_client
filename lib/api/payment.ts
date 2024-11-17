import {fetchApi} from './config';

export const paymentApi = {
    verifyPayment: async (sessionId: string) => {
        try {
            return await fetchApi(`/api/checkout/verify/${sessionId}`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw new Error('Failed to verify payment. Please contact support.');
        }
    }
};