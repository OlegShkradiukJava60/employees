import React, { FC } from "react";
import { Employee } from "../model/dto-types";
import { useForm } from "react-hook-form";
import employeesConfig from "../../config/employees-config.json"
import {
  Stack,
  SimpleGrid,
  HStack,
  Field,
  NativeSelect,
  Button,
  Input,
} from "@chakra-ui/react";
import { getDateFromAge } from "../util/functions";
interface Props {
  submitter: (empl: Employee) => void;
}

const EmployeeForm: FC<Props> = ({ submitter }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>();
  return (
    <Stack as="form" onSubmit={handleSubmit(data => submitter(data))} height="80vh"  justifyContent={"space-around"}>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 3,
        }} gap={10} marginLeft={"10vh"}
      >
        <Field.Root invalid={!!errors.department}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root size="sm" width="80%">
            <NativeSelect.Field
              placeholder="Select Department"
              {...register("department", { required: true })}
            >
                {employeesConfig.departments.map(d => <option key={d} value={d}>{d}</option>)}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>Department must be selected</Field.ErrorText>
        </Field.Root>
         <Field.Root invalid={!!errors.fullName} width="80%">
          <Field.Label>Full name</Field.Label>
          <Input {...register("fullName", {required: true})} size="sm" placeholder="enter full name"/>
          <Field.ErrorText>Full Name is required</Field.ErrorText>
        </Field.Root>     
        <Field.Root invalid={!!errors.birthDate} width="80%">
          <Field.Label>Birthdate</Field.Label>
          <Input {...register("birthDate", {required:true})} type="date" min={getDateFromAge(employeesConfig.maxAge)}
          max={getDateFromAge(employeesConfig.minAge)} size="sm"/>
          <Field.ErrorText>Birthdate is required</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.salary}width="80%">
          <Field.Label>Salary</Field.Label>
          <Input {...register("salary",{required: true, valueAsNumber: true, min: employeesConfig.minSalary,
             max: employeesConfig.maxSalary})}type="number" size="sm" placeholder={`enetr salary [${employeesConfig.minSalary}-${employeesConfig.maxSalary}]`}/>
          <Field.ErrorText>{`Salary must be in the range [${employeesConfig.minSalary}-${employeesConfig.maxSalary}]`}</Field.ErrorText>
        </Field.Root>
      </SimpleGrid>
      <HStack justifyContent={'space-around'} >
        <Button type="submit" colorPalette={"blue"} variant="subtle">Save</Button>
        <Button type="reset" colorPalette={"blue"} variant="subtle">Reset</Button>
      </HStack>
    </Stack>
  );
};

export default EmployeeForm;
