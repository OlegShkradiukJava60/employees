import { FC,  useState} from "react";
import { VStack, Text, IconButton, HStack} from "@chakra-ui/react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

import useEmployeeFilters from "../state-management/store";
interface Props {
    title: string;
    min: number;
    max: number;
}
const RangeFilter: FC<Props> = ({title, min, max}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const from = useEmployeeFilters(s => title === "salary" ? s.salaryFrom: s.ageFrom) ?? min;
  const setFrom = useEmployeeFilters(s => title === "salary" ? s.setSalaryFrom : s.setAgeFrom);
  const to = useEmployeeFilters(s => title === "salary" ? s.salaryTo : s.ageTo) ?? max;
  const setTo = useEmployeeFilters(s => title === "salary" ? s.setSalaryTo: s.setAgeTo);
  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);
  
  const onReset = () => {
            setFrom(min);
            setTo(max);
            setFromValue(min);
            setToValue(max);
            reset();
             setEditing(false);
          }
  const onSubmit = () => {
            setFrom(fromValue);
            setTo(toValue)
            setEditing(false);
          }
  const onChangeFrom = (value: number) => {
    if(value >= min && value < toValue) {
        setFromValue(value)
    } 
  }
  const onChangeTo = (value: number) => {
    if(value > fromValue && value <= max) {
        setToValue(value)
    } 
  }
  const { register,  handleSubmit, reset } = useForm<{from: number, to: number}>({
    defaultValues: {from: min, to: max}
  });
  return (
    <>
      {editing ? (
        <VStack
          as="form"
          onSubmit={handleSubmit(_ => onSubmit())}
        >
            <Text as="label" opacity={"0.5"}>From {`[${min} - ${toValue - 1}]`}</Text>
            <input 
              min={min}
              max={toValue - 1}
              type="number"
            
              {...register("from", { valueAsNumber: true, required: true, onChange: (event) => onChangeFrom(+event.target.value), value: fromValue})}
            />
            <Text as="label" opacity={"0.5"}>To {`[${fromValue + 1} - ${max}]`}</Text>
            <input
              min={fromValue + 1}
              max={max}
              type="number"
              {...register("to", { valueAsNumber: true, required: true, onChange: (event) => onChangeTo(+event.target.value)})}
            />
          
          <HStack>
              <IconButton size="xs" variant="outline" onClick={onReset}>
                <MdClose />
              </IconButton>
              <IconButton size="xs" variant="outline" type="submit">
                <FaCheck />
              </IconButton>
          </HStack>
        </VStack>
      ) : (
        <HStack marginBottom={3}>
          <Text>{`${title} filter [${from} - ${to}]`}</Text>
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

export default RangeFilter;
