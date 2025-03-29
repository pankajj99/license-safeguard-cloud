
import React from 'react';
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
  Building,
  Users,
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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for clients
const clients = [
  {
    id: 'C-2001',
    name: 'Acme Corporation',
    industry: 'Technology',
    country: 'USA',
    licenses: 5,
    contact: 'John Smith',
    email: 'john@acmecorp.com',
    status: 'active'
  },
  {
    id: 'C-2002',
    name: 'TechGlobal Inc.',
    industry: 'Software',
    country: 'Canada',
    licenses: 3,
    contact: 'Sarah Johnson',
    email: 'sarah@techglobal.com',
    status: 'active'
  },
  {
    id: 'C-2003',
    name: 'Innovative Solutions',
    industry: 'Consulting',
    country: 'UK',
    licenses: 2,
    contact: 'Michael Brown',
    email: 'michael@innovative.com',
    status: 'inactive'
  },
  {
    id: 'C-2004',
    name: 'Global Systems Ltd.',
    industry: 'Manufacturing',
    country: 'Germany',
    licenses: 4,
    contact: 'Emma Schmidt',
    email: 'emma@globalsystems.de',
    status: 'active'
  },
  {
    id: 'C-2005',
    name: 'Future Tech',
    industry: 'Technology',
    country: 'Australia',
    licenses: 2,
    contact: 'James Wilson',
    email: 'james@futuretech.au',
    status: 'active'
  },
  {
    id: 'C-2006',
    name: 'DataCore Systems',
    industry: 'Software',
    country: 'USA',
    licenses: 6,
    contact: 'Lisa Chen',
    email: 'lisa@datacore.com',
    status: 'active'
  }
];

const ClientsPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <p className="text-gray-500 mt-1">View and manage all client accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Building className="text-clms-lightBlue" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Clients</p>
              <h3 className="text-2xl font-bold">{clients.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <Users className="text-clms-green" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Clients</p>
              <h3 className="text-2xl font-bold">
                {clients.filter(client => client.status === 'active').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100">
              <Building className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Top Industry</p>
              <h3 className="text-xl font-bold">Technology</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative max-w-xs">
              <Input placeholder="Search clients..." className="pl-3 pr-10" />
            </div>
            
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
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Client ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Licenses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.industry}</TableCell>
                <TableCell>{client.country}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.licenses}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      client.status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }
                  >
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default ClientsPage;
