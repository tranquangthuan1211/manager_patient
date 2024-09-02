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
import { useAuth } from "src/hooks/use-auth";
import {MobileNavPatient} from "../mobile-nav-patient"

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
  const {user} = useAuth();
  return (
    <>
      {!lgUp && user.role === "patient" &&
        (<MobileNavPatient  
          color={navColor} 
          onClose={mobileNav.handleClose} 
          open={mobileNav.open} 
          sections={sections} />)}
      {lgUp && (<SideNav color={navColor} sections={sections} />)}
      {!lgUp && user.role !== "patient" && (<TopNav onMobileNavOpen={mobileNav.handleOpen} />)}
      {!lgUp && user.role !== "patient" && (
          <MobileNav
            color={navColor}
            onClose={mobileNav.handleClose}
            open={mobileNav.open}
            sections={sections}
          />
        )}
        <VerticalLayoutRoot>
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
