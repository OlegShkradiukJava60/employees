import { FC } from "react"
import { DepartmentInfo } from "../pages/DepartmentStatisticsPage"
import { HStack, Table } from "@chakra-ui/react"

interface Props {
    depStatistics: DepartmentInfo[]
}
const DepartmentStatisticsTable: FC<Props> = ({depStatistics}) => {
  return (
    <HStack justifyContent={"center"}>
        <Table.Root size="sm" showColumnBorder width={"60vw"} height={"50vh"} alignItems={"center"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Department</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Number of Employees</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Average Salary</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Average Age</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {depStatistics.map((item) => (
              <Table.Row key={item.department}>
                <Table.Cell>{item.department}</Table.Cell>
                <Table.Cell textAlign="end">{item.nEmployees}</Table.Cell>
                <Table.Cell textAlign="end">{item.avgSalary}</Table.Cell>
                <Table.Cell textAlign="end">{item.avgAge}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
    </HStack>
  )
}

export default DepartmentStatisticsTable
