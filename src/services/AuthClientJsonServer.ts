import AuthClient, { LoginData, UserData } from "./AuthClient";
import axios from 'axios';
import { Axios } from "axios";

interface LoginData {
    email: string;
    password: string;
    accessToken: string;
    user: {
        email: string;
        id: string;
        role: 'admin' | 'user';
    }
}
class AuthClientJsonServer implements AuthClient {
    async login(loginData: LoginData): Promise<UserData> {
        const { email, password } = loginData;

        const res = await axios.get("http://localhost:3000/users", {
            params: { email, password }
        });

        const users = res.data;

        if (users.length === 0) {
            throw new Error("Wrong credentials");
        }

        const user = users[0];

        const userData: UserData = {
            email: user.email,
            role: user.userId === 'ADMIN' ? 'ADMIN' : 'USER',
            token: ""
        };

        return userData;
    }

    async logout(_: string): Promise<void> {
    }

}
const authClient = new AuthClientJsonServer();
export default authClient;