import { useQuery } from "@tanstack/react-query";
import { Employee } from "../model/dto-types";
import apiClient from "../services/ApiClientJsonServer";
import { Avatar, Spinner, Stack, Table, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";

const EmployeesTable = () => {
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  });
  return (
    <>
      {error ?
        <Text color={"red"} fontSize={"2xl"}>{error.message}</Text>
        :
        <>
          {isLoading && <Spinner />}
          <Stack
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Table.ScrollArea
              borderWidth="1px"
              rounded="md"
              height="80vh"
              width="80vw"
            >
              <Table.Root size="sm" stickyHeader>
                <Table.Header>
                  <Table.Row bg="bg.subtle" zIndex="-1">
                    <Table.ColumnHeader></Table.ColumnHeader>
                    <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader>Salary</Table.ColumnHeader>
                    <Table.ColumnHeader>Birthday</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {employees?.map((empl) => (
                    <Table.Row key={empl.id}>
                      <Table.Cell>
                        <Avatar.Root shape="full" size="lg">
                          <Avatar.Fallback name={empl.fullName} />
                          <Avatar.Image src={empl.avatar} />
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell>{empl.fullName}</Table.Cell>
                      <Table.Cell>{empl.department}</Table.Cell>
                      <Table.Cell>{empl.salary}</Table.Cell>
                      <Table.Cell>{empl.birthDate}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Stack>
        </>
      }
    </>
  );
};

export default EmployeesTable;