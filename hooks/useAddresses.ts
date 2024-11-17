import {useState, useEffect} from 'react';
import {addressApi} from '@/lib/api/addresses';
import type {AddressResponse, AddressRequest} from '@/types/account';
import {accountApi} from "@/lib/api/account";

export function useAddresses() {
    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            const data = await addressApi.getAll();
            if (data) {
                setAddresses(data);
            } else {
                setAddresses([]);
            }
            setError(null);
        } catch (err) {
            setError('Failed to load addresses');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const createAddress = async (address: AddressRequest) => {
        try {
            await addressApi.create(address);
            await loadAddresses();
        } catch (err) {
            console.error('Create failed:', err);
            throw err;
        }
    };

    const updateAddress = async (id: number, address: AddressRequest) => {
        try {
            await addressApi.update(id, address);
            await loadAddresses();
        } catch (err) {
            console.error('Update failed:', err);
            throw err;
        }
    };

    const deleteAddress = async (id: number) => {
        try {
            await accountApi.deleteAddress(id);
            await loadAddresses();
        } catch (err) {
            console.error('Delete failed:', err);
            throw err;
        }
    };

    const setDefaultAddress = async (id: number) => {
        try {
            await accountApi.setDefaultAddress(id);
            await loadAddresses();
        } catch (err) {
            console.error('Set default failed:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    return {
        addresses,
        loading,
        error,
        loadAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
    };
}