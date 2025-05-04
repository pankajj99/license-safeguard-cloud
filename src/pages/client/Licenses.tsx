
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Check, Key, Search, X } from 'lucide-react';

type License = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'expired' | 'renewing';
  expiryDate: string;
  seats: {
    used: number;
    total: number;
  };
};

const licenses: License[] = [
  {
    id: 'LIC-1234',
    name: 'Enterprise Suite',
    type: 'Annual',
    status: 'active',
    expiryDate: '2025-12-15',
    seats: {
      used: 42,
      total: 50
    }
  },
  {
    id: 'LIC-5678',
    name: 'Developer Tools',
    type: 'Monthly',
    status: 'active',
    expiryDate: '2025-04-25',
    seats: {
      used: 18,
      total: 25
    }
  },
  {
    id: 'LIC-9012',
    name: 'Security Package',
    type: 'Annual',
    status: 'renewing',
    expiryDate: '2025-05-13',
    seats: {
      used: 10,
      total: 10
    }
  },
  {
    id: 'LIC-3456',
    name: 'Analytics Add-on',
    type: 'Monthly',
    status: 'expired',
    expiryDate: '2025-03-01',
    seats: {
      used: 0,
      total: 5
    }
  },
  {
    id: 'LIC-7890',
    name: 'Cloud Storage',
    type: 'Annual',
    status: 'active',
    expiryDate: '2026-01-30',
    seats: {
      used: 3,
      total: 10
    }
  }
];

const ClientLicenses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = 
      license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      license.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: License['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'renewing':
        return <Badge className="bg-blue-100 text-blue-800">Renewing</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">My Licenses</h1>
        <Button className="bg-clms-lightBlue hover:bg-clms-blue">
          Request New License
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>License Summary</CardTitle>
          <CardDescription>Overview of your organization's licenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Licenses</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
              <div className="p-2 bg-red-100 rounded-full mr-3">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Expired Licenses</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Renewal This Month</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search licenses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'bg-clms-lightBlue hover:bg-clms-blue' : ''}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
                className={statusFilter === 'active' ? 'bg-clms-lightBlue hover:bg-clms-blue' : ''}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'expired' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('expired')}
                className={statusFilter === 'expired' ? 'bg-clms-lightBlue hover:bg-clms-blue' : ''}
              >
                Expired
              </Button>
            </div>
          </div>
          
          {/* Licenses Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No licenses found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLicenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{license.name}</div>
                          <div className="text-sm text-gray-500">{license.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{getStatusBadge(license.status)}</TableCell>
                      <TableCell>{license.expiryDate}</TableCell>
                      <TableCell>
                        {license.seats.used}/{license.seats.total}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/client/licenses/${license.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        {license.status === 'expired' && (
                          <Button size="sm" className="ml-2 bg-clms-lightBlue hover:bg-clms-blue">
                            Renew
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-gray-500">
          <div>Showing {filteredLicenses.length} of {licenses.length} licenses</div>
          <div>Last updated: April 13, 2025</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClientLicenses;
