export enum Role {
    ADMIN,
    CUSTOMER
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: string;
}