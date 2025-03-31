
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Calendar, 
  Users, 
  Shield, 
  Clock,
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock license data
const licensesData = {
  'L-4587': {
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
    renewalPrice: '$12,500',
    features: [
      'Advanced Analytics',
      'Premium Support',
      'Custom Integrations',
      'Unlimited Storage',
      'Admin Dashboard',
      'API Access',
      'Team Collaboration',
      'Audit Logs'
    ],
    usageHistory: [
      { month: 'Oct', usage: 210 },
      { month: 'Nov', usage: 215 },
      { month: 'Dec', usage: 223 },
      { month: 'Jan', usage: 230 }
    ],
    recentActivities: [
      { action: 'User added', date: '2 days ago', user: 'Sarah Johnson' },
      { action: 'License updated', date: '1 week ago', user: 'Admin' },
      { action: '5 new users added', date: '2 weeks ago', user: 'Michael Chen' }
    ]
  },
  'L-4588': {
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
    renewalPrice: '$3,750',
    features: [
      'Vulnerability Scanning',
      'Intrusion Detection',
      'Compliance Reports',
      'User Authentication',
      'Threat Monitoring'
    ],
    usageHistory: [
      { month: 'Oct', usage: 38 },
      { month: 'Nov', usage: 42 },
      { month: 'Dec', usage: 45 },
      { month: 'Jan', usage: 45 }
    ],
    recentActivities: [
      { action: 'Security report downloaded', date: '1 day ago', user: 'James Wilson' },
      { action: 'License expiry notification sent', date: '3 days ago', user: 'System' },
      { action: 'User permissions updated', date: '1 week ago', user: 'Admin' }
    ]
  },
  'L-4589': {
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
    renewalPrice: '$1,875',
    features: [
      'Data Visualization',
      'Basic Reports',
      'Data Import/Export',
      'Dashboard Creation'
    ],
    usageHistory: [
      { month: 'Oct', usage: 10 },
      { month: 'Nov', usage: 10 },
      { month: 'Dec', usage: 11 },
      { month: 'Jan', usage: 12 }
    ],
    recentActivities: [
      { action: 'Report generated', date: '5 days ago', user: 'Emma Davis' },
      { action: 'Data import completed', date: '2 weeks ago', user: 'Thomas Anderson' }
    ]
  }
};

const LicenseDetails = () => {
  const { id } = useParams();
  const license = licensesData[id as keyof typeof licensesData];
  
  if (!license) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <h1 className="text-2xl font-bold mb-4">License not found</h1>
          <p className="text-gray-500 mb-6">The license you're looking for doesn't exist or you don't have access to it.</p>
          <Button asChild>
            <Link to="/client/licenses">Back to Licenses</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const seatsUsagePercent = Math.round((license.seats.used / license.seats.total) * 100);
  const daysLeft = license.status === 'expired' ? 0 : 30; // Mock calculation
  
  return (
    <Layout>
      <div className="mb-6">
        <Link to="/client/licenses" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4">
          <ArrowLeft size={16} />
          <span>Back to licenses</span>
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="p-3 bg-gray-100 rounded-lg">
              <FileText size={24} className="text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{license.product}</h1>
              <p className="text-gray-500">License ID: {license.id}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Download License
            </Button>
            
            {(license.status === 'expired' || license.status === 'expiring') && (
              <Button className="bg-clms-lightBlue hover:bg-clms-blue">Renew License</Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-blue-100 rounded">
                <Shield size={20} className="text-clms-lightBlue" />
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
            </div>
            <h3 className="text-lg font-medium mt-3">License Type</h3>
            <p className="text-2xl font-bold">{license.type}</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Start Date:</span>
                <span className="font-medium">{license.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expiry Date:</span>
                <span className="font-medium">{license.expiryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Renewal Price:</span>
                <span className="font-medium">{license.renewalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-green-100 rounded">
                <Users size={20} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium mt-3">User Seats</h3>
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span>{license.seats.used} of {license.seats.total} seats used</span>
                <span>{seatsUsagePercent}%</span>
              </div>
              <Progress value={seatsUsagePercent} className="h-2" />
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full">
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-orange-100 rounded">
                <Calendar size={20} className="text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium mt-3">Status Information</h3>
            {license.status === 'active' && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle2 size={18} />
                  <span className="font-medium">License Active</span>
                </div>
                <p className="text-sm text-gray-600">Your license is valid and active. You have full access to all features.</p>
              </div>
            )}
            {license.status === 'expiring' && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <Clock size={18} />
                  <span className="font-medium">{daysLeft} Days Left</span>
                </div>
                <p className="text-sm text-gray-600">Your license is expiring soon. Please renew to maintain access.</p>
                <Button size="sm" className="mt-4 bg-clms-lightBlue hover:bg-clms-blue">
                  Renew Now
                </Button>
              </div>
            )}
            {license.status === 'expired' && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <AlertTriangle size={18} />
                  <span className="font-medium">License Expired</span>
                </div>
                <p className="text-sm text-gray-600">Your license has expired. Please renew to restore access to all features.</p>
                <Button size="sm" className="mt-4 bg-clms-lightBlue hover:bg-clms-blue">
                  Renew Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>License Features</CardTitle>
            <CardDescription>Features included with your {license.type} license</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {license.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button variant="outline" className="flex items-center gap-1">
              View Full Documentation
              <ArrowRight size={14} />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {license.recentActivities.map((activity, index) => (
                <div key={index} className="border-l-4 border-clms-lightBlue pl-4 py-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">By: {activity.user}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Get assistance with your license</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 border rounded-lg p-5">
            <h3 className="font-medium mb-2">Technical Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get technical assistance with your license installation and usage</p>
            <Button variant="outline" size="sm">Contact Technical Support</Button>
          </div>
          
          <div className="flex-1 border rounded-lg p-5">
            <h3 className="font-medium mb-2">Billing Support</h3>
            <p className="text-sm text-gray-600 mb-4">Questions about billing, renewals, or upgrading your license</p>
            <Button variant="outline" size="sm">Contact Billing Support</Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default LicenseDetails;
