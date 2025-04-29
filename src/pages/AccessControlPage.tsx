
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Plus, 
  Search, 
  User, 
  Users, 
  Key, 
  FileText,
  Settings,
  Bell,
  RefreshCw,
  Trash2,
  ChevronRight,
  CheckCircle,
  X
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

// Mock data for roles
const roles = [
  {
    id: 'role-1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    users: 3,
    default: false,
    permissions: {
      licenses: { view: true, create: true, edit: true, delete: true },
      clients: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, create: true, export: true },
      settings: { view: true, edit: true },
      users: { view: true, create: true, edit: true, delete: true }
    }
  },
  {
    id: 'role-2',
    name: 'License Manager',
    description: 'Manage licenses and clients',
    users: 8,
    default: false,
    permissions: {
      licenses: { view: true, create: true, edit: true, delete: false },
      clients: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: false, export: true },
      settings: { view: false, edit: false },
      users: { view: false, create: false, edit: false, delete: false }
    }
  },
  {
    id: 'role-3',
    name: 'Support Agent',
    description: 'View licenses and client information, handle support requests',
    users: 12,
    default: true,
    permissions: {
      licenses: { view: true, create: false, edit: false, delete: false },
      clients: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: false, export: false },
      settings: { view: false, edit: false },
      users: { view: false, create: false, edit: false, delete: false }
    }
  },
  {
    id: 'role-4',
    name: 'Auditor',
    description: 'View-only access to licenses, clients, and reports',
    users: 5,
    default: false,
    permissions: {
      licenses: { view: true, create: false, edit: false, delete: false },
      clients: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: true, export: true },
      settings: { view: false, edit: false },
      users: { view: false, create: false, edit: false, delete: false }
    }
  },
  {
    id: 'role-5',
    name: 'Client Manager',
    description: 'Manage client information and view licenses',
    users: 7,
    default: false,
    permissions: {
      licenses: { view: true, create: false, edit: false, delete: false },
      clients: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: false, export: false },
      settings: { view: false, edit: false },
      users: { view: false, create: false, edit: false, delete: false }
    }
  }
];

// Mock data for users
const users = [
  { id: 'user-1', name: 'John Smith', email: 'john.smith@clms.com', role: 'Administrator', status: 'active', lastLogin: '2024-04-29 08:45:12' },
  { id: 'user-2', name: 'Sarah Johnson', email: 'sarah.j@clms.com', role: 'License Manager', status: 'active', lastLogin: '2024-04-28 17:23:05' },
  { id: 'user-3', name: 'Michael Brown', email: 'm.brown@clms.com', role: 'Support Agent', status: 'active', lastLogin: '2024-04-29 09:10:32' },
  { id: 'user-4', name: 'Emily Wilson', email: 'e.wilson@clms.com', role: 'Auditor', status: 'active', lastLogin: '2024-04-27 14:52:18' },
  { id: 'user-5', name: 'Robert Garcia', email: 'r.garcia@clms.com', role: 'Client Manager', status: 'inactive', lastLogin: '2024-04-22 11:38:54' },
  { id: 'user-6', name: 'Jennifer Lee', email: 'j.lee@clms.com', role: 'Support Agent', status: 'active', lastLogin: '2024-04-29 08:05:47' },
  { id: 'user-7', name: 'David Miller', email: 'd.miller@clms.com', role: 'License Manager', status: 'active', lastLogin: '2024-04-28 16:12:39' },
  { id: 'user-8', name: 'Lisa Chen', email: 'l.chen@clms.com', role: 'Support Agent', status: 'pending', lastLogin: 'Never' },
];

