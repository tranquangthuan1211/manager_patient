import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";
import viLocale from "date-fns/locale/vi";
import { DateRangePickerWrapperProps } from "mui-daterange-picker/dist/components/DateRangePickerWrapper";
import { CalendarToday } from "@mui/icons-material";

interface DateRangePickerTextFieldProps
  extends Omit<DateRangePickerWrapperProps, "toggle" | "open"> {
  onClear: () => void;
}

function DateRangePickerTextField(props: DateRangePickerTextFieldProps) {
  const [inputDialogOpen, setInputDialogOpen] = useState(false);

  return (
    <>
      <TextField
        label="Chọn khoảng thời gian"
        fullWidth
        value={`${
          props.initialDateRange?.startDate?.toLocaleDateString("vi-VN") || ""
        } - ${
          props.initialDateRange?.endDate?.toLocaleDateString("vi-VN") || ""
        }`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarToday />
            </InputAdornment>
          ),
        }}
        onClick={() => {
          setInputDialogOpen(true);
        }}
      />

      <Dialog
        open={inputDialogOpen}
        onClose={() => {
          setInputDialogOpen(false);
        }}
      >
        <DateRangePicker
          definedRanges={[]}
          toggle={() => {
            setInputDialogOpen(!inputDialogOpen);
          }}
          initialDateRange={props.initialDateRange}
          open={inputDialogOpen}
          onChange={(date) => {
            props.onChange(date);
            setInputDialogOpen(false);
          }}
          locale={viLocale}
        />
        <DialogContent>
          <Button
            onClick={() => {
              props.onClear();
              props.onChange({});
              setInputDialogOpen(false);
            }}
          >
            Xoá
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DateRangePickerTextField;
