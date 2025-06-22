import { MutationFunction, useQuery } from "@tanstack/react-query";
import { Employee } from "../model/dto-types";
import apiClient from "../services/ApiClientJsonServer";
import { Avatar, Spinner, Stack, Table, Text, Button} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useColorModeValue } from "../components/ui/color-mode";
import { FC } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
interface Props {
  deleteFn: MutationFunction
}
const EmployeesTable:FC<Props> = ({deleteFn}) => {
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  });
  const mutationDel = useEmployeesMutation(deleteFn);
  const bg = useColorModeValue("red.500", "red.200");
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
              width={{
                base:"100vw",
                sm:"95vw",
                md:"80vw"
              }}
            >
              <Table.Root size="sm" stickyHeader>
                <Table.Header>
                  <Table.Row bg="bg.subtle" zIndex="0">
                    <Table.ColumnHeader hideBelow={"md"}></Table.ColumnHeader>
                    <Table.ColumnHeader >Full Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="sm">Salary</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="md">Birthday</Table.ColumnHeader>
                    <Table.ColumnHeader ></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body  zIndex="-100">
                  {employees?.map((empl) => (
                    <Table.Row key={empl.id} >
                      <Table.Cell hideBelow={"md"}>
                        <Avatar.Root shape="full" size="lg">
                          <Avatar.Fallback name={empl.fullName} />
                          <Avatar.Image src={empl.avatar} />
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell >{empl.fullName}</Table.Cell>
                      <Table.Cell>{empl.department}</Table.Cell>
                      <Table.Cell hideBelow="sm">{empl.salary}</Table.Cell>
                      <Table.Cell hideBelow="md">{empl.birthDate}</Table.Cell>
                      <Table.Cell >
                        <Button size="xs" background={bg} onClick={() => mutationDel.mutate(empl.id)} disabled={mutationDel.isPending}>Delete</Button>
                      </Table.Cell>
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