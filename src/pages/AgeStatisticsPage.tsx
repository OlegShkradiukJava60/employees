import { Employee } from '../model/dto-types'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../services/ApiClientJsonServer'
import Statistics from '../components/Statistics'


const AgeStatisticsPage = () => {
  const { data: employees } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  })

  const currentYear = new Date().getFullYear();
  const age = employees?.map(e => {
    const birthDate = new Date(e.birthDate);
    return currentYear - birthDate.getFullYear();
  }) || [];


  return (
    <Statistics numbers={age} interval={10} label={'Age'} ></Statistics>
  )
}

export default AgeStatisticsPage