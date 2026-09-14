import { useEffect, useState } from "react";

import LoginPage from "./features/auth/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import {
  getCurrentUser,
  logout,
} from "./features/auth/authApi";

import AppShell from "./components/layout/AppShell";
import LoadingState from "./components/common/LoadingState";

function App() {
  const [authenticated, setAuthenticated] =
    useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        await getCurrentUser();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      }
    }

    checkAuthentication();
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      setAuthenticated(false);
    }
  }

  if (authenticated === null) {
    return <LoadingState />;
  }

  if (!authenticated) {
    return (
      <LoginPage
        onLogin={() => setAuthenticated(true)}
      />
    );
  }

  return (
    <AppShell onLogout={handleLogout}>
      <DashboardPage />
    </AppShell>
  );
}

export default App;