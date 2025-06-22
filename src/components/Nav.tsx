import { HStack, Text } from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import StatisticsSelector from '../pages/StatisticsSelector'

const Nav = () => {
  return (
    <HStack justifyContent={"space-between"} marginLeft={"4vw"}>
        <RouterLink to="/"> <Text>Home</Text></RouterLink>
        <RouterLink to="/add"> <Text>Add Employee</Text></RouterLink>
        <StatisticsSelector></StatisticsSelector>
        <ColorModeButton></ColorModeButton>
    </HStack>
  )
}

export default Nav