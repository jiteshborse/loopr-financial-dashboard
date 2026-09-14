import {
    Avatar,
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import type { AuthUser } from "../../types/auth";

interface SidebarProps {
    user?: AuthUser | null;
    currentPage?: "dashboard" | "transactions";
    onNavigate?: (page: "dashboard" | "transactions") => void;
}

export default function Sidebar({
    user,
    currentPage = "dashboard",
    onNavigate,
}: SidebarProps) {
    const userInitials = user?.name
        ? user.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "JB";

    return (
        <Box
            sx={{
                height: "100%",
                backgroundColor: "#0d131f",
                color: "#f8fafc",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Top Brand Banner */}
            <Box sx={{ p: 2.5, pb: 2 }}>
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "center" }}
                >
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2.5,
                            background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: "1.15rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        L
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.15,
                                color: "#ffffff",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Loopr AI
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "#818cf8",
                                fontWeight: 700,
                                fontSize: "0.68rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}
                        >
                            Financial Intelligence
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.07)" }} />

            {/* Navigation Section */}
            <Box sx={{ px: 1.5, py: 2 }}>
                <Typography
                    variant="caption"
                    sx={{
                        px: 1.5,
                        mb: 1,
                        display: "block",
                        color: "#64748b",
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                    }}
                >
                    Core Terminal
                </Typography>

                <List disablePadding>
                    <ListItemButton
                        selected={currentPage === "dashboard"}
                        onClick={() => onNavigate?.("dashboard")}
                        sx={{
                            borderRadius: 2.5,
                            mb: 0.75,
                            py: 1,
                            px: 1.75,
                            color:
                                currentPage === "dashboard"
                                    ? "#ffffff"
                                    : "#94a3b8",
                            transition: "all 0.15s ease",
                            "&.Mui-selected": {
                                backgroundColor: "rgba(99, 102, 241, 0.14)",
                                color: "#ffffff",
                                border: "1px solid rgba(99, 102, 241, 0.25)",
                                "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.22)",
                                },
                            },
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                color: "#ffffff",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 36,
                                color:
                                    currentPage === "dashboard"
                                        ? "#818cf8"
                                        : "#64748b",
                            }}
                        >
                            <DashboardIcon fontSize="small" />
                        </ListItemIcon>

                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight:
                                            currentPage === "dashboard"
                                                ? 700
                                                : 500,
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    Dashboard
                                </Typography>
                            }
                        />
                    </ListItemButton>

                    <ListItemButton
                        selected={currentPage === "transactions"}
                        onClick={() => onNavigate?.("transactions")}
                        sx={{
                            borderRadius: 2.5,
                            py: 1,
                            px: 1.75,
                            color:
                                currentPage === "transactions"
                                    ? "#ffffff"
                                    : "#94a3b8",
                            transition: "all 0.15s ease",
                            "&.Mui-selected": {
                                backgroundColor: "rgba(99, 102, 241, 0.14)",
                                color: "#ffffff",
                                border: "1px solid rgba(99, 102, 241, 0.25)",
                                "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.22)",
                                },
                            },
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                color: "#ffffff",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 36,
                                color:
                                    currentPage === "transactions"
                                        ? "#818cf8"
                                        : "#64748b",
                            }}
                        >
                            <ReceiptLongIcon fontSize="small" />
                        </ListItemIcon>

                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight:
                                            currentPage === "transactions"
                                                ? 700
                                                : 500,
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    Transactions
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </List>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Bottom Analyst Mini Card */}
            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        p: 1.75,
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                    >
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                            }}
                        >
                            {userInitials}
                        </Avatar>

                        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "0.82rem",
                                    color: "#f8fafc",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {user?.name ?? "Jitesh Borse"}
                            </Typography>

                            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                <FiberManualRecordIcon
                                    sx={{
                                        color: "#10b981",
                                        fontSize: "0.55rem",
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "#94a3b8",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    Active Session
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Box sx={{ mt: 1.5, pt: 1.25, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "#64748b",
                                fontSize: "0.68rem",
                                display: "block",
                            }}
                        >
                            Loopr v2.0 • Institutional Risk
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}