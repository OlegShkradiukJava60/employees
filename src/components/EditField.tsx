import { useState, FC } from "react";
import { Employee } from "../model/dto-types";
import { HStack, Text, IconButton } from "@chakra-ui/react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import {
  departments,
  minSalary,
  maxSalary,
} from "../../config/employees-config.json";
interface Props {
  submitter: (data: Partial<Employee>) => void;
  field: "department" | "salary";
  oldValue: string | number;
}
const EditField: FC<Props> = ({ submitter, field, oldValue }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string|number>(oldValue)
  const { register, reset, handleSubmit } = useForm<Employee>({
    defaultValues: {
      department: field === "department" ? (oldValue as string) : undefined,
      salary: field === "salary" ? (oldValue as number) : undefined,
    },
  });
  return (
    <>
      {editing ? (
        <HStack
          as="form"
          onSubmit={handleSubmit((data) => {
            submitter(data);
            setValue(data.department||data.salary)
            setEditing(false);
          })} onReset={() => reset()}
        >
          {field === "department" ? (
            <select {...register("department")}>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              min={minSalary}
              max={maxSalary}
              type="number"
              {...register("salary", { valueAsNumber: true, required: true })}
            />
          )}
          <IconButton size="xs" variant="outline" onClick={() => setEditing(false)}>
            <MdClose />
          </IconButton>
          <IconButton size="xs" variant="outline" type="submit">
            <FaCheck />
          </IconButton>
        </HStack>
      ) : (
        <HStack>
          <Text>{value}</Text>
          <IconButton
            size="xs"
            variant="ghost"
            onClick={() => setEditing(true)}
          >
            <FaEdit />
          </IconButton>
        </HStack>
      )}
    </>
  );
};

export default EditField;
