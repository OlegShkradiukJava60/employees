import { MutationFunction, useQuery } from "@tanstack/react-query";
import { Employee, SearchObject } from "../model/dto-types";
import apiClient from "../services/ApiClientJsonServer";
import { Avatar, Spinner, Stack, Table, Text, Button } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useColorModeValue } from "../components/ui/color-mode";
import { FC } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import { useEmployeeFilters } from "../state-management/store";
import { useAuthData } from '../state-management/store';
import _ from 'lodash';

interface Props {
  deleteFn: MutationFunction,
  updateFn: MutationFunction
}

const EmployeesTable: FC<Props> = ({ deleteFn, updateFn }) => {
  const { department, salaryFrom, salaryTo, ageFrom, ageTo } = useEmployeeFilters();
  const auth = useAuthData();
  const bg = useColorModeValue("red.500", "red.200");

  console.log("auth in EmployeesTable:", auth); // Отладка

  let searchObj: SearchObject | undefined = {};
  if (department) searchObj.department = department;
  if (salaryFrom) searchObj.salaryFrom = salaryFrom;
  if (salaryTo) searchObj.salaryTo = salaryTo;
  if (ageFrom) searchObj.ageFrom = ageFrom;
  if (ageTo) searchObj.ageTo = ageTo;
  if (_.isEmpty(searchObj)) searchObj = undefined;

  const queryKey: any[] = ["employees"];
  if (searchObj) queryKey.push(searchObj);

  const { data: employees, error, isLoading } = useQuery<Employee[], AxiosError>({
    queryKey,
    queryFn: () => apiClient.getAll(searchObj),
    staleTime: 3600_000
  });

  const mutationDel = useEmployeesMutation(deleteFn);
  const mutationUpdate = useEmployeesMutation(updateFn);

  return (
    <>
      {error ? (
        <Text color={"red"} fontSize={"2xl"}>{error.message}</Text>
      ) : (
        <>
          {isLoading && <Spinner />}
          <Stack height={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Table.ScrollArea
              borderWidth="1px"
              rounded="md"
              height="70vh"
              width={{ base: "100vw", sm: "95vw", md: "80vw" }}
            >
              <Table.Root size="sm" stickyHeader>
                <Table.Header>
                  <Table.Row bg="bg.subtle" zIndex="0">
                    <Table.ColumnHeader hideBelow={"md"}></Table.ColumnHeader>
                    <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="sm">Salary</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="md">Birthday</Table.ColumnHeader>
                    {auth?.role === "ADMIN" && <Table.ColumnHeader></Table.ColumnHeader>}
                  </Table.Row>
                </Table.Header>
                <Table.Body zIndex="-100">
                  {employees?.map((empl) => (
                    <Table.Row key={empl.id}>
                      <Table.Cell hideBelow={"md"}>
                        <Avatar.Root shape="full" size="lg">
                          <Avatar.Fallback name={empl.fullName} />
                          <Avatar.Image src={empl.avatar} />
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell>{empl.fullName}</Table.Cell>

                      <Table.Cell>
                        {auth?.role === "ADMIN" ? (
                          <EditField
                            field="department"
                            oldValue={empl.department}
                            submitter={(data) =>
                              mutationUpdate.mutate({ id: empl.id, fields: data })
                            }
                          />
                        ) : (
                          <Text>{empl.department}</Text>
                        )}
                      </Table.Cell>

                      <Table.Cell hideBelow="sm">
                        {auth?.role === "ADMIN" ? (
                          <EditField
                            field="salary"
                            oldValue={empl.salary}
                            submitter={(data) =>
                              mutationUpdate.mutate({ id: empl.id, fields: data })
                            }
                          />
                        ) : (
                          <Text>{empl.salary}</Text>
                        )}
                      </Table.Cell>

                      <Table.Cell hideBelow="md">{empl.birthDate}</Table.Cell>

                      {auth?.role === "ADMIN" && (
                        <Table.Cell>
                          <Button
                            size="xs"
                            background={bg}
                            onClick={() => mutationDel.mutate(empl.id)}
                            disabled={mutationDel.isPending}
                          >
                            Delete
                          </Button>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Stack>
        </>
      )}
    </>
  );
};

export default EmployeesTable;