const AccessControlPage = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [showNewRoleDialog, setShowNewRoleDialog] = useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [showRolePermissionsDialog, setShowRolePermissionsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Access Control</h1>
        <p className="text-gray-500 mt-1">Manage user roles and permissions</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield size={16} />
              <span>Roles</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Policies</span>
            </TabsTrigger>
          </TabsList>
          
          <div>
            {activeTab === 'roles' && (
              <Button 
                className="bg-clms-lightBlue hover:bg-clms-blue flex items-center gap-1" 
                onClick={() => setShowNewRoleDialog(true)}
              >
                <Plus size={16} />
                <span>New Role</span>
              </Button>
            )}
            
            {activeTab === 'users' && (
              <Button 
                className="bg-clms-lightBlue hover:bg-clms-blue flex items-center gap-1"
                onClick={() => setShowNewUserDialog(true)}
              >
                <Plus size={16} />
                <span>New User</span>
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="roles" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search roles..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles
                    .filter(role => 
                      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      role.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(role => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell>
                        {role.default && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Default
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            onClick={() => {
                              setSelectedRole(role.id);
                              setShowRolePermissionsDialog(true);
                            }}
                          >
                            Permissions
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">Edit</Button>
                          <Button variant="outline" size="sm" className="h-8 text-red-600">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="relative max-w-md flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select className="h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Roles</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
                
                <select className="h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    .filter(user => 
                      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${user.status === 'inactive' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                            ${user.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                          `}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8">Edit</Button>
                          <Button variant="outline" size="sm" className="h-8">Reset Password</Button>
                          <Button variant="outline" size="sm" className="h-8 text-red-600">
                            {user.status === 'active' ? 'Disable' : 'Enable'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure system-wide security settings and access policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 border-b pb-6">
                  <h3 className="text-md font-medium">Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Password Complexity</p>
                      <p className="text-sm text-gray-500">Require strong passwords with minimum requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Session Timeout</p>
                      <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                    </div>
                    <select className="h-9 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid gap-4 border-b pb-6">
                  <h3 className="text-md font-medium">Access Control</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">IP Restrictions</p>
                      <p className="text-sm text-gray-500">Limit system access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Concurrent Sessions</p>
                      <p className="text-sm text-gray-500">Limit users to one active session at a time</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Failed Login Attempts</p>
                      <p className="text-sm text-gray-500">Lock account after multiple failed attempts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="h-9 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="3">3 attempts</option>
                        <option value="5">5 attempts</option>
                        <option value="10">10 attempts</option>
                      </select>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <h3 className="text-md font-medium">Audit & Compliance</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Activity Logging</p>
                      <p className="text-sm text-gray-500">Record all user actions for audit purposes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Log Retention</p>
                      <p className="text-sm text-gray-500">Duration to keep system logs</p>
                    </div>
                    <select className="h-9 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Security Notifications</p>
                      <p className="text-sm text-gray-500">Send alerts for suspicious activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 gap-3">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button className="bg-clms-lightBlue hover:bg-clms-blue">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Role Dialog */}
      <Dialog open={showNewRoleDialog} onOpenChange={setShowNewRoleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role with custom permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Name</label>
              <Input className="col-span-3" placeholder="Role name" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Description</label>
              <textarea 
                className="col-span-3 w-full border border-gray-300 rounded-md p-3" 
                rows={3}
                placeholder="Role description"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Default</label>
              <div className="col-span-3 flex items-center">
                <Switch id="default-role" />
                <label htmlFor="default-role" className="ml-2 text-sm">
                  Set as default role for new users
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRoleDialog(false)}>Cancel</Button>
            <Button className="bg-clms-lightBlue hover:bg-clms-blue">Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New User Dialog */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user and assign a role
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Name</label>
              <Input className="col-span-3" placeholder="Full name" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Email</label>
              <Input className="col-span-3" type="email" placeholder="user@example.com" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Role</label>
              <select className="col-span-3 h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Password</label>
              <div className="col-span-3 flex flex-col gap-2">
                <Input type="password" placeholder="••••••••" />
                <div className="flex items-center gap-2">
                  <Switch id="send-email" defaultChecked />
                  <label htmlFor="send-email" className="text-sm">
                    Send welcome email with login details
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>Cancel</Button>
            <Button className="bg-clms-lightBlue hover:bg-clms-blue">Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Role Permissions Dialog */}
      <Dialog open={showRolePermissionsDialog} onOpenChange={setShowRolePermissionsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Role Permissions</DialogTitle>
            <DialogDescription>
              Configure access rights for {selectedRole ? roles.find(r => r.id === selectedRole)?.name : "this role"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Create</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Key size={16} />
                      <span>Licenses</span>
                    </div>
                  </TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch /></TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Clients</span>
                    </div>
                  </TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch /></TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>Reports</span>
                    </div>
                  </TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bell size={16} />
                      <span>Notifications</span>
                    </div>
                  </TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>Users</span>
                    </div>
                  </TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </div>
                  </TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell><Switch /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRolePermissionsDialog(false)}>Cancel</Button>
            <Button className="bg-clms-lightBlue hover:bg-clms-blue">Save Permissions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AccessControlPage;
