import { HStack, Text } from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import StatisticsSelector from '../pages/StatisticsSelector'
import { useAuthData } from '../state-management/store';

const Nav = () => {
  const userData = useAuthData();
  return (
    <HStack justifyContent="space-between" marginLeft="4vw">
      {/* Home - всегда виден */}
      <RouterLink to="/">
        <Text>Home</Text>
      </RouterLink>

      {/* Для неавторизованных */}
      {!userData ? (
        <RouterLink to="/login">
          <Text>Login</Text>
        </RouterLink>
      ) : (
        <>
          {/* Для всех авторизованных */}
          <RouterLink to="/logout">
            <Text>Logout</Text>
          </RouterLink>
          <StatisticsSelector />

          {/* Только для ADMIN */}
          {userData.role === 'ADMIN' && (
            <RouterLink to="/add">
              <Text>Add Employee</Text>
            </RouterLink>
          )}
        </>
      )}

      <ColorModeButton />
    </HStack>
  )
}

export default Nav