import { SearchObject, Employee } from "../../model/dto-types";
import ApiClient, { Updater } from "../../services/ApiClient";
import employees from "./employees_mock_data";
class ApiClientMock implements ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]> {
        return Promise.resolve(employees);
    }
    getEmployee(id: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    addEmployee(empl: Employee): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    deleteEmployee(id: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    updateEmployee(updater: Updater): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    setToken(token: string): void {
        throw new Error("Method not implemented.");
    }

}
const apiClient = new ApiClientMock();
export default apiClient;