import {fetchApi} from './config';
import {
    ContestRequest,
    ContestResponse,
    RegistrationResponse
} from '@/types/contest';

export const contestApi = {
    create: async (contest: ContestRequest) => {
        return await fetchApi<ContestResponse>('/api/contests', {
            method: 'POST',
            body: JSON.stringify(contest),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    getUpcoming: async () => {
        return await fetchApi<ContestResponse[]>('/api/contests/upcoming');
    },

    getOngoing: async () => {
        return await fetchApi<ContestResponse[]>('/api/contests/ongoing');
    },

    register: async (contestId: number) => {
        return await fetchApi<RegistrationResponse>(`/api/contests/${contestId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    getAllContests: async () => {
        return await fetchApi<ContestResponse[]>('/api/contests');
    },

    getUserRegistrations: async () => {
        return await fetchApi<RegistrationResponse[]>('/api/contests/registrations');
    },

    cancelRegistration: async (registrationId: number) => {
        return await fetchApi<void>(`/api/contests/registrations/${registrationId}/cancel`, {
            method: 'POST'
        });
    },

    getContestById: async (contestId: number) => {
        return await fetchApi<ContestResponse>(`/api/contests/${contestId}`);
    }
};