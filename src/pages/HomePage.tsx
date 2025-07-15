import { Stack } from '@chakra-ui/react'
import EmployeesTable from '../components/EmployeesTable'
import { Updater } from '../services/ApiClient'
import apiClient from '../services/ApiClientJsonServer'
import Filters from '../components/Filters'
import useEmployeeFilters, { useAuthData } from '../state-management/store'
import EmployeesPaginiator from '../components/EmployeesPaginiator'
import { SearchObject } from '../model/dto-types'
import _ from 'lodash'


const HomePage = () => {
  const userData = useAuthData(s => s.userData);
   const {department, salaryFrom, salaryTo, ageFrom, ageTo} = useEmployeeFilters();
   let searchObj: SearchObject | undefined = {};
     department && (searchObj.department = department);
     salaryFrom && (searchObj.salaryFrom = salaryFrom);
     salaryTo && (searchObj.salaryTo = salaryTo);
     ageFrom && (searchObj.ageFrom = ageFrom);
     ageTo && (searchObj.ageTo = ageTo);
     if (_.isEmpty(searchObj)) {
       searchObj = undefined
     }
     const queryKey: any[] = ["employees"]
     searchObj && queryKey.push(searchObj)
  return (
    <>
     { !!userData &&
      <Stack>
        <Filters></Filters>
        <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}
        updateFn = {(updater) => apiClient.updateEmployee(updater as Updater)} queryFn={() => apiClient.getAll(searchObj)} queryKey={queryKey}></EmployeesTable>
        <EmployeesPaginiator></EmployeesPaginiator>
      </Stack>
      }
    </>
  )
}

export default HomePage