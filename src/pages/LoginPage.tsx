import { useLogin } from '../state-management/store'; // ✅ правильный импорт
import { LoginData, UserData } from '../services/AuthClient';
import authClient from '../services/AuthClientJsonServer';
import LoginForm from '../components/LoginForm';
import apiClient from '../services/ApiClientJsonServer';

const LoginPage = () => {
  const login = useLogin();

  const submitter = async (loginData: LoginData) => {
    let res = false;
    try {
      const userData: UserData = await authClient.login(loginData);
      login(userData); // сохраняем в Zustand
      apiClient.setToken(userData.token);
      res = true;
    } catch (error) {
      console.error("Login error:", error);
    }
    return res;
  };

  return <LoginForm submitter={submitter} />;
};

export default LoginPage;
