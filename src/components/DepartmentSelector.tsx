import { Button, Menu, Portal } from "@chakra-ui/react";
import { departments } from "../../config/employees-config.json";
import useEmployeeFilters from "../state-management/store";

const DepartmentSelector = () => {
  const department = useEmployeeFilters((s) => s.department);
  const setDepartment = useEmployeeFilters((s) => s.setDepartment);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {department || "Departments"}
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              key="all"
              value="all"
              onClick={() => setDepartment(null)}
            >
              All Departments
            </Menu.Item>

            {departments.map((dep) => (
              <Menu.Item
                key={dep}
                value={dep}
                onClick={() => setDepartment(dep)}
              >
                {dep}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default DepartmentSelector;
