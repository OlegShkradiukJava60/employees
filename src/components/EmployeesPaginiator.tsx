import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { pageSize } from '../../config/employees-config.json'
import { useEmployeesPagination } from '../state-management/store'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useColorModeValue } from './ui/color-mode';

const EmployeesPaginiator = () => {
  const page = useEmployeesPagination(s => s.page);
  const setPage = useEmployeesPagination(s => s.setPage);
  const count = useEmployeesPagination(s => s.count);
  const bgSelected = useColorModeValue("blue.500", "blue.200")

  return (

    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "solid" }} backgroundColor={{ _selected: bgSelected }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>

  )
}

export default EmployeesPaginiator