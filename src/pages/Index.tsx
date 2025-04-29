
import React from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, BarChart } from '@/components/ReportCharts';
import { 
  Key, 
  Search,
  Filter,
  Plus, 
  Download,
  RefreshCw,
  Calendar,
  BarChart3
} from 'lucide-react';

import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the CLMS Admin Dashboard</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">License Activity</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="7days">
                  <SelectTrigger className="w-[180px] h-8 text-xs">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw size={14} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <LineChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Upcoming Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <Calendar size={18} className="text-clms-lightBlue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Client {item}</p>
                      <p className="text-xs text-gray-500">License L-389{item}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item < 3 ? 'Tomorrow' : `In ${item} days`}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-clms-lightBlue">
                      Remind
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm mt-2">View All Renewals</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="licenses">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="licenses">Recent Licenses</TabsTrigger>
              <TabsTrigger value="clients">Recent Clients</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Filter size={14} />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Download size={14} />
                <span>Export</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="licenses" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>License ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Seats</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">L-390{i}</TableCell>
                        <TableCell>Client {i}</TableCell>
                        <TableCell>Enterprise Suite</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            i % 3 === 0 ? 'bg-yellow-100 text-yellow-700' : 
                            i % 3 === 1 ? 'bg-green-100 text-green-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {i % 3 === 0 ? 'Pending' : 
                             i % 3 === 1 ? 'Active' : 
                             'Expired'}
                          </span>
                        </TableCell>
                        <TableCell>May {10 + i}, 2024</TableCell>
                        <TableCell>May {10 + i}, 2025</TableCell>
                        <TableCell>{20 * i}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clients" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Licenses</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">C-100{i}</TableCell>
                        <TableCell>Client Organization {i}</TableCell>
                        <TableCell>Contact {i}</TableCell>
                        <TableCell>City {i}</TableCell>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            i % 2 === 0 ? 'bg-green-100 text-green-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {i % 2 === 0 ? 'Active' : 'New'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">License Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="h-full w-full flex items-center justify-center">
                    <BarChart />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Seat Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 pt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">License L-390{i}</span>
                          <span className="text-sm text-gray-500">
                            {i * 15}/{i * 20} seats
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-clms-blue h-2 rounded-full" 
                            style={{ width: `${(i * 15) / (i * 20) * 100}%` }}
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">License Management</CardTitle>
            <Button className="bg-clms-lightBlue hover:bg-clms-blue flex items-center gap-1" size="sm">
              <Plus size={16} />
              <span>Issue License</span>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="px-6 pb-4 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px]">
                <p className="text-sm font-medium mb-1.5">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Renew</Button>
                  <Button variant="outline" size="sm" className="text-xs">Revoke</Button>
                  <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                  <Button variant="outline" size="sm" className="text-xs">Transfer</Button>
                </div>
              </div>
              
              <div className="flex-1 min-w-[240px]">
                <p className="text-sm font-medium mb-1.5">Bulk Operations</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Mass Renewal</Button>
                  <Button variant="outline" size="sm" className="text-xs">Mass Import</Button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input 
                    placeholder="Search licenses..." 
                    className="pl-9 text-sm h-9"
                  />
                </div>
                <Select defaultValue="active">
                  <SelectTrigger className="w-[160px] h-9 text-sm">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Licenses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-2 px-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-3 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="font-medium">License L-390{i}</p>
                    <p className="text-sm text-gray-500">Client Organization {i}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                          i % 3 === 0 ? 'bg-yellow-400' : 
                          i % 3 === 1 ? 'bg-green-400' : 
                          'bg-red-400'
                        }`}></span>
                        {i % 3 === 0 ? 'Pending' : 
                         i % 3 === 1 ? 'Active' : 
                         'Expired'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Expires: May {10 + i}, 2025
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Notification Service</p>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                    Operational
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '98%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last checked: 5 mins ago</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Authentication Service</p>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                    Operational
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last checked: 5 mins ago</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">License Validation</p>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">
                    Degraded
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full" style={{ width: '82%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last checked: 5 mins ago</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">API Endpoints</p>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                    Operational
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '95%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last checked: 5 mins ago</p>
              </div>
              
              <Button className="w-full text-xs" variant="outline">
                <BarChart3 className="mr-1" size={14} />
                View Full System Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
