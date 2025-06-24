import { Box, Input, HStack } from "@chakra-ui/react";
import useEmployeeFilters from "../state-management/store";
import { Form } from "react-router-dom";

const SalaryFilter = () => {
  const salaryFrom = useEmployeeFilters((s) => s.salaryFrom);
  const salaryTo = useEmployeeFilters((s) => s.salaryTo);
  const setSalaryFrom = useEmployeeFilters((s) => s.setSalaryFrom);
  const setSalaryTo = useEmployeeFilters((s) => s.setSalaryTo);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSalaryFrom(value ? parseInt(value) : null);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSalaryTo(value ? parseInt(value) : null);
  };

  return (
    <Box>
      <Form>Salary filter</Form>
      <HStack>
        <Input
          placeholder="From"
          type="number"
          value={salaryFrom ?? ""}
          onChange={handleFromChange}
        />
        <Input
          placeholder="To"
          type="number"
          value={salaryTo ?? ""}
          onChange={handleToChange}
        />
      </HStack>
    </Box>
  );
};

export default SalaryFilter;
