import { create } from 'zustand';
import { UserData } from '../services/AuthClient';


interface EmployeeFilters {
    department: string | null;
    salaryFrom: number | null;
    salaryTo: number | null;
    ageFrom: number | null;
    ageTo: number | null;
    setDepartment: (department: string | null) => void;
    setSalaryFrom: (salaryFrom: number | null) => void;
    setSalaryTo: (salaryTo: number | null) => void;
    setAgeFrom: (ageFrom: number | null) => void;
    setAgeTo: (ageTo: number | null) => void;
}

export const useEmployeeFilters = create<EmployeeFilters>((set) => ({
    department: null,
    salaryFrom: null,
    salaryTo: null,
    ageFrom: null,
    ageTo: null,

    setDepartment: (department) => {
        useEmployeesPaginationStore.getState().setPage(1);
        set({ department });
    },
    setSalaryFrom: (salaryFrom) => {
        useEmployeesPaginationStore.getState().setPage(1);
        set({ salaryFrom });
    },
    setSalaryTo: (salaryTo) => {
        useEmployeesPaginationStore.getState().setPage(1);
        set({ salaryTo });
    },
    setAgeFrom: (ageFrom) => {
        useEmployeesPaginationStore.getState().setPage(1);
        set({ ageFrom });
    },
    setAgeTo: (ageTo) => {
        useEmployeesPaginationStore.getState().setPage(1);
        set({ ageTo });
    },
}));

interface AuthData {
    userData: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}

export const useAuthData = create<AuthData>((set) => ({
    userData: null,
    login: (userData) => set({ userData }),
    logout: () => set({ userData: null }),
}));

interface EmployeesPaginationState {
    count: number;
    page: number;
    setCount: (count: number) => void;
    setPage: (page: number) => void;
}

export const useEmployeesPaginationStore = create<EmployeesPaginationState>((set) => ({
    count: 0,
    page: 1,
    setCount: (count) => set({ count }),
    setPage: (page) => set({ page }),
}));
 