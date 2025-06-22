import { AxiosError } from "axios"
import { Employee } from "../model/dto-types"
import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/ApiClientJsonServer"
import Statistics from "../components/Statistics"
import { getAge } from "../util/functions"

const AgeStatisticsPage = () => {
 const {data: employees} = useQuery<Employee[], AxiosError>({
     queryKey: ["employees"],
     queryFn: () => apiClient.getAll(),
     staleTime: 3600_000
   })
 
   return (
     <Statistics numbers={employees?.map(e => getAge(e.birthDate)) || []} interval={10} label={'Age'} ></Statistics>
   )
 }

export default AgeStatisticsPage