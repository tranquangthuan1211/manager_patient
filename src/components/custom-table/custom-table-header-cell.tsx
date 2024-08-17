import { TableSortLabel, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  CustomTableProps,
  CustomTableSortModel,
  CustomTableConfig,
} from "./custom-table.types";
import { CardTableResizableCell } from "../card-table/card-table-resizable-cell";

export function CustomTableHeaderCell<
  P,
  T extends { id: P; [key: string]: any }
>(
  props: CustomTableProps<P, T> & {
    sortModel?: CustomTableSortModel<P, T>;
    onClickSort?: (key: keyof T | string) => void;
    onResize?: () => void;
    hasGroupedHeaderLabel: boolean;
    config: CustomTableConfig<P, T>;
  }
) {
  const { hasGroupedHeaderLabel, configs, config, sortModel, onClickSort } =
    props;

  return (
    <CardTableResizableCell
      {...config.headerCellProps}
      onResize={props.onResize}
      sx={{
        whiteSpace: "nowrap",
        position: "relative",
        ...config.headerCellProps?.sx,
      }}
      rowSpan={!config.groupedHeaderLabel && hasGroupedHeaderLabel ? 2 : 1}
      colSpan={
        !config.groupedHeaderLabel
          ? 1
          : configs.filter(
              (c) => c.groupedHeaderLabel == config.groupedHeaderLabel
            ).length
      }
      align={!config.groupedHeaderLabel ? undefined : "center"}
    >
      {config.groupedHeaderLabel || (
        <TableSortLabel
          active={sortModel?.key == config.key}
          direction={sortModel?.key == config.key ? sortModel.direction : "asc"}
          onClick={() => onClickSort?.(config.key)}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Stack
            gap={1}
            alignItems="center"
            direction="row"
            justifyContent="center"
          >
            {config.headerIcon}
            <Typography variant="subtitle1">{config.headerLabel}</Typography>
          </Stack>
        </TableSortLabel>
      )}
    </CardTableResizableCell>
  );
}
