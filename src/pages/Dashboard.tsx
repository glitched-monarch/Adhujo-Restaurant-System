
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SalesPanel } from "@/components/restaurant/SalesPanel";
import { InventoryPanel } from "@/components/restaurant/InventoryPanel";
import { ReportsPanel } from "@/components/restaurant/ReportsPanel";
import { UsersPanel } from "@/components/restaurant/UsersPanel";
import { ExpensePanel } from "@/components/restaurant/ExpensePanel";
import { MenuManagementPanel } from "@/components/restaurant/MenuManagementPanel";
import { AccessLogsPanel } from "@/components/restaurant/AccessLogsPanel";
import { SystemSettingsPanel } from "@/components/restaurant/SystemSettingsPanel";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<"admin" | "manager" | "staff">("admin"); // Mock user role
  
  const activeTab = searchParams.get('tab') || 'sales';

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const canAccessUsers = userRole === "admin";
  const canAccessExpenses = userRole === "admin" || userRole === "manager";
  const canAccessReports = userRole === "admin" || userRole === "manager";
  const canAccessMenu = userRole === "admin" || userRole === "manager";
  const canAccessSettings = userRole === "admin";

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'sales':
        return <SalesPanel />;
      case 'inventory':
        return <InventoryPanel />;
      case 'menu':
        return canAccessMenu ? <MenuManagementPanel /> : <div>Access Denied</div>;
      case 'expenses':
        return canAccessExpenses ? <ExpensePanel /> : <div>Access Denied</div>;
      case 'reports':
        return canAccessReports ? <ReportsPanel /> : <div>Access Denied</div>;
      case 'users':
        return canAccessUsers ? <UsersPanel /> : <div>Access Denied</div>;
      case 'logs':
        return canAccessUsers ? <AccessLogsPanel /> : <div>Access Denied</div>;
      case 'settings':
        return canAccessSettings ? <SystemSettingsPanel /> : <div>Access Denied</div>;
      default:
        return <SalesPanel />;
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
              <h1 className="text-xl font-semibold">
                {activeTab === 'sales' && 'Sales Management'}
                {activeTab === 'inventory' && 'Inventory Management'}
                {activeTab === 'menu' && 'Menu Management'}
                {activeTab === 'expenses' && 'Expense Management'}
                {activeTab === 'reports' && 'Reports & Analytics'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'logs' && 'Access Logs'}
                {activeTab === 'settings' && 'System Settings'}
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {renderActivePanel()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
