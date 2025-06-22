import { Employee } from '../model/dto-types'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../services/ApiClientJsonServer'
import Statistics from '../components/Statistics'

const SalaryStatisticsPage = () => {
  const {data: employees} = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  })

  return (
    <Statistics numbers={employees?.map(e => e.salary) || []} interval={5000} label={'Salary'} ></Statistics>
  )
}

export default SalaryStatisticsPage