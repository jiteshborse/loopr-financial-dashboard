import { useState, type MouseEvent } from "react";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Popover,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import type { AuthUser } from "../../types/auth";

interface HeaderProps {
    user: AuthUser | null;
    onMenuClick?: () => void;
    onLogout: () => void;
}

export default function Header({
    user,
    onMenuClick,
    onLogout,
}: HeaderProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpenProfile = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setAnchorEl(null);
    };

    const isProfileOpen = Boolean(anchorEl);

    // Format last login timestamp nicely
    const formattedLastLogin = user?.lastLogin
        ? new Date(user.lastLogin).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
          })
        : "Active Session";

    const userInitials = user?.name
        ? user.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "JB";

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "rgba(8, 12, 20, 0.8)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    minHeight: 70,
                    px: { xs: 2, sm: 3 },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {onMenuClick && (
                        <IconButton
                            onClick={onMenuClick}
                            sx={{
                                color: "#94a3b8",
                                mr: 1.5,
                                "&:hover": { color: "#f8fafc" },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "#818cf8",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}
                        >
                            Institutional Terminal
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                color: "#f8fafc",
                                letterSpacing: "-0.015em",
                            }}
                        >
                            Financial Intelligence Overview
                        </Typography>
                    </Box>
                </Box>

                {/* Right Actions: Profile Button & Logout */}
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    {/* Interactive Profile Trigger */}
                    <Button
                        onClick={handleOpenProfile}
                        title="View Analyst Profile"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                            py: 0.75,
                            px: 1.25,
                            borderRadius: 2.5,
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            color: "#f8fafc",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: "rgba(99, 102, 241, 0.12)",
                                borderColor: "rgba(99, 102, 241, 0.3)",
                            },
                        }}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: "#10b981",
                                    color: "#10b981",
                                    boxShadow: "0 0 0 2px #080c14",
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 34,
                                    height: 34,
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                                    color: "#ffffff",
                                }}
                            >
                                {userInitials}
                            </Avatar>
                        </Badge>

                        <Box sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "0.85rem",
                                    lineHeight: 1.2,
                                    color: "#f8fafc",
                                }}
                            >
                                {user?.name ?? "Jitesh Borse"}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: "0.72rem",
                                    color: "#94a3b8",
                                    display: "block",
                                }}
                            >
                                {user?.title ?? "Senior Financial Analyst"}
                            </Typography>
                        </Box>
                    </Button>

                    {/* Profile Popover Details Card */}
                    <Popover
                        open={isProfileOpen}
                        anchorEl={anchorEl}
                        onClose={handleCloseProfile}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    mt: 1.5,
                                    width: 340,
                                    p: 2.5,
                                    backgroundColor: "#0d131f",
                                    backgroundImage: "none",
                                    borderRadius: 3.5,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                                },
                            },
                        }}
                    >
                        <Stack spacing={2}>
                            {/* Profile Header */}
                            <Stack direction="row" spacing={1.75} sx={{ alignItems: "center" }}>
                                <Avatar
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        fontSize: "1.1rem",
                                        fontWeight: 800,
                                        background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.35)",
                                    }}
                                >
                                    {userInitials}
                                </Avatar>

                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#ffffff",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {user?.name ?? "Jitesh Borse"}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "#818cf8", fontWeight: 600 }}
                                    >
                                        {user?.title ?? "Senior Financial Analyst"}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

                            {/* User Details */}
                            <Stack spacing={1.5}>
                                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                    <EmailOutlinedIcon sx={{ color: "#6366f1", fontSize: "1.15rem" }} />
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                                            Email Address
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: "#e2e8f0" }}>
                                            {user?.email ?? "analyst@loopr.dev"}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                    <LocationOnOutlinedIcon sx={{ color: "#0ea5e9", fontSize: "1.15rem" }} />
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                                            Location
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: "#e2e8f0" }}>
                                            {user?.location ?? "Pune, Maharashtra"}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                    <AccessTimeOutlinedIcon sx={{ color: "#f59e0b", fontSize: "1.15rem" }} />
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                                            Last Login
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: "#e2e8f0" }}>
                                            {formattedLastLogin}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>

                            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

                            {/* Session Status and Sign Out */}
                            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                                    <FiberManualRecordIcon sx={{ color: "#10b981", fontSize: "0.65rem" }} />
                                    <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                                        Active Analyst Session
                                    </Typography>
                                </Stack>

                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                        handleCloseProfile();
                                        onLogout();
                                    }}
                                    sx={{
                                        fontSize: "0.78rem",
                                        py: 0.5,
                                        px: 1.5,
                                        borderRadius: 2,
                                    }}
                                >
                                    Sign out
                                </Button>
                            </Stack>
                        </Stack>
                    </Popover>

                    {/* Independent Logout Button */}
                    <IconButton
                        onClick={onLogout}
                        title="Sign Out"
                        sx={{
                            color: "#94a3b8",
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: 2.5,
                            p: 1,
                            "&:hover": {
                                color: "#f43f5e",
                                backgroundColor: "rgba(244, 63, 94, 0.12)",
                                borderColor: "rgba(244, 63, 94, 0.3)",
                            },
                        }}
                    >
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}