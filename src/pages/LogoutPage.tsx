import { Button } from '@chakra-ui/react'
import { useAuthData } from '../state-management/store'
import apiClient from '../services/ApiClientJsonServer';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
    const logout = useAuthData(s => s.logout);
    const [navigateLogin, setNavigateLogin] = useState(false)
    apiClient.setToken("");
  return (
    <>
    {navigateLogin ? <Navigate to="/login" /> : <Button onClick={() => {logout(); setNavigateLogin(true)}}>Logout</Button>}
    </>
    
  )
}

export default LogoutPage