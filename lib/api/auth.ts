import {fetchApi} from './config';
import {LoginRequest, RegisterRequest} from "@/types/auth";

export const authApi = {
    login: async (credentials: LoginRequest) => {
        return await fetchApi('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        });
    },

    register: async (userData: RegisterRequest) => {
        return await fetchApi('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {'Content-Type': 'application/json'}
        });
    },

    resetPassword: async (data: { email: string }) => {
        return await fetchApi('/api/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    }
};