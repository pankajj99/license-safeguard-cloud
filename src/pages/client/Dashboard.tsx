
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CalendarClock, CheckCircle, ChevronRight, FileText, Key, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Define types for our mock data
type License = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'expired' | 'renewing';
  expiresIn: number;
  seatsUsed: number;
  totalSeats: number;
};

type Activity = {
  id: string;
  action: string;
  date: string;
  user: string;
  type: 'update' | 'user' | 'system' | 'settings';
};

const ClientDashboard = () => {
  // Mock license data for demo
  const licenses: License[] = [
    { 
      id: 'LIC-1234', 
      name: 'Enterprise Suite', 
      type: 'Annual', 
      status: 'active', 
      expiresIn: 245,
      seatsUsed: 42,
      totalSeats: 50
    },
    { 
      id: 'LIC-5678', 
      name: 'Developer Tools', 
      type: 'Monthly', 
      status: 'active', 
      expiresIn: 12,
      seatsUsed: 18,
      totalSeats: 25
    },
    { 
      id: 'LIC-9012', 
      name: 'Security Package', 
      type: 'Annual', 
      status: 'renewing', 
      expiresIn: 30,
      seatsUsed: 10,
      totalSeats: 10
    },
    { 
      id: 'LIC-3456', 
      name: 'Analytics Add-on', 
      type: 'Monthly', 
      status: 'expired', 
      expiresIn: 0,
      seatsUsed: 0,
      totalSeats: 5
    },
  ];

  // Recent license activities
  const recentActivities: Activity[] = [
    { 
      id: 'ACT-001', 
      action: 'License renewed', 
      date: '2025-04-10', 
      user: 'System', 
      type: 'system' 
    },
    { 
      id: 'ACT-002', 
      action: 'User added to license', 
      date: '2025-04-08', 
      user: 'John Doe', 
      type: 'user' 
    },
    { 
      id: 'ACT-003', 
      action: 'License settings updated', 
      date: '2025-04-07', 
      user: 'Admin', 
      type: 'settings' 
    },
    { 
      id: 'ACT-004', 
      action: 'License seat usage report generated', 
      date: '2025-04-05', 
      user: 'System', 
      type: 'update' 
    },
  ];

  const getLicenseStatusColor = (status: License['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'renewing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'update': return <RefreshCw size={14} />;
      case 'user': return <Users size={14} />;
      case 'system': return <CheckCircle size={14} />;
      case 'settings': return <FileText size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Client Dashboard</h1>
      
      {/* Welcome & Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Welcome, Client Organization</CardTitle>
          <CardDescription>
            Here's an overview of your licenses and recent activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Key size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Licenses</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertCircle size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiring Soon</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Users size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Seats</p>
                <p className="text-xl font-semibold">90</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* License Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Licenses that need attention */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Licenses Needing Attention</span>
              <Link to="/client/licenses">
                <Button variant="ghost" size="sm" className="text-sm">
                  View All <ChevronRight size={16} />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {licenses
                .filter(license => license.status === 'expired' || license.expiresIn <= 30 || license.seatsUsed === license.totalSeats)
                .map(license => (
                  <div key={license.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{license.name}</h3>
                        <p className="text-sm text-gray-500">
                          {license.id} · {license.type}
                        </p>
                      </div>
                      <Badge className={getLicenseStatusColor(license.status)}>
                        {license.status === 'active' && 'Active'}
                        {license.status === 'expired' && 'Expired'}
                        {license.status === 'renewing' && 'Renewing'}
                      </Badge>
                    </div>
                    
                    {license.status !== 'expired' && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Expires in {license.expiresIn} days</span>
                          <span>{license.seatsUsed}/{license.totalSeats} seats</span>
                        </div>
                        <Progress value={(license.seatsUsed / license.totalSeats) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end">
                      <Link to={`/client/licenses/${license.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      {license.status === 'expired' && (
                        <Button size="sm" className="ml-2 bg-clms-lightBlue hover:bg-clms-blue">
                          Renew License
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1.5 
                    ${activity.type === 'update' ? 'bg-purple-100 text-purple-600' : ''}
                    ${activity.type === 'user' ? 'bg-blue-100 text-blue-600' : ''}
                    ${activity.type === 'system' ? 'bg-green-100 text-green-600' : ''}
                    ${activity.type === 'settings' ? 'bg-gray-100 text-gray-600' : ''}
                  `}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex text-xs text-gray-500 mt-1">
                      <span>{activity.date}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* License Calendar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <CalendarClock size={18} className="mr-2" />
            Upcoming License Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm">
              <AlertCircle size={16} className="text-amber-500 mr-2" />
              <div>
                <span className="font-medium">Developer Tools</span>
                <span className="mx-1">•</span>
                <span>Expires in 12 days</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                View License
              </Button>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm">
              <RefreshCw size={16} className="text-blue-500 mr-2" />
              <div>
                <span className="font-medium">Security Package</span>
                <span className="mx-1">•</span>
                <span>Auto-renewal in 30 days</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                View License
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
