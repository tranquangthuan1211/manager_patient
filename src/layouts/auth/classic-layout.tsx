import { GuestGuard } from "src/guards/guest-guard";
import { Page as PageType } from "../../types/page";
import {Stack,styled,Box, Container} from '@mui/material';
import {FC, ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode;
}
const LayoutRoot = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    height: "100%",
  }));
export const Layout:FC<LayoutProps> = (props) => {
    const {children} = props;
    return (
        <LayoutRoot>
            <Box
                sx  = {{
                    display: "flex",
                    flex: "1 1 auto",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",

                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url(/background.jpg)",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: 0,
                    }
                }}
            >
                <Container
                    maxWidth = "sm"
                    sx = {{
                        py :{
                            xs: 3,
                            sm: 8
                        },
                        px:"6px",
                        zIndex: 1,
                        width: "500px",
                    }}
                >
                    {children}
                </Container>
            </Box>
        </LayoutRoot>
    );
}
