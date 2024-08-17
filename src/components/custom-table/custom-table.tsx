/**
 * 26/01/2024
 * UPDATE: Disable and blur table on loading
 * UPDATE: Receive custom sort model
 */

import { Clear, Edit, Warning } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  StackProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { isValid } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getObjectValue } from "src/utils/obj-helper";
import { Scrollbar } from "../scroll-bar";
import { CustomTableCell } from "./custom-table-cell";
import { CustomTableHeader } from "./custom-table-header";
import { CustomTableProps, CustomTableSortModel } from "./custom-table.types";

export function CustomTable<P, T extends { id: P; [key: string]: any }>(
  props: CustomTableProps<P, T> & StackProps
) {
  const {
    rows,
    configs,
    actions,
    renderRowActions,
    cellProps,
    tableProps,
    scrollbarProps,
    children,
    onClickRow,
    onClickEdit,
    onClickDelete,
    onClickDetail,
    onUpdate,
    indexColumn,
    select,
    pagination,
    additionalTopRow,
    additionalBottomRow,
    loading,
    flexible,
    emptyState,
    sortModel: customSortModel,
    onChangeSortModel,
    ...stackProps
  } = props;

  const [_sortModel, setSortModel] = useState<CustomTableSortModel<P, T>>();
  const sortModel = onChangeSortModel ? customSortModel : _sortModel;
  const [isMounted, setIsMounted] = useState(false);
  const scrollBar = useRef<any>(null);

  const sortedRows = useMemo(() => {
    if (onChangeSortModel) {
      return rows;
    }
    const config = configs.find((c) => c.key == sortModel?.key);
    if (!sortModel || !config) {
      return rows;
    }
    const sortDirection = sortModel.direction == "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const valueA = getObjectValue(a, sortModel.key);
      const valueB = getObjectValue(b, sortModel.key);
      if (!valueA) return 1;
      if (!valueB) return -1;
      if (config.type == "date" || config.type == "datetime") {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        if (!isValid(dateA)) return 1;
        if (!isValid(dateB)) return -1;
        return (dateA.getTime() - dateB.getTime()) * sortDirection;
      }
      if (config.type == "number" || config.type == "float") {
        return (Number(valueA) - Number(valueB)) * sortDirection;
      }
      return String(valueA).localeCompare(String(valueB)) * sortDirection;
    });
  }, [configs, onChangeSortModel, rows, sortModel]);

  const pagedRows = useMemo(() => {
    return pagination
      ? sortedRows.slice(
          pagination.rowsPerPage * (pagination.page - 1),
          pagination.rowsPerPage * pagination.page
        )
      : sortedRows;
  }, [pagination, sortedRows]);

  const handleClickSort = useCallback(
    (key: keyof T | string) => {
      const f = onChangeSortModel || setSortModel;
      if (key == sortModel?.key && sortModel.direction == "desc") {
        f(undefined);
      } else {
        f({
          key: key,
          direction: sortModel?.key != key ? "asc" : "desc",
        });
      }
    },
    [onChangeSortModel, sortModel?.direction, sortModel?.key]
  );

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000);
    const interval = setInterval(() => scrollBar.current?.recalculate?.(), 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack {...stackProps}>
      {children}
      <Scrollbar {...scrollbarProps} ref={scrollBar}>
        <Table
          {...tableProps}
          sx={{
            minWidth: 700,
            // display: isMounted ? "inline-table" : undefined,
            position: "relative",
            tableLayout: isMounted && flexible ? "fixed" : undefined,
            transition: "opacity 0.1s ease",
            ...(props.loading
              ? {
                  pointerEvents: "none",
                  opacity: 0.5,
                }
              : {}),
            ...tableProps?.sx,
          }}
        >
          <CustomTableHeader
            {...props}
            sortModel={onChangeSortModel ? customSortModel : sortModel}
            onClickSort={handleClickSort}
          />
          <TableBody>
            {additionalTopRow}
            {pagedRows.map((row, index) => (
              <TableRow
                hover={!!onClickRow}
                onClick={onClickRow ? () => onClickRow(row, index) : undefined}
                key={row.id + "-key-" + index}
                sx={{
                  whiteSpace: "nowrap",
                  px: 2,
                  bgcolor: row.error ? "error.lightest" : undefined,
                  cursor: onClickRow ? "pointer" : undefined,
                }}
              >
                {(indexColumn || select) && (
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    {...cellProps}
                  >
                    <Stack direction="row" gap={1} alignItems="center">
                      {select && (
                        <Checkbox
                          sx={{ my: -1, mx: -0.5 }}
                          checked={select.selected.includes(row)}
                          onChange={(e, checked) =>
                            checked
                              ? select.handleSelectOne(row)
                              : select.handleDeselectOne(row)
                          }
                        />
                      )}
                      {indexColumn && <>{index + 1}</>}
                      {row.error && (
                        <Tooltip title={row.error}>
                          <Warning color="error" />
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                )}
                {configs.map((config) => (
                  <CustomTableCell
                    key={config.key.toString()}
                    cellProps={cellProps}
                    data={row}
                    config={config}
                    onUpdate={async (value) =>
                      await onUpdate?.(config.key, value, row, index)
                    }
                  />
                ))}

                {(onClickDelete ||
                  onClickDetail ||
                  onClickEdit ||
                  renderRowActions) && (
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <Stack direction="row" justifyContent="flex-end" my={-0.5}>
                      {renderRowActions?.(row, index)}
                      {onClickEdit && (
                        <IconButton onClick={() => onClickEdit(row, index)}>
                          <Edit
                            sx={{ height: "20px", width: "20px" }}
                            color="primary"
                          />
                        </IconButton>
                      )}
                      {onClickDelete && (
                        <IconButton onClick={() => onClickDelete(row, index)}>
                          <Clear
                            sx={{ height: "20px", width: "20px" }}
                            color="error"
                          />
                        </IconButton>
                      )}
                      {onClickDetail && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => onClickDetail(row, index)}
                          size="small"
                        >
                          Chi tiết
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {additionalBottomRow}
          </TableBody>
        </Table>
        {(loading || rows.length == 0) && <Stack height={104} />}
      </Scrollbar>
      {(loading || rows.length == 0) && (
        <Stack
          marginTop={-30}
          height={50}
          width={"100%"}
          alignItems="center"
          justifyContent="center"
          position="sticky"
          left={0}
          top={props.loading ? 12 : undefined}
        >
          {loading ? (
            <CircularProgress />
          ) : emptyState ? (
            emptyState
          ) : (
            <Typography variant="subtitle1">No data</Typography>
          )}
        </Stack>
      )}
      {/* {pagination && (
        <Pagination
          sx={{ p: 2, "& .MuiPagination-ul": { justifyContent: "center" } }}
          page={pagination.page}
          count={pagination.totalPages}
          onChange={pagination.onPageChange}
          size="large"
          color="primary"
        />
      )} */}
    </Stack>
  );
}
