
import apiClient from '../services/ApiClientJsonServer'
import Statistics from '../components/Statistics'
import useEmployeesQuery from '../hooks/useEmployeesQuery'

const SalaryStatisticsPage = () => {
 const {data: employees} = useEmployeesQuery(["employees"], () => apiClient.getAll())

  return (
    <Statistics numbers={employees?.map(e => e.salary) || []} interval={5000} label={'Salary'} ></Statistics>
  )
}

export default SalaryStatisticsPage