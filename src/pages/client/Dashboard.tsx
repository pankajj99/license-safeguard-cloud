
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Calendar,
  Clock,
  Users,
  KeyRound,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for client licenses
const licenses = [
  {
    id: 'L-4587',
    product: 'Enterprise Suite Pro',
    status: 'active',
    expiryDate: '10/14/2024',
    seats: {
      used: 230,
      total: 250
    }
  },
  {
    id: 'L-4588',
    product: 'Security Manager',
    status: 'expiring',
    expiryDate: '11/30/2023',
    seats: {
      used: 45,
      total: 50
    }
  },
  {
    id: 'L-4589',
    product: 'Data Analyzer Pro',
    status: 'active',
    expiryDate: '05/22/2024',
    seats: {
      used: 12,
      total: 25
    }
  }
];

const ClientDashboard = () => {
  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Licenses</h1>
            <p className="text-gray-500 mt-1">Manage and monitor your license portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/client/licenses">View All Licenses</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* License stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <KeyRound className="text-clms-lightBlue" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Licenses</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <Users className="text-clms-green" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total User Seats</p>
              <h3 className="text-2xl font-bold">325</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Licenses list */}
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle>Your Active Licenses</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/client/licenses">Manage Licenses</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {licenses.map((license) => (
              <div key={license.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <FileText className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{license.product}</h3>
                      <p className="text-sm text-gray-500">License ID: {license.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2 md:mt-0">
                  <div className="text-sm">
                    <p className="text-gray-500">Seats</p>
                    <p className="font-medium">{license.seats.used}/{license.seats.total} used</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span>Expires: {license.expiryDate}</span>
                    </div>
                  </div>
                  
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
                  
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/client/licenses/${license.id}`}>
                      Details <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support and Contact Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Need assistance with your licenses?</h3>
            <p className="text-gray-500">Our support team is available to help you with any questions.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              View Support Docs
            </Button>
            <Button>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
