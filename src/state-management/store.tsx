import {create} from 'zustand'
import { UserData } from '../services/AuthClient';
interface EmployeeFilters {
    department: string | null;
    salaryFrom: number | null;
    salaryTo: number | null;
    ageFrom: number | null;
    ageTo: number | null;
    setDepartment: (department: string | null) => void;
    setSalaryFrom: (salaryFrom: number | null) => void;
    setAgeFrom: (ageFrom: number | null) => void;
    setSalaryTo: (salaryTo: number | null) => void;
    setAgeTo: (ageTo: number | null) => void;
}
interface AuthData {
    userData: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}
const useEmployeeFilters = create<EmployeeFilters>(set => ({
department: null,
salaryFrom: null,
salaryTo: null,
ageFrom: null,
ageTo: null,
setAgeFrom: (ageFrom) => set({
    ageFrom
}),
setAgeTo: (ageTo) => set({
    ageTo
}),
setSalaryFrom: (salaryFrom) => set ({
    salaryFrom
}),
setSalaryTo: (salaryTo) => set({
    salaryTo
}),
setDepartment: (department) => set({
    department
})
}));
export const useAuthData = create<AuthData>(set => ({
    userData: null,
    login: (userData) => set({
       userData
    }),
    logout: () => set({
        userData: null
    })
}))
export default useEmployeeFilters