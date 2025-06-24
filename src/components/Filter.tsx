import { HStack } from '@chakra-ui/react'
import React from 'react'
import DepartmentSelector from './DepartmentSelector'
import SalaryFilter from './SalaryFilter'
import AgeFilter from './AgeFilter'

const Filters = () => {
  return (
    <HStack>
        <DepartmentSelector/>
        <SalaryFilter></SalaryFilter>
        <AgeFilter></AgeFilter>
            
    </HStack>
  )
}

export default Filters