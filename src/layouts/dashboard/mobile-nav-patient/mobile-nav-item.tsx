import type { FC, ReactNode } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import { Box, ButtonBase, Collapse, SvgIcon } from '@mui/material';
import { RouterLink } from 'src/components/router-link';

interface MobileNavItemProps {
  active?: boolean;
  children?: ReactNode;
  depth?: number;
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  open?: boolean;
  path?: string;
}

export const MobileNavItem: FC<MobileNavItemProps> = (props) => {
  const {
    active,
    children,
    depth = 0,
    disabled,
    external,
    icon,
    open: openProp,
    path,
  } = props;
  const [open, setOpen] = useState<boolean>(!!openProp);

  const handleToggle = useCallback(
    (): void => {
      setOpen((prevOpen) => !prevOpen);
    },
    []
  );

  // Icons can be defined at top level only, deep levels have bullets instead of actual icons.

  let startIcon: ReactNode;

  if (depth === 0) {
    startIcon = icon;
  } else {
    startIcon = (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: 30,
          justifyContent: 'center',
          width: 30
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: 'var(--nav-item-icon-color)',
            height: 4,
            opacity: 0, // remove this if you want it to be visible
            width: 4,
            ...(active && {
              backgroundColor: 'var(--nav-item-icon-active-color)',
              height: 10,
              opacity: 1,
              width: 10
            })
          }}
        />
      </Box>
    );
  }

  const offset = depth === 0 ? 0 : (depth - 1) * 16;

  // Branch

  if (children) {
    return (
      <li>
        <ButtonBase
          disabled={disabled}
          onClick={handleToggle}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: `${16 + offset}px`,
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              ...(depth === 0 && {
                backgroundColor: 'var(--nav-item-active-bg)'
              })
            }),
            '&:hover': {
              backgroundColor: 'var(--nav-item-hover-bg)'
            }
          }}
        >
          {startIcon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'var(--nav-item-icon-color)',
                display: 'inline-flex',
                justifyContent: 'center',
                ...(active && {
                  color: 'var(--nav-item-icon-active-color)'
                })
              }}
            >
              {startIcon}
            </Box>
          )}
          <SvgIcon
            sx={{
              color: 'var(--nav-item-chevron-color)',
              fontSize: 16,
              ml: 2
            }}
          >
            {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </SvgIcon>
        </ButtonBase>
        <Collapse
          in={open}
          sx={{ mt: 0.5 }}
        >
          {children}
        </Collapse>
      </li>
    );
  }

  // Leaf

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: RouterLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        disabled={disabled}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'center',
          pl: `${16 + offset}px`,
          pr: '16px',
          py: '6px',
          width: '100%',
          ...(active && {
            ...(depth === 0 && {
              backgroundColor: 'var(--nav-item-active-bg)'
            })
          }),
          '&:hover': {
            backgroundColor: 'var(--nav-item-hover-bg)'
          }
        }}
        {...linkProps}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'var(--nav-item-icon-color)',
              display: 'flex',
              justifyContent: 'center',
              height:30,
              width:30,
              ...(active && {
                color: 'var(--nav-item-icon-active-color)'
              })
            }}
          >
            {startIcon}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};

MobileNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
};
