import apiClient from "../services/ApiClientJsonServer"
import Statistics from "../components/Statistics"
import { getAge } from "../util/functions"
import useEmployeesQuery from "../hooks/useEmployeesQuery"

const AgeStatisticsPage = () => {
 const {data: employees} = useEmployeesQuery(["employees"], () => apiClient.getAll())
 
   return (
     <Statistics numbers={employees?.map(e => getAge(e.birthDate)) || []} interval={10} label={'Age'} ></Statistics>
   )
 }

export default AgeStatisticsPage