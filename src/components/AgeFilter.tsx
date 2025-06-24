import { Box, HStack, Input } from "@chakra-ui/react";
import useEmployeeFilters from "../state-management/store";
import { Form } from "react-router-dom";

const AgeFilter = () => {
  const ageFrom = useEmployeeFilters((s) => s.ageFrom);
  const ageTo = useEmployeeFilters((s) => s.ageTo);
  const setAgeFrom = useEmployeeFilters((s) => s.setAgeFrom);
  const setAgeTo = useEmployeeFilters((s) => s.setAgeTo);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgeFrom(value ? parseInt(value) : null);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgeTo(value ? parseInt(value) : null);
  };

  return (
    <Box>
      <Form>Age range</Form>
      <HStack>
        <Input
          placeholder="From"
          type="number"
          value={ageFrom ?? ""}
          onChange={handleFromChange}
        />
        <Input
          placeholder="To"
          type="number"
          value={ageTo ?? ""}
          onChange={handleToChange}
        />
      </HStack>
    </Box>
  );
};

export default AgeFilter;
