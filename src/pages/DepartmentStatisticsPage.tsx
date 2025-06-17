import { useQuery } from "@tanstack/react-query";
import { DepartmentStatistics, Employee } from "../model/dto-types";
import { AxiosError } from "axios";
import apiClient from "../services/ApiClientJsonServer";
import { Box } from "@chakra-ui/react";
import _ from "lodash";
import DepartmentStatisticsTable from "../components/DepartmentStatisticsTable";


const DepartmentsStatisticsPage = () => {
  const { data: employees } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000,
  });

  const currentYear = new Date().getFullYear();

  const grouped = _.groupBy(employees, "department");

  const stats: DepartmentStatistics[] = Object.entries(grouped).map(
    ([department, empl]) => {
      const employeeCount = empl.length;
      const averageSalary = Math.round(_.meanBy(empl, (e) => e.salary));
      const averageAge = Math.round(
        _.meanBy(empl, (e) => currentYear - new Date(e.birthDate).getFullYear())
      );

      return {
        department,
        employeeCount,
        averageSalary,
        averageAge,
      };

    }

  );

  return (
    <Box>
      <DepartmentStatisticsTable data={stats}></DepartmentStatisticsTable>
    </Box>
  );
};

export default DepartmentsStatisticsPage;
