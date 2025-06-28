
import {
  minAge,
  maxAge
} from "../../config/employees-config.json";
import RangeFilter from "./RangeFilter";

const AgeFilter = () => {
  return <RangeFilter title="age" min={minAge} max={maxAge}/>
};

export default AgeFilter;
