export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
}
export interface AuthResponse {
    user: User;
    message: string;
}
export interface DashboardData {
    stats: {
        usersCount: number;
        activeSessions: number;
    };
    recentLogs: string[];
}
