import { useState, type ReactNode } from "react";
import {
    Box,
    Drawer,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";
import type { AuthUser } from "../../types/auth";

interface AppShellProps {
    children: ReactNode;
    user: AuthUser | null;
    currentPage?: "dashboard" | "transactions";
    onLogout: () => void;
    onNavigate: (page: "dashboard" | "transactions") => void;
}

const DRAWER_WIDTH = 250;

export default function AppShell({
    children,
    user,
    currentPage = "dashboard",
    onLogout,
    onNavigate,
}: AppShellProps) {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md")
    );

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((open) => !open);
    };

    const handleMobileNavigate = (page: "dashboard" | "transactions") => {
        onNavigate(page);
        setMobileOpen(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#080c14",
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
                            backgroundColor: "#0d131f",
                            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                        },
                    }}
                >
                    <Sidebar
                        user={user}
                        currentPage={currentPage}
                        onNavigate={handleMobileNavigate}
                    />
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
                            backgroundColor: "#0d131f",
                            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                        },
                    }}
                >
                    <Sidebar
                        user={user}
                        currentPage={currentPage}
                        onNavigate={onNavigate}
                    />
                </Drawer>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    backgroundColor: "#080c14",
                }}
            >
                <Header
                    user={user}
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