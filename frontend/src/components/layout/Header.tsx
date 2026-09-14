import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

interface HeaderProps {
    onMenuClick?: () => void;
    onLogout: () => void;
}

export default function Header({
    onMenuClick,
    onLogout,
}: HeaderProps) {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#0b0f14",
                borderBottom:
                    "1px solid rgba(255,255,255,0.08)",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    minHeight: 72,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {onMenuClick && (
                        <IconButton
                            onClick={onMenuClick}
                            sx={{
                                color: "white",
                                mr: 1,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box>
                        <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.55)"
                        >
                            Welcome back
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color="white"
                        >
                            Financial Overview
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                        }}
                    >
                        A
                    </Avatar>

                    <IconButton
                        onClick={onLogout}
                        title="Logout"
                        sx={{ color: "white" }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}