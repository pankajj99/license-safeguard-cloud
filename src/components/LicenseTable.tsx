
import React from 'react';
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
  ArrowUpDown 
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

// Mock data for recent licenses
const recentLicenses = [
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
  }
];

const LicenseTable = () => {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Licenses</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">License ID</TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <span>Client</span>
                <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <span>Expiry Date</span>
                <ArrowUpDown size={14} />
              </div>
            </TableHead>
            <TableHead>Seats</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentLicenses.map(license => (
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
    </div>
  );
};

export default LicenseTable;
