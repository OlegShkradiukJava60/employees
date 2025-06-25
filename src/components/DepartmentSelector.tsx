import { Menu, Button, Portal} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import MotionComponent from './MotionComponent';
import {departments} from '../../config/employees-config.json'
import useEmployeeFilters from '../state-management/store';

const duration=0.7;
const DepartmentSelector: FC = () => {
   const [isOpen, setIsOpen] =  useState<boolean>(false);
   const department = useEmployeeFilters(s=>s.department);
   const setDepartment = useEmployeeFilters(s=>s.setDepartment);
   
  return (
    <>
    
        <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" marginBottom={3} onClick={() => setIsOpen(!isOpen)}>
         { department || "All Departments"}
          {isOpen ? <MotionComponent duration={duration}>
            <FaChevronUp></FaChevronUp>
          </MotionComponent> :<FaChevronDown></FaChevronDown>}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content>
            <Menu.Item key={"department"} value={""}
               onClick={() => {setDepartment(null); setIsOpen(false)}}>All Departments</Menu.Item>
              {departments.map(d => <Menu.Item key={d} value={d}
               onClick={() => {setDepartment(d); setIsOpen(false)}}>{d}</Menu.Item>)}
            </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
    </>
    
  )
}

export default DepartmentSelector