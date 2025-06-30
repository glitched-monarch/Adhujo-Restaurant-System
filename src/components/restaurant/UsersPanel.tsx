
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Shield, User } from "lucide-react";

interface SystemUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "inactive";
  lastLogin: Date;
}

export const UsersPanel = () => {
  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: "1",
      username: "admin",
      email: "admin@restaurant.com",
      role: "admin",
      status: "active",
      lastLogin: new Date("2024-01-05T10:30:00")
    },
    {
      id: "2",
      username: "manager1",
      email: "manager@restaurant.com",
      role: "manager",
      status: "active",
      lastLogin: new Date("2024-01-05T09:15:00")
    },
    {
      id: "3",
      username: "staff1",
      email: "staff1@restaurant.com",
      role: "staff",
      status: "active",
      lastLogin: new Date("2024-01-04T16:45:00")
    },
    {
      id: "4",
      username: "staff2",
      email: "staff2@restaurant.com",
      role: "staff",
      status: "inactive",
      lastLogin: new Date("2024-01-02T14:20:00")
    }
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "staff" as "admin" | "manager" | "staff",
    password: ""
  });

  const addUser = () => {
    if (!newUser.username || !newUser.email || !newUser.password) return;

    const user: SystemUser = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: new Date()
    };

    setUsers([...users, user]);
    setNewUser({ username: "", email: "", role: "staff", password: "" });
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "manager":
        return <UserPlus className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "manager":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New User */}
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button onClick={addUser} className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </CardContent>
        </Card>

        {/* User Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>System user overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Total Users: {users.length}</div>
                <div>Active Users: {users.filter(u => u.status === "active").length}</div>
                <div>Admins: {users.filter(u => u.role === "admin").length}</div>
                <div>Managers: {users.filter(u => u.role === "manager").length}</div>
                <div>Staff: {users.filter(u => u.role === "staff").length}</div>
                <div>Inactive: {users.filter(u => u.status === "inactive").length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 w-fit">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Overview of what each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-red-500" />
                <h4 className="font-semibold">Admin</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• All reports and analytics</li>
                <li>• System configuration</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="h-5 w-5 text-blue-500" />
                <h4 className="font-semibold">Manager</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sales management</li>
                <li>• Inventory management</li>
                <li>• Reports viewing</li>
                <li>• Staff oversight</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-green-500" />
                <h4 className="font-semibold">Staff</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Process sales</li>
                <li>• View inventory</li>
                <li>• Basic reporting</li>
                <li>• Order management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
