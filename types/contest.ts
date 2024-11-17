export enum ContestStatus {
    UPCOMING = 'UPCOMING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum RegistrationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

export interface ContestRequest {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    maxParticipants: number;
    entryFee: number;
}

export interface ContestResponse {
    id: number;
    name: string;
    description: string | null;
    startDate: string;
    endDate: string;
    location: string | null;
    maxParticipants: number;
    entryFee: number;
    status: ContestStatus;
    registrations?: Array<{
        id: number;
        status: string;
    }>;
    createdAt: string;
    updatedAt: string;
    currentParticipants: number;
    isRegistered: boolean;
}

export interface RegistrationResponse {
    id: number;
    participantNumber: string;
    contestName: string;
    userEmail: string;
    registrationDate: string;
    status: RegistrationStatus;
}