import { MutationFunction, useQuery } from "@tanstack/react-query";
import { Employee, SearchObject } from "../model/dto-types";

import { Avatar, Button, CloseButton, Dialog, Portal, Skeleton, SkeletonCircle, SkeletonText, Stack, Table } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useColorModeValue } from "../components/ui/color-mode";
import { FC, useEffect, useMemo, useState } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import useEmployeeFilters, { useAuthData, useEmployeesPagination } from "../state-management/store";
import _ from 'lodash';
import { pageSize } from '../../config/employees-config.json'
interface Props {
  deleteFn: MutationFunction,
  updateFn: MutationFunction,
  queryFn: (searchObj?: SearchObject) => Promise<Employee[]>
}
const EmployeesTable: FC<Props> = ({ deleteFn, updateFn, queryFn }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const { department, salaryFrom, salaryTo, ageFrom, ageTo } = useEmployeeFilters();
  const userData = useAuthData(s => s.userData);
  let searchObj: SearchObject | undefined = {};
  department && (searchObj.department = department);
  salaryFrom && (searchObj.salaryFrom = salaryFrom);
  salaryTo && (searchObj.salaryTo = salaryTo);
  ageFrom && (searchObj.ageFrom = ageFrom);
  ageTo && (searchObj.ageTo = ageTo);
  if (_.isEmpty(searchObj)) {
    searchObj = undefined
  }
  const queryKey: any[] = ["employees"]
  searchObj && queryKey.push(searchObj)
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery<Employee[], AxiosError>({
    queryKey,
    queryFn: () => queryFn(searchObj),
    staleTime: 3600_000
  });
  if (error) {
    throw error;
  }
  const mutationDel = useEmployeesMutation(deleteFn);
  const mutationUpdate = useEmployeesMutation(updateFn);
  const bg = useColorModeValue("red.500", "red.200");
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
                {isLoading
                  ? Array.from({ length: pageSize }).map((_, index) => (
                    <Table.Row key={index}>
                      <Table.Cell hideBelow={"md"}>
                        <SkeletonCircle size="10" />
                      </Table.Cell>
                      <Table.Cell>
                        <SkeletonText
                          noOfLines={1}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <SkeletonText
                          noOfLines={1}
                        />
                      </Table.Cell>
                      <Table.Cell hideBelow="sm">
                        <SkeletonText
                          noOfLines={1}
                        />
                      </Table.Cell>
                      <Table.Cell hideBelow="md">
                        <SkeletonText
                          noOfLines={1}
                        />
                      </Table.Cell>
                      {userData?.role === "ADMIN" && (
                        <Table.Cell>
                          <Skeleton height="30px" width="60px" />
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))
                  : employees &&
                  getEmployeesOnPage(employees).map((empl) => (
                    <Table.Row key={empl.id}>
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
                        <Button size="xs" background={bg} onClick={() => {
                          setEmployeeToDelete(empl);
                          setDialogOpen(true);
                        }} disabled={mutationDel.isPending}>Delete</Button>
                      </Table.Cell>}
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Stack>
      </>
      <Dialog.Root open={isDialogOpen} onOpenChange={(details) => {
        if (!details.open) {
          setEmployeeToDelete(null);
        }
        setDialogOpen(details.open)
      }} role="alertdialog">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Employee</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                Are you sure you want to delete {employeeToDelete?.fullName}? You can't undo this action.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline"></Button>
                </Dialog.CloseTrigger>
                <Button colorPalette="red" onClick={() => {
                  if (employeeToDelete) {
                    mutationDel.mutate(employeeToDelete.id);
                  }
                  setDialogOpen(false);
                }}>Delete</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top="2" right="2" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default EmployeesTable;