import type { FC } from "react";
import PropTypes from "prop-types";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import { SxProps } from "@mui/system";
import {
  Box,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { TenantPopover } from "./tenant-popover";

const tenants: string[] = ["Devias", "Acme Corp"];

interface TenantSwitchProps {
  sx?: SxProps;
}

export const TenantSwitch: FC<TenantSwitchProps> = (props) => {
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="subtitle1" fontWeight="bold">
            MDE - Chăm Sóc Sức Khỏe
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
            sx={{ fontSize: "11px", fontWeight: 500, lineHeight: 1.2 }}
          >
            Hệ thống quản lý bệnh nhân
          </Typography>
        </Box>
        {/* <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton> */}
      </Stack>
      <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={tenants}
      />
    </>
  );
};

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object,
};
