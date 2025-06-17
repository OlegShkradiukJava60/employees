
import { DepartmentStatistics } from "../model/dto-types";
import { Table } from "@chakra-ui/react";


interface Props {
  data: DepartmentStatistics[]
}

const DepartmentStatisticsTable = ({ data }: Props) => {
  return (
    <Table.Root size="sm" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Department</Table.ColumnHeader>
          <Table.ColumnHeader>Employees</Table.ColumnHeader>
          <Table.ColumnHeader>Average Salary</Table.ColumnHeader>
          <Table.ColumnHeader>Average Age</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.map((dept) => (
          <Table.Row key={dept.department}>
            <Table.Cell>{dept.department}</Table.Cell>
            <Table.Cell>{dept.employeeCount}</Table.Cell>
            <Table.Cell>{dept.averageSalary}</Table.Cell>
            <Table.Cell>{dept.averageAge}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}



export default DepartmentStatisticsTable;