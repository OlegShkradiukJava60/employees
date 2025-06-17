import { useQuery } from "@tanstack/react-query";
import { DepartmentStatistics, Employee } from "../model/dto-types";
import { AxiosError } from "axios";
import apiClient from "../services/ApiClientJsonServer";
import { Box } from "@chakra-ui/react";
import _ from "lodash";
import DepartmentStatisticsTable from "../components/DepartmentStatisticsTable";
import getAge from "../utils/getAges";


const DepartmentsStatisticsPage = () => {
  const { data: employees } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000,
  });


  const grouped = _.groupBy(employees, "department");

  const stats: DepartmentStatistics[] = _.map(grouped, (empl, department) => {
    const employeeCount = empl.length;
    const averageSalary = Math.round(_.meanBy(empl, (e) => e.salary));
    const averageAge = Math.round(_.meanBy(empl, (e) => getAge(e.birthDate)));

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
      <DepartmentStatisticsTable data={stats}>
      </DepartmentStatisticsTable>
    </Box>
  );
};

export default DepartmentsStatisticsPage;
