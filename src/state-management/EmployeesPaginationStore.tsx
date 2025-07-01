import {create} from 'zustand';

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
