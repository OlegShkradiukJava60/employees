import { SearchObject, Employee } from "../model/dto-types";
import ApiClient from "./ApiClient";
import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:3000/employees"
})
export default class ApiClientJsonServer implements ApiClient {
    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        const res = await apiClient.get<Employee[]>("/");
        return res.data;
    }
    
}