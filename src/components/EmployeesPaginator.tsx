import {
  ButtonGroup,
  IconButton,
  Pagination,
  Stack,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useEmployeesPaginationStore } from "../state-management/EmployeesPaginationStore";
import employeesConfig from "../../config/employees-config.json";

const EmployeesPaginator = () => {
  const { page, setPage, count} = useEmployeesPaginationStore();
  const pageSize = employeesConfig.pageSize || 6;
;

  return (
    <Stack gap="4" mt={4} alignItems="center">
      <Pagination.Root
        count={count}
        pageSize={pageSize}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Previous page">
              <HiChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                key={page.value}
                variant={{ base: "ghost", _selected: "outline" }}
                aria-current={page.value ? "page" : undefined}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Next page">
              <HiChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};

export default EmployeesPaginator;
