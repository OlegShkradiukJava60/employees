import { QueryFunction, useQuery } from "@tanstack/react-query";
import { Employee } from "../model/dto-types";
import { AxiosError } from "axios";

 export default function useEmployeesQuery(queryKey: any[], queryFn: QueryFunction<Employee[]>){
    const res = useQuery<Employee[], AxiosError>({
    queryKey,
    queryFn,
    staleTime: 3600_000
  });
   if (res.error) {
    throw res.error;
  }
    return res;
 }
 
 