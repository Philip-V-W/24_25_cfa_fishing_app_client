import {OrderStatus} from "@/types/order";
import {PermitStatus, PermitType} from "@/types/permit";

export interface UserProfile {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    registrationDate: string;
    addresses: Address[];
    recentOrders: OrderSummary[];
    activePermits: PermitSummary[];
    upcomingContests: ContestRegistration[];
}

export interface Address {
    id: number;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

export interface OrderSummary {
    id: number;
    orderDate: string;
    status: OrderStatus;
    totalAmount: number;
    trackingNumber: string;
    itemCount: number;
}

export interface PermitSummary {
    id: number;
    permitNumber: string;
    type: PermitType;
    startDate: string;
    endDate: string;
    status: PermitStatus;
    price: number;
}

export interface ContestRegistration {
    id: number;
    contestId: number;
    contestName: string;
    contestDate: string;
    location: string;
    registrationNumber: string;
    registrationDate: string;
    entryFee: number;
    status: string;
}

export interface AddressResponse {
    id: number;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

export interface AddressRequest {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
}

export interface UserProfileUpdateRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}



