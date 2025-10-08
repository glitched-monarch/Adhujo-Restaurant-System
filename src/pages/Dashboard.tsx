
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const [userRole, setUserRole] = useState<"admin" | "manager" | "staff">("staff");
  const [loading, setLoading] = useState(true);
  
  const activeTab = searchParams.get('tab');

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', parseInt(userId))
          .single();

        if (!error && data) {
          setUserRole(data.role as "admin" | "manager" | "staff");
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Role-based access control
  // Staff: Can add sales, view inventory (read-only), view reports (sales & inventory only)
  const isStaff = userRole === "staff";
  const isManager = userRole === "manager";
  const isAdmin = userRole === "admin";

  const canAccessSales = true; // All roles can access sales
  const canAccessInventory = true; // All roles (read-only for staff)
  const canAccessMenu = isAdmin || isManager;
  const canAccessExpenses = isAdmin || isManager;
  const canAccessReports = true; // All roles (limited view for staff)
  const canAccessUsers = isAdmin;
  const canAccessSettings = isAdmin;
  const canAccessLogs = isAdmin;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show touch dashboard if no specific tab is selected
  if (!activeTab) {
    return <TouchDashboard userRole={userRole} />;
  }

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'sales':
        return canAccessSales ? <ModernSalesPanel /> : <TouchDashboard userRole={userRole} />;
      case 'inventory':
        // Staff can view but not modify inventory
        return canAccessInventory ? <ModernInventoryPanel /> : <TouchDashboard userRole={userRole} />;
      case 'menu':
        return canAccessMenu ? <ModernMenuPanel /> : <TouchDashboard userRole={userRole} />;
      case 'expenses':
        return canAccessExpenses ? <ModernExpensePanel /> : <TouchDashboard userRole={userRole} />;
      case 'reports':
        return canAccessReports ? <UnifiedReportsPanel userRole={userRole} /> : <TouchDashboard userRole={userRole} />;
      case 'users':
        return canAccessUsers ? <UsersPanel /> : <TouchDashboard userRole={userRole} />;
      case 'logs':
        return canAccessLogs ? <AccessLogsPanel /> : <TouchDashboard userRole={userRole} />;
      case 'settings':
        return canAccessSettings ? <SystemSettingsPanel /> : <TouchDashboard userRole={userRole} />;
      default:
        return <TouchDashboard userRole={userRole} />;
    }
  };

  // Render all panels without sidebar layout
  return renderActivePanel();
};

export default Dashboard;
