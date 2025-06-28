export interface LoginData {
    email: string;
    password: string;
}
export interface UserData {
    email: string;
    role: string;
    token: string;
}
export default interface AuthClient {
    login(loginData: LoginData): Promise<UserData>;
    logout(email: string): Promise<void>
}