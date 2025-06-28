import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../state-management/store';
import apiClient from '../services/ApiClientJsonServer';

const LogoutPage = () => {
  const logout = useLogout(); // ✅ правильный хук
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // сброс в Zustand
    apiClient.setToken(""); // убираем токен
    navigate('/login'); // редирект
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutPage;
