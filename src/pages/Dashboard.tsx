
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TouchDashboard } from "@/components/restaurant/TouchDashboard";
import { ModernSalesPanel } from "@/components/restaurant/ModernSalesPanel";
import { ModernInventoryPanel } from "@/components/restaurant/ModernInventoryPanel";
import { ModernMenuPanel } from "@/components/restaurant/ModernMenuPanel";
import { ModernExpensePanel } from "@/components/restaurant/ModernExpensePanel";
import { UnifiedReportsPanel } from "@/components/restaurant/UnifiedReportsPanel";
import { UsersPanel } from "@/components/restaurant/UsersPanel";
import { AccessLogsPanel } from "@/components/restaurant/AccessLogsPanel";
import { SystemSettingsPanel } from "@/components/restaurant/SystemSettingsPanel";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<"admin" | "manager" | "staff">("admin");
  
  const activeTab = searchParams.get('tab');

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole") as "admin" | "manager" | "staff" | null;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const canAccessUsers = userRole === "admin";
  const canAccessExpenses = userRole === "admin" || userRole === "manager";
  const canAccessReports = userRole === "admin" || userRole === "manager";
  const canAccessMenu = userRole === "admin" || userRole === "manager";
  const canAccessSettings = userRole === "admin";

  // Show touch dashboard if no specific tab is selected
  if (!activeTab) {
    return <TouchDashboard userRole={userRole} />;
  }

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'sales':
        return <ModernSalesPanel />;
      case 'inventory':
        return <ModernInventoryPanel />;
      case 'menu':
        return canAccessMenu ? <ModernMenuPanel /> : <div>Access Denied</div>;
      case 'expenses':
        return canAccessExpenses ? <ModernExpensePanel /> : <div>Access Denied</div>;
      case 'reports':
        return <UnifiedReportsPanel userRole={userRole} />;
      case 'users':
        return canAccessUsers ? <UsersPanel /> : <div>Access Denied</div>;
      case 'logs':
        return canAccessUsers ? <AccessLogsPanel /> : <div>Access Denied</div>;
      case 'settings':
        return canAccessSettings ? <SystemSettingsPanel /> : <div>Access Denied</div>;
      default:
        return <TouchDashboard userRole={userRole} />;
    }
  };

  // Render all panels without sidebar layout
  return renderActivePanel();
};

export default Dashboard;
