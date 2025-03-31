
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
  Filter, 
  Download,
  FileText,
  MoreHorizontal,
  AlertTriangle,
  Clock,
  CheckCircle
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
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

// Mock data for client licenses
const clientLicenses = [
  {
    id: 'L-4587',
    product: 'Enterprise Suite Pro',
    type: 'Enterprise',
    status: 'active',
    startDate: '10/15/2023',
    expiryDate: '10/14/2024',
    seats: {
      used: 230,
      total: 250
    },
    renewalPrice: '$12,500'
  },
  {
    id: 'L-4588',
    product: 'Security Manager',
    type: 'Standard',
    status: 'expiring',
    startDate: '10/10/2023',
    expiryDate: '11/30/2023',
    seats: {
      used: 45,
      total: 50
    },
    renewalPrice: '$3,750'
  },
  {
    id: 'L-4589',
    product: 'Data Analyzer Pro',
    type: 'Basic',
    status: 'active',
    startDate: '05/22/2023',
    expiryDate: '05/22/2024',
    seats: {
      used: 12,
      total: 25
    },
    renewalPrice: '$1,875'
  },
  {
    id: 'L-4590',
    product: 'Network Monitor',
    type: 'Standard',
    status: 'expired',
    startDate: '10/01/2022',
    expiryDate: '09/30/2023',
    seats: {
      used: 0,
      total: 75
    },
    renewalPrice: '$5,625'
  },
  {
    id: 'L-4591',
    product: 'Cloud Storage Pro',
    type: 'Premium',
    status: 'active',
    startDate: '09/15/2023',
    expiryDate: '09/14/2024',
    seats: {
      used: 87,
      total: 120
    },
    renewalPrice: '$7,200'
  }
];

const ClientLicenses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredLicenses = searchQuery 
    ? clientLicenses.filter(license => 
        license.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        license.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clientLicenses;
    
  const activeCount = clientLicenses.filter(l => l.status === 'active').length;
  const expiringCount = clientLicenses.filter(l => l.status === 'expiring').length;
  const expiredCount = clientLicenses.filter(l => l.status === 'expired').length;

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Licenses</h1>
            <p className="text-gray-500 mt-1">Manage and monitor all your licenses in one place</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <h3 className="text-2xl font-bold">{activeCount}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <h3 className="text-2xl font-bold">{expiringCount}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expired</p>
              <h3 className="text-2xl font-bold">{expiredCount}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative max-w-xs">
              <Input 
                placeholder="Search licenses..." 
                className="pl-3 pr-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>License Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Seats Used</TableHead>
              <TableHead>Renewal Price</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLicenses.map(license => (
              <TableRow key={license.id}>
                <TableCell className="font-medium">{license.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" />
                    {license.product}
                  </div>
                </TableCell>
                <TableCell>{license.type}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      ${license.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${license.status === 'expiring' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                      ${license.status === 'expired' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    `}
                  >
                    {license.status === 'active' && 'Active'}
                    {license.status === 'expiring' && (
                      <span className="flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Expiring Soon
                      </span>
                    )}
                    {license.status === 'expired' && 'Expired'}
                  </Badge>
                </TableCell>
                <TableCell>{license.expiryDate}</TableCell>
                <TableCell>{license.seats.used}/{license.seats.total}</TableCell>
                <TableCell>{license.renewalPrice}</TableCell>
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
                      <DropdownMenuItem>
                        <Link to={`/client/licenses/${license.id}`} className="w-full">
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Manage users</DropdownMenuItem>
                      <DropdownMenuItem>Download license</DropdownMenuItem>
                      {(license.status === 'expired' || license.status === 'expiring') && (
                        <DropdownMenuItem className="text-green-600">Renew license</DropdownMenuItem>
                      )}
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

export default ClientLicenses;
