import { AxiosError } from 'axios';
import { Navigate, useRouteError } from 'react-router-dom';
import {Text, Box, Button} from '@chakra-ui/react'
import { useState } from 'react';
import { useAuthData } from '../state-management/store';

const ErrorPage = () => {
    const error = useRouteError();
    const logout = useAuthData(s => s.logout);
    const [navigateHome, setNavigateHome] = useState(false);
    console.log(error)
    if (!(error instanceof AxiosError)) {
        return <Text color="red" fontSize="2.5rem">Unknown Error {error instanceof Error ? error.message : error + ""}</Text>
    }
    const status = error.response?.status;
        
        if(status === 401 || status === 403) {
            logout();
        }
       
  return (
  
        <>
            {navigateHome && <Navigate to="/"/>}
          { status === 401 || status === 403 ? <Navigate to="/login"/> : <Box>
            <Text>Server is unavailable, repeat later on</Text>
            <Button onClick={() => setNavigateHome(true)}>Return to Home</Button>
           </Box>}
        </>
   
  )
}

export default ErrorPage