
import {
  minSalary,
  maxSalary
} from "../../config/employees-config.json";
import RangeFilter from "./RangeFilter";

const SalaryFilter = () => {
  return <RangeFilter title="salary" min={minSalary} max={maxSalary}/>
};

export default SalaryFilter;
