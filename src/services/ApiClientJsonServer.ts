import { SearchObject, Employee } from "../model/dto-types";
import ApiClient, { Updater } from "./ApiClient";
import axios from "axios";
const axiosIstance = axios.create({
    baseURL: "http://localhost:3000/employees"
})
class ApiClientJsonServer implements ApiClient {
    async getEmployee(id: string): Promise<Employee> {
        const res = await axiosIstance.get<Employee>(`/${id}`);
        return res.data;
    }
    async addEmployee(empl: Employee): Promise<Employee> {
        const res = await axiosIstance.post<Employee>('/', empl);
        return res.data;
    }
    async deleteEmployee(id: string): Promise<Employee> {
        const res = await axiosIstance.delete<Employee>(`/${id}`);
        return res.data;
    }
    async updateEmployee(updater: Updater): Promise<Employee> {
        const res = await axiosIstance.patch<Employee>(`/${updater.id}`, updater.fields);
        return res.data
    }
    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        const params: { [key: string]: unknown } = {};

        if (searchObject?.department)
            params.department = searchObject.department;

        if (searchObject?.salaryFrom !== null && searchObject?.salaryFrom !== undefined)
            params.salary_gte = searchObject.salaryFrom; 

        if (searchObject?.salaryTo !== null && searchObject?.salaryTo !== undefined)
            params.salary_lte = searchObject.salaryTo; 

        if (searchObject?.ageFrom !== null && searchObject?.ageFrom !== undefined)
            params.age_gte = searchObject.ageFrom;

        if (searchObject?.ageTo !== null && searchObject?.ageTo !== undefined)
            params.age_lte = searchObject.ageTo;

        const res = await axiosIstance.get<Employee[]>("/", { params });
        return res.data;
    }

}
const apiClient = new ApiClientJsonServer();
export default apiClient