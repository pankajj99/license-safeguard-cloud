import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  MoreHorizontal, 
  Filter, 
  Download,
  Plus,
  Search,
  Users,
  Building,
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LineChart } from '@/components/ReportCharts';

// Mock data for clients
const clients = [
  {
    id: 'C-1001',
    name: 'Acme Corporation',
    contactName: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '(555) 123-4567',
    licenseCount: 3,
    activeSubscriptions: 2,
    status: 'active',
    lastLogin: '2023-10-15',
    created: '2022-06-10'
  },
  {
    id: 'C-1002',
    name: 'TechGlobal Inc.',
    contactName: 'Sarah Johnson',
    email: 'sarah.j@techglobal.com',
    phone: '(555) 987-6543',
    licenseCount: 5,
    activeSubscriptions: 5,
    status: 'active',
    lastLogin: '2023-10-18',
    created: '2022-01-22'
  },
  {
    id: 'C-1003',
    name: 'Innovative Solutions',
    contactName: 'Michael Brown',
    email: 'm.brown@innovative.com',
    phone: '(555) 456-7890',
    licenseCount: 2,
    activeSubscriptions: 1,
    status: 'inactive',
    lastLogin: '2023-08-30',
    created: '2022-09-15'
  },
  {
    id: 'C-1004',
    name: 'Global Systems Ltd.',
    contactName: 'Emma Wilson',
    email: 'emma@globalsys.com',
    phone: '(555) 234-5678',
    licenseCount: 4,
    activeSubscriptions: 3,
    status: 'active',
    lastLogin: '2023-10-19',
    created: '2021-11-08'
  },
  {
    id: 'C-1005',
    name: 'Future Tech',
    contactName: 'Robert Garcia',
    email: 'r.garcia@futuretech.com',
    phone: '(555) 876-5432',
    licenseCount: 1,
    activeSubscriptions: 1,
    status: 'pending',
    lastLogin: 'Never',
    created: '2023-10-01'
  },
];

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all-clients');

  // Filter clients based on search query and status filter
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'active').length;
  const totalLicenses = clients.reduce((sum, client) => sum + client.licenseCount, 0);
  const activeSubscriptions = clients.reduce((sum, client) => sum + client.activeSubscriptions, 0);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <p className="text-gray-500 mt-1">View and manage your client accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <h3 className="text-2xl font-bold">{totalClients}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-clms-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <h3 className="text-2xl font-bold">{activeClients}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Building className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Licenses</p>
                <h3 className="text-2xl font-bold">{totalLicenses}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                <h3 className="text-2xl font-bold">{activeSubscriptions}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Info className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all-clients" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all-clients">All Clients</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-clients" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Search clients..." 
                      className="pl-9 pr-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Filter size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={16} />
                    <span>Export</span>
                  </Button>
                  
                  <Button size="sm" className="bg-clms-lightBlue hover:bg-clms-blue flex items-center gap-1">
                    <Plus size={16} />
                    <span>Add Client</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Licenses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map(client => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.contactName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="flex items-center gap-1">
                                {client.activeSubscriptions}/{client.licenseCount}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Active/Total Licenses</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${client.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${client.status === 'inactive' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                            ${client.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                          `}
                        >
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.lastLogin}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit client</DropdownMenuItem>
                            <DropdownMenuItem>View licenses</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredClients.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No clients found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="w-[300px] h-[300px]">
                  <LineChart />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>License Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clients.map(client => (
                    <div key={client.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{client.name}</span>
                        <span className="text-sm text-gray-500">
                          {client.activeSubscriptions}/{client.licenseCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-clms-blue h-2.5 rounded-full" 
                          style={{ 
                            width: `${(client.activeSubscriptions / client.licenseCount) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ClientsPage;
