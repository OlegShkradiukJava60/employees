import { SearchObject, Employee } from "../model/dto-types";
import { getAge } from "../util/functions";
import ApiClient, { Updater } from "./ApiClient";
import axios from "axios";
const BASE_URL = "http://localhost:3000/employees"
let axiosIstance = axios.create({
  baseURL: BASE_URL
});
class ApiClientJsonServer implements ApiClient {
  setToken(token: string): void {
      axiosIstance = axios.create({
           baseURL: BASE_URL,
           headers: {
            Authorization: "Bearer " + token
           } 
      })
  }
  async getEmployee(id: string): Promise<Employee> {
    const res = await axiosIstance.get<Employee>(`/${id}`);
    return res.data;
  }
  async addEmployee(empl: Employee): Promise<Employee> {
    const res = await axiosIstance.post<Employee>("/", {...empl, userId:"ADMIN"});
    return res.data;
  }
  async deleteEmployee(id: string): Promise<Employee> {
    const res = await axiosIstance.delete<Employee>(`/${id}`);
    return res.data;
  }
  async updateEmployee(updater: Updater): Promise<Employee> {
    const res = await axiosIstance.patch<Employee>(
      `/${updater.id}`,
      updater.fields
    );
    return res.data;
  }
  async getAll(searchObject?: SearchObject): Promise<Employee[]> {
    let res;
    let url = "/";
    let  salaryFrom, salaryTo, ageFrom, ageTo;
    if (searchObject && searchObject.department) {
      url = `?department=${searchObject.department}`;
    }
    searchObject && ({ salaryFrom, salaryTo, ageFrom, ageTo} = searchObject)
    salaryFrom = salaryFrom ?? 0;
    salaryTo = salaryTo ?? Number.MAX_SAFE_INTEGER;
    ageFrom = ageFrom ?? 0;
    ageTo = ageTo ?? Number.MAX_SAFE_INTEGER;
    res = (await axiosIstance.get<Employee[]>(url)).data;
    res = res.filter(e => {
        const age = getAge(e.birthDate);
        const salary = e.salary;
        return age >= ageFrom && age <= ageTo && salary >= salaryFrom && salary <= salaryTo
    })
    return res
  }
}

const apiClient = new ApiClientJsonServer();
export default apiClient;
