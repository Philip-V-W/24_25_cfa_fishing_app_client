export enum PermitType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    ANNUAL = 'ANNUAL',
    LIFETIME = 'LIFETIME'
}

export const PermitTypeDescriptions = {
    [PermitType.DAILY]: '1 Day Permit',
    [PermitType.WEEKLY]: '7 Day Permit',
    [PermitType.MONTHLY]: '30 Day Permit',
    [PermitType.ANNUAL]: 'Annual Permit',
    [PermitType.LIFETIME]: 'Lifetime Permit'
};

export enum PermitStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED'
}

export interface PermitRequest {
    permitType: PermitType;
    startDate: string; // LocalDate in ISO format
    notes?: string;
}

export interface PermitResponse {
    id: number;
    permitNumber: string;
    userEmail: string;
    permitType: PermitType;
    startDate: string;
    endDate: string;
    status: PermitStatus;
    price: number;
    notes?: string;
}