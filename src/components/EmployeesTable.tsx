import { useQuery } from "@tanstack/react-query";
import { 
  Avatar,
  Box,
  Button,
  Heading,
  Table,
  Text,
  Skeleton,
  VStack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../services/ApiClientJsonServer";
import { Employee } from "../model/dto-types";

const EmployeesTable = () => {
  const { data: employees = [], isLoading, error } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
  });

  const headerBg = useColorModeValue("gray.50", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">Error loading employees: {error.message}</Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <HStack justify="space-between">
        <Heading size="lg">Employees</Heading>
        <Button 
          as={Link} 
          to="/employees/add" 
          colorScheme="teal"
          size="sm"
        >
          Add Employee
        </Button>
      </HStack>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table.Root variant="striped" size="md">
          <Table.Header position="sticky" top={0} bg={headerBg} zIndex="docked">
            <Table.Row>
              <Table.ColumnHeader>Avatar</Table.ColumnHeader>
              <Table.ColumnHeader>Full Name</Table.ColumnHeader>
              <Table.ColumnHeader>Department</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Salary</Table.ColumnHeader>
              <Table.ColumnHeader>Birth Date</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          
          <Table.Body>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <Table.Row key={`skeleton-${index}`}>
                  <Table.Cell>
                    <Skeleton height="40px" width="40px" rounded="full"/>
                  </Table.Cell>
                  <Table.Cell><Skeleton height="20px"/></Table.Cell>
                  <Table.Cell><Skeleton height="20px"/></Table.Cell>
                  <Table.Cell textAlign="end"><Skeleton height="20px"/></Table.Cell>
                  <Table.Cell><Skeleton height="20px"/></Table.Cell>
                </Table.Row>
              ))
            ) : (
              employees.map((employee) => (
                <Table.Row 
                  key={employee.id}
                  _hover={{ bg: hoverBg }}
                  transition="background-color 0.2s"
                >
                  <Table.Cell>
                    <Avatar.Root size="md" shape="full">
                      <Avatar.Image src={employee.avatar} />
                      <Avatar.Fallback name={employee.fullName} />
                    </Avatar.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontWeight="medium">{employee.fullName}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.500">
                      {employee.department}
                    </Text>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Text fontWeight="semibold">
                      ${employee.salary.toLocaleString()}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm">
                      {new Date(employee.birthDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </VStack>
  );
};

export default EmployeesTable;

function useColorModeValue(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
}
