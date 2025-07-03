
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, CheckCircle, XCircle, User, Clock } from "lucide-react";

export const AccessLogsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for access logs
  const accessLogs = [
    {
      id: 1,
      user: "John Doe",
      action: "Created Sale",
      parameters: "Sale ID: #1001, Amount: $25.50",
      timestamp: "2024-01-15 14:30:25",
      success: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated Inventory",
      parameters: "Item: Tomatoes, Quantity: +50",
      timestamp: "2024-01-15 14:25:12",
      success: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Failed Login Attempt",
      parameters: "IP: 192.168.1.100",
      timestamp: "2024-01-15 14:20:08",
      success: false,
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "Added Menu Item",
      parameters: "Item: Caesar Salad, Price: $12.50",
      timestamp: "2024-01-15 14:15:30",
      success: true,
    },
    {
      id: 5,
      user: "Tom Brown",
      action: "Generated Report",
      parameters: "Type: Daily Sales Summary",
      timestamp: "2024-01-15 14:10:45",
      success: true,
    },
  ];

  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "success" && log.success) ||
                         (statusFilter === "failed" && !log.success);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Access Logs</h2>
        <p className="text-gray-600">Monitor all system activities and user actions</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by user or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success Only</SelectItem>
            <SelectItem value="failed">Failed Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <Card key={log.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {log.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{log.action}</h4>
                      <Badge variant={log.success ? "default" : "destructive"}>
                        {log.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{log.user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{log.timestamp}</span>
                      </div>
                      {log.parameters && (
                        <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded">
                          {log.parameters}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredLogs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No access logs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
