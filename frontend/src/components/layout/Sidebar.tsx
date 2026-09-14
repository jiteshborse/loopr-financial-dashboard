import {
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
import AssessmentIcon from "@mui/icons-material/Assessment";

interface SidebarProps {
    onNavigate?: (
        page: "dashboard" | "transactions"
    ) => void;
}

export default function Sidebar({
    onNavigate,
}: SidebarProps) {
    return (
        <Box
            sx={{
                height: "100%",
                backgroundColor: "#11161d",
                color: "white",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ p: 3 }}
            >
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        backgroundColor: "#ffffff",
                        color: "#11161d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                    }}
                >
                    L
                </Box>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Loopr
                </Typography>
            </Stack>

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,0.08)",
                }}
            />

            <List sx={{ px: 1.5, py: 2 }}>
                <ListItemButton
                    onClick={() =>
                        onNavigate?.("dashboard")
                    }
                ></ListItemButton>
                <ListItemButton
                    selected
                    onClick={onNavigate}
                    sx={{
                        borderRadius: 2,
                        color: "white",
                        "&.Mui-selected": {
                            backgroundColor:
                                "rgba(255,255,255,0.10)",
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <DashboardIcon sx={{ color: "inherit" }} />
                    </ListItemIcon>

                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    onClick={onNavigate}
                    sx={{
                        borderRadius: 2,
                        color: "rgba(255,255,255,0.65)",
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <ReceiptLongIcon sx={{ color: "inherit" }} />
                    </ListItemIcon>

                    <ListItemText primary="Transactions" />
                </ListItemButton>
                <ListItemButton
                    onClick={() =>
                        onNavigate?.("transactions")
                    }
                ></ListItemButton>

                <ListItemButton
                    onClick={onNavigate}
                    sx={{
                        borderRadius: 2,
                        color: "rgba(255,255,255,0.65)",
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <AssessmentIcon sx={{ color: "inherit" }} />
                    </ListItemIcon>

                    <ListItemText primary="Analytics" />
                </ListItemButton>
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ p: 3 }}>
                <Typography
                    variant="caption"
                    color="rgba(255,255,255,0.4)"
                >
                    Financial Analytics
                </Typography>
            </Box>
        </Box>
    );
}