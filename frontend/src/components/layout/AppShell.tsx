import { ReactNode, useState } from "react";
import {
    Box,
    Drawer,
    useMediaQuery,
    useTheme,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellProps {
    children: ReactNode;
    onLogout: () => void;
}

const DRAWER_WIDTH = 240;

export default function AppShell({
    children,
    onLogout,
}: AppShellProps) {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md")
    );

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((open) => !open);
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#0b0f14",
            }}
        >
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: DRAWER_WIDTH,
                        },
                    }}
                >
                    <Sidebar onNavigate={handleDrawerToggle} />
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,

                        "& .MuiDrawer-paper": {
                            width: DRAWER_WIDTH,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Sidebar />
                </Drawer>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                }}
            >
                <Header
                    onMenuClick={
                        isMobile ? handleDrawerToggle : undefined
                    }
                    onLogout={onLogout}
                />

                

                {children}
            </Box>
        </Box>
    );
}