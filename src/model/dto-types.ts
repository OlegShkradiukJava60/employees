export interface Employee {
    id: string;
    fullName: string;
    avatar: string;
    department: string;
    birthDate: string;
    salary: number;
}
export interface SearchObject {
    department?: string;
    minSalary?: number;
    maxSalary?: number;
    minAge?: number;
    maxAge?: number;
}

export interface DepartmentStatistics {
  department: string;
  employeeCount: number;
  averageSalary: number;
  averageAge: number;
}
