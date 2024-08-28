import { Box } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import type { NavColor } from "src/types/settings";
import type { DashboardSection } from "../configs/config";
import { SideNav } from "./side-nav";
import { useMediaQuery } from "@mui/material";
import {useMobileNav} from "./use-mobile-nav";
import { MobileNav } from "../mobile-nav";
import {TopNav} from "./top-nav";

const SIDE_NAV_WIDTH: number = 280;

const VerticalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const VerticalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: DashboardSection[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mobileNav = useMobileNav()
  return (
    <>
      {lgUp && (<SideNav color={navColor} sections={sections} />)}
      {!lgUp && (<TopNav onMobileNavOpen={mobileNav.handleOpen} />)}
      {!lgUp && (
          <MobileNav
            color={navColor}
            onClose={mobileNav.handleClose}
            open={mobileNav.open}
            sections={sections}
          />
        )}
        <VerticalLayoutRoot
          // sx={{
          //   width: {
          //     xs: "auto",
          //     lg: "200px",
          //   },
          // }}
        >
          {/* <TopNav /> */}
          <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
        </VerticalLayoutRoot>
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  sections: PropTypes.array,
};
