import { HStack, Text } from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import StatisticsSelector from '../pages/StatisticsSelector'
import { useAuthData } from '../state-management/store'

const Nav = () => {
  const userData = useAuthData(s => s.userData);
  return (
    <HStack justifyContent={"space-between"} marginLeft={"4vw"}>
        {!!userData && <RouterLink to="/"> <Text>Home</Text></RouterLink>}
       {userData?.role === "ADMIN" &&< RouterLink to="/add"> <Text>Add Employee</Text></RouterLink>}
        {!userData && <RouterLink to="/login"><Text>Login</Text></RouterLink>}
        {!!userData && <RouterLink to="/logout"><Text>Logout</Text></RouterLink>}
        {!!userData && <StatisticsSelector></StatisticsSelector>}
        <ColorModeButton></ColorModeButton>
    </HStack>
  )
}

export default Nav