import React from 'react'
import EmployeesTable from '../components/EmployeesTable'
import apiClient from '../services/ApiClientJsonServer'

const HomePage = () => {
  return (
    <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}></EmployeesTable>
  )
}

export default HomePage