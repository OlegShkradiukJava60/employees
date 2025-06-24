import {
  Avatar,
  Spinner,
  Stack,
  Table,
  Text,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Employee } from "../model/dto-types";
import apiClient from "../services/ApiClientJsonServer";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import { FC } from "react";
import { MutationFunction } from "@tanstack/react-query";
import useEmployeeFilters from "../state-management/store";


interface Props {
  deleteFn: MutationFunction;
  updateFn: MutationFunction;
}

const EmployeesTable: FC<Props> = ({ deleteFn, updateFn }) => {
  const {
    department,
    salaryFrom,
    salaryTo,
    ageFrom,
    ageTo,
  } = useEmployeeFilters();

  const {
    data: employees,
    error,
    isLoading,
  } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees", { department, salaryFrom, salaryTo, ageFrom, ageTo }],

    queryFn: () =>
      apiClient.getAll({
        department,
        salaryFrom,
        salaryTo,
        ageFrom,
        ageTo,
      }),
    staleTime: 3600_000,
  });

  const mutationDel = useEmployeesMutation(deleteFn);
  const mutationUpdate = useEmployeesMutation(updateFn);
  const bg = useColorModeValue("red.500", "red.200");

  return (
    <>
      {error ? (
        <Text color="red" fontSize="2xl">
          {error.message}
        </Text>
      ) : (
        <>
          {isLoading && <Spinner />}
          <Stack
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Table.ScrollArea
              borderWidth="1px"
              rounded="md"
              height="80vh"
              width={{ base: "100vw", sm: "95vw", md: "80vw" }}
            >
              <Table.Root size="sm" stickyHeader>
                <Table.Header>
                  <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader hideBelow="md" />
                    <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="sm">Salary</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="md">Birthday</Table.ColumnHeader>
                    <Table.ColumnHeader />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {employees?.map((empl) => (
                    <Table.Row key={empl.id}>
                      <Table.Cell hideBelow="md">
                        <Avatar.Root shape="full" size="lg">
                          <Avatar.Fallback name={empl.fullName} />
                          <Avatar.Image src={empl.avatar} />
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell>{empl.fullName}</Table.Cell>
                      <Table.Cell>
                        <EditField
                          field="department"
                          oldValue={empl.department}
                          submitter={(data) =>
                            mutationUpdate.mutate({ id: empl.id, fields: data })
                          }
                        />
                      </Table.Cell>
                      <Table.Cell hideBelow="sm">
                        <EditField
                          field="salary"
                          oldValue={empl.salary}
                          submitter={(data) =>
                            mutationUpdate.mutate({ id: empl.id, fields: data })
                          }
                        />
                      </Table.Cell>
                      <Table.Cell hideBelow="md">{empl.birthDate}</Table.Cell>
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
