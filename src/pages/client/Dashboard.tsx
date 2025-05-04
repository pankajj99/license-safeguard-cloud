
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound, Clock, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import our new components
import WelcomeBar from '@/components/client/WelcomeBar';
import ExpirationAlerts from '@/components/client/ExpirationAlerts';
import RecentActivities from '@/components/client/RecentActivities';
import LicenseUsageSummary from '@/components/client/LicenseUsageSummary';

// Mock data
const expiringLicenses = [
  {
    id: 'L-4588',
    product: 'Security Manager',
    daysLeft: 15,
    expiryDate: '11/30/2023'
  }
];

const recentActivities = [
  { id: '1', action: 'License updated', date: '2 days ago', user: 'Admin', type: 'update' },
  { id: '2', action: 'User added to license', date: '3 days ago', user: 'Sarah Johnson', type: 'user' },
  { id: '3', action: 'License expiry notification sent', date: '1 week ago', user: 'System', type: 'system' },
  { id: '4', action: 'User permissions updated', date: '2 weeks ago', user: 'Michael Chen', type: 'settings' }
];

const licenseUsages = [
  { id: 'L-4587', product: 'Enterprise Suite Pro', used: 230, total: 250, percentage: 92 },
  { id: 'L-4588', product: 'Security Manager', used: 45, total: 50, percentage: 90 },
  { id: 'L-4589', product: 'Data Analyzer Pro', used: 12, total: 25, percentage: 48 }
];

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
      <WelcomeBar userName="John" companyName="Acme Corp" />
      
      <ExpirationAlerts alerts={expiringLicenses} />

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

      {/* Two column layout for licenses and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Active Licenses</h3>
              <div className="space-y-4">
                {licenses.map((license) => (
                  <div key={license.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-3 md:mb-0">
                      <h4 className="font-medium">{license.product}</h4>
                      <p className="text-sm text-gray-500">ID: {license.id} • Expires: {license.expiryDate}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/client/licenses/${license.id}`} className="flex items-center gap-1">
                        Details <ArrowUpRight size={14} />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button asChild>
                  <Link to="/client/licenses">
                    View All Licenses
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <LicenseUsageSummary usages={licenseUsages} />
        </div>
        
        <div className="space-y-6">
          <RecentActivities activities={recentActivities} />
          
          {/* Support card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is ready to assist you with any questions about your licenses.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  View Documentation
                </Button>
                <Button size="sm" className="w-full justify-start">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
