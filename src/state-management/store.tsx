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
  setAgeFrom: (ageFrom: number | null) => void;
  setSalaryTo: (salaryTo: number | null) => void;
  setAgeTo: (ageTo: number | null) => void;
}

export const useEmployeeFilters = create<EmployeeFilters>(set => ({
  department: null,
  salaryFrom: null,
  salaryTo: null,
  ageFrom: null,
  ageTo: null,
  setDepartment: (department) => set({ department }),
  setSalaryFrom: (salaryFrom) => set({ salaryFrom }),
  setSalaryTo: (salaryTo) => set({ salaryTo }),
  setAgeFrom: (ageFrom) => set({ ageFrom }),
  setAgeTo: (ageTo) => set({ ageTo }),
}));


interface AuthState {
  userData: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  userData: null,
  login: (userData) => set({ userData }),
  logout: () => set({ userData: null }),
}));

export const useAuthData = () => useAuthStore((state) => state.userData);
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);

