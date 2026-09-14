import { useEffect, useState } from "react";

import LoginPage from "./features/auth/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import TransactionsPage from "./features/transactions/TransactionsPage";

import {
  getCurrentUser,
  logout,
} from "./features/auth/authApi";

import AppShell from "./components/layout/AppShell";
import LoadingState from "./components/common/LoadingState";

type Page =
  | "dashboard"
  | "transactions";

function App() {
  const [authenticated, setAuthenticated] =
    useState<boolean | null>(null);

  const [page, setPage] =
    useState<Page>("dashboard");

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
      setPage("dashboard");
    }
  }

  if (authenticated === null) {
    return <LoadingState />;
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
    <AppShell
      onLogout={handleLogout}
      onNavigate={setPage}
    >
      {page === "dashboard" && (
        <DashboardPage />
      )}

      {page === "transactions" && (
        <TransactionsPage />
      )}
    </AppShell>
  );
}

export default App;