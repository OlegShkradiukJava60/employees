import EmployeeForm from "../components/EmployeeForm"
import useEmployeesMutation from "../hooks/useEmployeesMutation"
import { Employee } from "../model/dto-types"
import apiClient from "../services/ApiClientJsonServer"

const AddEmployeePage = () => {
  const mutationObj = useEmployeesMutation((empl) => apiClient.addEmployee(empl as Employee))
  return (
    <EmployeeForm submitter={(empl) => mutationObj.mutate(empl)}></EmployeeForm>
  )
}

export default AddEmployeePage