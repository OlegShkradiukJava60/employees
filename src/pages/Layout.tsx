import Nav from '../components/Nav'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Nav></Nav>
    <Box marginTop="4vh">
        <Outlet></Outlet>
    </Box>
    </>
    
  )
}

export default Layout