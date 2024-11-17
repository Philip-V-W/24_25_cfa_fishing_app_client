export const API_URL = 'http://localhost:8080';

export const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<T | null> => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
            credentials: 'include'
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        if (response.status === 204) {
            return null;
        }

        const text = await response.text();
        return text ? JSON.parse(text) : null;

    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};