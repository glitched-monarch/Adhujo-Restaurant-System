
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, UserCheck, UserX, Edit2, Trash2, Calendar, FileText, Clock } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const UsersPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [excusalForm, setExcusalForm] = useState({
    staffId: "",
    date: "",
    reason: "",
    approved: false
  });

  const handleBack = () => {
    setSearchParams({});
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      // Transform data to match expected format
      const transformedUsers = data.map(user => ({
        id: user.id,
        name: user.username, // Using username as name since no name field exists
        email: `${user.username}@restaurant.com`, // Mock email
        role: user.role,
        status: "active", // Default status
        lastLogin: "Recently", // Mock last login
      }));

      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const attendanceRecords = [
    {
      id: 1,
      staffName: "John Doe",
      date: "2024-01-15",
      clockIn: "08:00 AM",
      clockOut: "06:00 PM",
      totalHours: "10h 0m",
      status: "present"
    },
    {
      id: 2,
      staffName: "Jane Smith",
      date: "2024-01-15",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      totalHours: "8h 0m",
      status: "present"
    },
    {
      id: 3,
      staffName: "Mike Johnson",
      date: "2024-01-15",
      clockIn: "-",
      clockOut: "-",
      totalHours: "0h 0m",
      status: "absent"
    },
    {
      id: 4,
      staffName: "Sarah Wilson",
      date: "2024-01-15",
      clockIn: "08:30 AM",
      clockOut: "-",
      totalHours: "In Progress",
      status: "present"
    }
  ];

  const excusalRecords = [
    {
      id: 1,
      staffName: "Mike Johnson",
      date: "2024-01-15",
      reason: "Medical appointment",
      approved: true,
      submittedBy: "Sarah Wilson"
    },
    {
      id: 2,
      staffName: "Alice Cooper",
      date: "2024-01-14",
      reason: "Family emergency",
      approved: false,
      submittedBy: "John Doe"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  const handleSubmitExcusal = () => {
    if (excusalForm.staffId && excusalForm.date && excusalForm.reason) {
      console.log("Excusal submitted:", excusalForm);
      setExcusalForm({ staffId: "", date: "", reason: "", approved: false });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "manager": return "secondary";
      case "staff": return "outline";
      default: return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === "active" ? "default" : "destructive";
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800";
      case "absent": return "bg-red-100 text-red-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">Manage user accounts, attendance, and permissions</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Sheet</TabsTrigger>
            <TabsTrigger value="excusals">Excusal Forms</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Role:</span>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status === "active" ? (
                            <><UserCheck className="h-3 w-3 mr-1" /> Active</>
                          ) : (
                            <><UserX className="h-3 w-3 mr-1" /> Inactive</>
                          )}
                        </Badge>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-500">
                          Last login: {user.lastLogin}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Daily Attendance Sheet
                </CardTitle>
                <CardDescription>Track staff attendance and working hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Staff Name</th>
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Clock In</th>
                        <th className="text-left p-3">Clock Out</th>
                        <th className="text-left p-3">Total Hours</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords.map((record) => (
                        <tr key={record.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{record.staffName}</td>
                          <td className="p-3">{record.date}</td>
                          <td className="p-3">{record.clockIn}</td>
                          <td className="p-3">{record.clockOut}</td>
                          <td className="p-3">{record.totalHours}</td>
                          <td className="p-3">
                            <Badge className={getAttendanceStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Excusals Tab */}
          <TabsContent value="excusals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Submit Excusal Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submit Excusal Form
                  </CardTitle>
                  <CardDescription>Report staff absence with reason</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="staffSelect">Select Staff Member</Label>
                    <Select value={excusalForm.staffId} onValueChange={(value) => setExcusalForm({...excusalForm, staffId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.name} - {user.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="excusalDate">Date of Absence</Label>
                    <Input
                      id="excusalDate"
                      type="date"
                      value={excusalForm.date}
                      onChange={(e) => setExcusalForm({...excusalForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="excusalReason">Reason for Absence</Label>
                    <Textarea
                      id="excusalReason"
                      placeholder="Enter reason for absence..."
                      value={excusalForm.reason}
                      onChange={(e) => setExcusalForm({...excusalForm, reason: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleSubmitExcusal} className="w-full">
                    Submit Excusal Form
                  </Button>
                </CardContent>
              </Card>

              {/* Excusal Records */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Excusal Records</CardTitle>
                  <CardDescription>View submitted excusal forms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {excusalRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{record.staffName}</h4>
                          <Badge variant={record.approved ? "default" : "secondary"}>
                            {record.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Date: {record.date}</p>
                        <p className="text-sm mb-2">{record.reason}</p>
                        <p className="text-xs text-gray-500">Submitted by: {record.submittedBy}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
