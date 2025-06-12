import { Employee, SearchObject } from "../model/dto-types";

export default interface ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]>;
}