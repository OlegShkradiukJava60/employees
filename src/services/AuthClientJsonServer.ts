import AuthClient, {LoginData, UserData} from "./AuthClient";
import axios from 'axios';
import { Axios } from "axios";
interface LoginResponse {
    "accessToken": string,
    "user": {
        "email": string,
        "id": string
    }
}
class AuthClientJsonServer implements AuthClient {
    async login(loginData: LoginData): Promise<UserData> {
        const data = (await axios.post<LoginResponse>("http://localhost:3000/login", loginData)).data;
        const {accessToken, user} = data;
        const userData: UserData = {email: user.email, role: user.id, token: accessToken};
        return userData;
    }
    async logout(_: string): Promise<void> {
    }

}
const authClient = new AuthClientJsonServer();
export default authClient;