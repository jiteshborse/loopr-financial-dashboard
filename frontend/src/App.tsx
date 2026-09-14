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
import type { AuthUser } from "./types/auth";

type Page = "dashboard" | "transactions";

function App() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [page, setPage] = useState<Page>("dashboard");

  async function checkAuthentication() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setAuthenticated(true);
    } catch {
      setUser(null);
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      setUser(null);
      setAuthenticated(false);
      setPage("dashboard");
    }
  }

  async function handleLoginSuccess() {
    await checkAuthentication();
  }

  if (authenticated === null) {
    return <LoadingState />;
  }

  if (!authenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  return (
    <AppShell
      user={user}
      currentPage={page}
      onLogout={handleLogout}
      onNavigate={setPage}
    >
      {page === "dashboard" && <DashboardPage user={user} />}
      {page === "transactions" && <TransactionsPage />}
    </AppShell>
  );
}

export default App;