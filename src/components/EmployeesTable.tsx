import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import { Employee } from "../model/dto-types";
import { Avatar, Stack, Table, HStack, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import { FC, useEffect, useMemo } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import _ from 'lodash';
import { pageSize } from '../../config/employees-config.json'
import ConfirmDialog from "./ConfirmDialog";
import { useAuthData, useEmployeesPagination } from "../state-management/store";
import useEmployeesQuery from "../hooks/useEmployeesQuery";
interface Props {
  deleteFn: MutationFunction,
  updateFn: MutationFunction,
  queryFn: QueryFunction<Employee[]>,
  queryKey: any[]
}
const EmployeesTable: FC<Props> = ({ deleteFn, updateFn, queryFn, queryKey }) => {
  const userData = useAuthData(s => s.userData);

  const {
    data: employees,
  } = useEmployeesQuery(queryKey, queryFn)

  const mutationDel = useEmployeesMutation(deleteFn);
  const mutationUpdate = useEmployeesMutation(updateFn);

  const page = useEmployeesPagination(s => s.page);
  const setCount = useEmployeesPagination(s => s.setCount);
  const setPage = useEmployeesPagination(s => s.setPage);

  useEffect(() => {
    console.log("setCount is called")
    const count = employees?.length || 0;
    setCount(count);
    if ((page - 1) * pageSize >= count) {
      setPage(1);
    }

  }, [employees])
  const { startIndex, endIndex } = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return { startIndex, endIndex }
  }, [page])
  function getEmployeesOnPage(employees: Employee[]) {
    return employees.slice(startIndex, endIndex)
  }

  return (
    <>

      <>

        <Stack
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Table.ScrollArea
            borderWidth="1px"
            rounded="md"
            height="70vh"
            width={{
              base: "100vw",
              sm: "95vw",
              md: "80vw"
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
                  {userData?.role === "ADMIN" && <Table.ColumnHeader></Table.ColumnHeader>}
                </Table.Row>
              </Table.Header>
              <Table.Body zIndex="-100">
                {!employees && Array.from({ length: pageSize }, () => <HStack gap="5">
                  <SkeletonCircle size="12" />

                  <Skeleton height="5" width="80%" />
                  <Skeleton height="5" width="80%" />
                  <Skeleton height="5" width="80%" />
                  <Skeleton height="5" width="80%" />
                </HStack>)}
                {employees && getEmployeesOnPage(employees).map((empl) => (
                  <Table.Row key={empl.id} >
                    <Table.Cell hideBelow={"md"}>
                      <Avatar.Root shape="full" size="lg">
                        <Avatar.Fallback name={empl.fullName} />
                        <Avatar.Image src={empl.avatar} />
                      </Avatar.Root>
                    </Table.Cell>
                    <Table.Cell >{empl.fullName}</Table.Cell>
                    <Table.Cell>
                      {userData?.role === "ADMIN" ? <EditField field="department" oldValue={empl.department} submitter={(data) =>
                        mutationUpdate.mutate({ id: empl.id, fields: data })} /> : empl.department}
                    </Table.Cell>
                    <Table.Cell hideBelow="sm">
                      {userData?.role === "ADMIN" ? <EditField field="salary" oldValue={empl.salary} submitter={(data) =>
                        mutationUpdate.mutate({ id: empl.id, fields: data })} /> : empl.salary}
                    </Table.Cell>
                    <Table.Cell hideBelow="md">{empl.birthDate}</Table.Cell>
                    {userData?.role === "ADMIN" && <Table.Cell >
                      <ConfirmDialog content={`Deleting employee ${empl.fullName}`} onClose={(isDelete) => {
                        isDelete && mutationDel.mutate(empl.id)
                      }} isPending={mutationDel.isPending}></ConfirmDialog>
                    </Table.Cell>}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>

        </Stack>
      </>
    </>
  );
};

export default EmployeesTable;
