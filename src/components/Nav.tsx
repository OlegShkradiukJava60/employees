import { HStack } from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import StatisticsSelector from '../pages/StatisticsSelector'

const Nav = () => {
  return (
    <HStack justifyContent={"space-between"} marginLeft={"4vw"}>
        <RouterLink to="/"> Home</RouterLink>
        <RouterLink to="/add"> Add Employee</RouterLink>
        <StatisticsSelector></StatisticsSelector>
        <ColorModeButton></ColorModeButton>
    </HStack>
  )
}

export default Nav