
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesPanel } from "@/components/restaurant/SalesPanel";
import { InventoryPanel } from "@/components/restaurant/InventoryPanel";
import { ReportsPanel } from "@/components/restaurant/ReportsPanel";
import { UsersPanel } from "@/components/restaurant/UsersPanel";
import { DollarSign, Package, FileText, Users, LogOut } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("sales");

  const handleLogout = () => {
    // Implement logout logic
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Management System</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-6">
            <SalesPanel />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <InventoryPanel />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ReportsPanel />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UsersPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
