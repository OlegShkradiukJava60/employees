import { Menu, Button, Portal, Text } from '@chakra-ui/react'
import { FC,  useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import MotionComponent from '../components/MotionComponent';
import { NavLink, useLocation } from 'react-router-dom';


const duration=0.7;
const StatisticsSelector: FC = () => {
   const [isOpen, setIsOpen] =  useState<boolean>(false);
   const location = useLocation();
   const isActive = location.pathname.startsWith("/statistics")
  function getStatisticsName(): string {
    let res = "Statistics"
    const pathname = location.pathname;
    const lastPartInd = pathname.lastIndexOf('/') + 1;
    const lastPart = pathname.substring(lastPartInd);
    switch(lastPart) {
      case "age": res = "Age Statistics"; break;
      case "department": res = "Department Statistics"; break;
      case "salary": res = "Salary Statistics"; 
    }
    return res;
  }

  return (
    <>
    
        <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button fontWeight={isActive ? "bold" : "normal"} variant="outline" size="sm" marginTop="1vh" onClick={() => setIsOpen(!isOpen)} borderWidth={0}>
          <Text>{isActive ? getStatisticsName(): "Statistics"}</Text>
          {isOpen ? <MotionComponent duration={duration}>
            <FaChevronUp></FaChevronUp>
          </MotionComponent> :<FaChevronDown></FaChevronDown>}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content >
            <Menu.Item value="age">
              <NavLink to="/statistics/age">Age Statistics</NavLink>
            </Menu.Item>
            <Menu.Item value="age">
              <NavLink to="/statistics/salary">Salary Statistics</NavLink>
            </Menu.Item>
            <Menu.Item value="age">
              <NavLink to="/statistics/department">Department Statistics</NavLink>
            </Menu.Item>
            </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
    </>
    
  )
}

export default StatisticsSelector