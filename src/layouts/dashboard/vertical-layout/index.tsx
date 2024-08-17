import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import type { NavColor } from "src/types/settings";
import type { DashboardSection } from "../configs/config";
import { SideNav } from "./side-nav";
// import TopNav from "./top-nav";

export const SIDE_NAV_WIDTH: number = 280;

const VerticalLayoutRoot = styled("div")<{ paddingLeft?: boolean }>(() => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  maxWidth: "100%",
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

  return (
    <>
      <SideNav color={navColor} sections={sections} />
      <Box
        sx={{
          display: "flex",
          paddingLeft: SIDE_NAV_WIDTH + 'px',
          marginTop: "30px",
        }}
      >
        <VerticalLayoutRoot
          sx={{
            width: {
              xs: "auto",
              lg: "200px",
            },
          }}
        >
          {/* <TopNav /> */}
          <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
        </VerticalLayoutRoot>
      </Box>
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  sections: PropTypes.array,
};
