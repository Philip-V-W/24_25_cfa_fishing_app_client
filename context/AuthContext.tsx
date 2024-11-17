'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthResponse {
    token: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN';
}

interface User {
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'CUSTOMER' | 'ADMIN';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        const validateAndSetUser = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            const email = localStorage.getItem('userEmail');
            const storedRole = localStorage.getItem('userRole');
            console.log('Auth state check:', { email, role: storedRole });

            if (email && storedRole && (storedRole === 'CUSTOMER' || storedRole === 'ADMIN')) {
                setUser({
                    email,
                    role: storedRole as 'CUSTOMER' | 'ADMIN'
                });
            } else {
                // Invalid state - clear everything
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userRole');
                setUser(null);
            }
            setIsLoading(false);
        };

        validateAndSetUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            console.log('Login response:', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userRole', data.role);
            document.cookie = `token=${data.token}; path=/`;

            setUser({
                email: data.email,
                role: data.role
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}