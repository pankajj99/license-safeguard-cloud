
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
  Plus
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for licenses
const licenses = [
  {
    id: 'L-3892',
    client: 'Acme Corporation',
    product: 'Enterprise Suite Pro',
    status: 'active',
    startDate: '10/15/2023',
    expiryDate: '10/14/2024',
    seats: 250
  },
  {
    id: 'L-3891',
    client: 'TechGlobal Inc.',
    product: 'Security Manager',
    status: 'active',
    startDate: '10/10/2023',
    expiryDate: '10/09/2024',
    seats: 100
  },
  {
    id: 'L-3890',
    client: 'Innovative Solutions',
    product: 'Data Analyzer Pro',
    status: 'expiring',
    startDate: '05/22/2023',
    expiryDate: '11/21/2023',
    seats: 50
  },
  {
    id: 'L-3889',
    client: 'Global Systems Ltd.',
    product: 'Network Monitor',
    status: 'expired',
    startDate: '10/01/2022',
    expiryDate: '09/30/2023',
    seats: 75
  },
  {
    id: 'L-3888',
    client: 'Future Tech',
    product: 'Cloud Storage Pro',
    status: 'active',
    startDate: '09/15/2023',
    expiryDate: '09/14/2024',
    seats: 120
  },
  {
    id: 'L-3887',
    client: 'DataCore Systems',
    product: 'Enterprise Suite Pro',
    status: 'active',
    startDate: '09/01/2023',
    expiryDate: '08/31/2024',
    seats: 200
  },
  {
    id: 'L-3886',
    client: 'Omega Innovations',
    product: 'Security Manager',
    status: 'expiring',
    startDate: '02/15/2023',
    expiryDate: '11/14/2023',
    seats: 80
  },
  {
    id: 'L-3885',
    client: 'NexTech Solutions',
    product: 'Data Analyzer Pro',
    status: 'active',
    startDate: '08/20/2023',
    expiryDate: '08/19/2024',
    seats: 35
  }
];

const LicensesPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">License Management</h1>
        <p className="text-gray-500 mt-1">View and manage all software licenses</p>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative max-w-xs">
              <Input placeholder="Search licenses..." className="pl-3 pr-10" />
            </div>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
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
              <span>New License</span>
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">License ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {licenses.map(license => (
              <TableRow key={license.id}>
                <TableCell className="font-medium">{license.id}</TableCell>
                <TableCell>{license.client}</TableCell>
                <TableCell>{license.product}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      ${license.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${license.status === 'expiring' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                      ${license.status === 'expired' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    `}
                  >
                    {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{license.startDate}</TableCell>
                <TableCell>{license.expiryDate}</TableCell>
                <TableCell>{license.seats}</TableCell>
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
                      <DropdownMenuItem>Renew license</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Revoke</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm text-gray-500">
            Showing 8 of 256 licenses
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LicensesPage;
