import { useCallback, useState } from "react";

interface UsePaginationProps {
  count: number;
  initialRowsPerPage?: number;
  base1Index?: boolean;
}

export interface UsePaginationResult {
  count: number;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (event: any, newPage: number) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function usePagination({
  count,
  initialRowsPerPage,
  base1Index,
}: UsePaginationProps): UsePaginationResult {
  const [page, setPage] = useState(base1Index ? 1 : 0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage || 10);

  const totalPages = Math.ceil(count / rowsPerPage);

  const onPageChange = useCallback((event: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const onRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return {
    count,
    page,
    rowsPerPage,
    totalPages,
    onPageChange,
    onRowsPerPageChange,
  };
}

export default usePagination;
