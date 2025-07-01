import { useAuthData } from '../state-management/store'
import { LoginData, UserData } from '../services/AuthClient';
import authClient from '../services/AuthClientJsonServer';
import LoginForm from '../components/LoginForm';
import apiClient from '../services/ApiClientJsonServer';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const LoginPage = () => {
    const login = useAuthData(s => s.login);
    const [navigateHome, setNavigateHome] = useState(false)
    const [errorObj, setError] = useState<AxiosError|null>(null);
    useEffect(() => {
        if(errorObj) {
          throw errorObj
        }
    },[errorObj])
    const submitter = async (loginData: LoginData) => {

        let res = false;
        try {
            const userData: UserData = await authClient.login(loginData);
            login(userData);
            apiClient.setToken(userData.token);
            res = true;
            setNavigateHome(true)
        } catch (error) {
            if(!((error as AxiosError).response)) {
              setError(error as AxiosError);
            }
        }
        return res;
    }

  return (

    <>
     { navigateHome ? <Navigate to="/"></Navigate> : <LoginForm submitter={submitter}></LoginForm>}
    </>
  )
}

export default LoginPage