import { SearchObject, Employee } from "../model/dto-types";
import ApiClient from "./ApiClient";
import axios from "axios";
const axiosIstance = axios.create({
    baseURL: "http://localhost:3000/employees"
})
 class ApiClientJsonServer implements ApiClient {
    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        const res = await axiosIstance.get<Employee[]>("/");
        return res.data;
    }
    
}
const apiClient = new ApiClientJsonServer();
export default apiClient