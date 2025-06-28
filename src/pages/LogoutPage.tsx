import { Button } from '@chakra-ui/react'
import { useAuthData } from '../state-management/store'
import apiClient from '../services/ApiClientJsonServer';

const LogoutPage = () => {
    const logout = useAuthData(s => s.logout);
    apiClient.setToken("");
  return (
    <Button onClick={() => logout()}>Logout</Button>
  )
}

export default LogoutPage