export interface User {
    _id: string;
    email: string;
    user: string;
    password: string;
    publicName?: string;
    urlProfile?: string;
    statusProfile: number;
}