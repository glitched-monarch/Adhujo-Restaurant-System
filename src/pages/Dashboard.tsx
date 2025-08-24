
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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
  const [userRole, setUserRole] = useState<"admin" | "manager" | "staff">("admin"); // Mock user role
  
  const activeTab = searchParams.get('tab');

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
        return canAccessReports ? <UnifiedReportsPanel /> : <div>Access Denied</div>;
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

  // For modern panels, render them directly without sidebar
  const modernPanels = ['sales', 'inventory', 'menu', 'expenses'];
  if (modernPanels.includes(activeTab || '')) {
    return renderActivePanel();
  }

  // For other panels, use the sidebar layout
  const getPageTitle = () => {
    switch (activeTab) {
      case 'reports': return 'Reports & Financials';
      case 'users': return 'User Management';
      case 'logs': return 'Access Logs';
      case 'settings': return 'System Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar userRole={userRole} onLogout={handleLogout} />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {renderActivePanel()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
