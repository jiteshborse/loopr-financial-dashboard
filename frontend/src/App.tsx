import {
  useEffect,
  useState
} from "react";

import {
  CircularProgress,
  Box
} from "@mui/material";

import {
  LoginPage
} from "../features/auth/LoginPage";

import {
  DashboardPage
} from "../features/dashboard/DashboardPage";

import {
  getCurrentUser,
  logout
} from "../features/auth/authApi";

export default function App() {
  const [authenticated, setAuthenticated] =
    useState<boolean | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(() =>
        setAuthenticated(true)
      )
      .catch(() =>
        setAuthenticated(false)
      );
  }, []);

  if (authenticated === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={() =>
          setAuthenticated(true)
        }
      />
    );
  }

  return (
    <DashboardPage />
  );
}