
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar, 
  Bell, 
  FileText, 
  Download, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  ClockIcon,
  RefreshCw,
  User,
  Key
} from 'lucide-react';
import ClientLayout from '@/components/client/ClientLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getClientLicenses } from '@/services/licenseService';
import { getUserNotifications } from '@/services/notificationService';

const ClientPortal = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch client licenses
  const { 
    data: licenses, 
    isLoading: licensesLoading,
    error: licensesError
  } = useQuery({
    queryKey: ['clientLicenses'],
    queryFn: getClientLicenses
  });
  
  // Fetch notifications
  const {
    data: notifications,
    isLoading: notificationsLoading,
  } = useQuery({
    queryKey: ['userNotifications'],
    queryFn: getUserNotifications
  });

  if (licensesError) {
    console.error('Error loading licenses:', licensesError);
  }

  // License statistics
  const activeLicenses = licenses?.filter(license => license.status === 'active') || [];
  const expiringLicenses = activeLicenses.filter(license => {
    const expiryDate = new Date(license.expiry_date);
    const currentDate = new Date();
    const daysDifference = Math.ceil(
      (expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDifference <= 30;
  });
  const expiredLicenses = licenses?.filter(license => license.status === 'expired') || [];
  
  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days until expiry
  const daysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Client Portal</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell size={16} />
              <span className="hidden sm:inline">Notifications</span>
              {notifications?.filter(n => !n.read).length > 0 && (
                <Badge variant="destructive" className="ml-1">{notifications.filter(n => !n.read).length}</Badge>
              )}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Support</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Licenses</p>
                  <h3 className="text-3xl font-bold mt-1">{activeLicenses.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                  <h3 className="text-3xl font-bold mt-1">{expiringLicenses.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Expired Licenses</p>
                  <h3 className="text-3xl font-bold mt-1">{expiredLicenses.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="licenses">My Licenses</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Licenses Requiring Attention</CardTitle>
                <CardDescription>Licenses that are expiring soon or require action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {licensesLoading ? (
                  <div className="text-center py-4">Loading licenses...</div>
                ) : expiringLicenses.length > 0 ? (
                  expiringLicenses.slice(0, 3).map(license => (
                    <div key={license.id} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{license.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Expires on {formatDate(license.expiry_date)}
                          </p>
                        </div>
                        <Badge className={
                          daysUntilExpiry(license.expiry_date) <= 7 
                            ? "bg-red-100 text-red-800" 
                            : "bg-amber-100 text-amber-800"
                        }>
                          {daysUntilExpiry(license.expiry_date)} days left
                        </Badge>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Expiry Progress</span>
                          <span>Expires in {daysUntilExpiry(license.expiry_date)} days</span>
                        </div>
                        <Progress 
                          value={100 - (daysUntilExpiry(license.expiry_date) / 365 * 100)} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                        <Button size="sm" className="bg-clms-lightBlue hover:bg-clms-blue">
                          Request Renewal
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <h3 className="font-medium text-lg">All Good!</h3>
                    <p className="text-gray-500 mt-1">No licenses need immediate attention</p>
                  </div>
                )}

                {expiringLicenses.length > 3 && (
                  <div className="text-center mt-4">
                    <Button variant="outline" onClick={() => setActiveTab("licenses")}>
                      View All Licenses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Latest updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  {notificationsLoading ? (
                    <div className="text-center py-4">Loading notifications...</div>
                  ) : notifications?.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {notifications.slice(0, 4).map(notification => (
                        <li 
                          key={notification.id} 
                          className={`flex items-start gap-4 px-6 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="mt-1">
                            {notification.type === 'expiry' && <Calendar size={16} className="text-amber-500" />}
                            {notification.type === 'compliance' && <AlertTriangle size={16} className="text-red-500" />}
                            {notification.type === 'request' && <User size={16} className="text-blue-500" />}
                            {notification.type === 'system' && <CheckCircle size={16} className="text-green-500" />}
                          </div>
                          <div className="flex-1 min-w-0 text-sm">
                            <p className={!notification.read ? 'font-medium' : ''}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(notification.time).toLocaleString()}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">No notifications</div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full" onClick={() => setActiveTab("notifications")}>
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 w-full">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>View License Details</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 w-full">
                      <RefreshCw className="h-6 w-6 mb-2" />
                      <span>Request Renewal</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 w-full">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Download Documents</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 w-full">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span>Contact Support</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Licenses Tab */}
          <TabsContent value="licenses">
            <Card>
              <CardHeader>
                <CardTitle>All Licenses</CardTitle>
                <CardDescription>Manage all your licenses in one place</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  View all your licenses, manage renewals, and track usage.
                </p>
                <Button variant="outline" className="mr-2">Go to Licenses</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with important alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  View all notifications related to your licenses and account.
                </p>
                <Button variant="outline" className="mr-2">View All Notifications</Button>
                <Button variant="ghost">Mark All as Read</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>License Documents</CardTitle>
                <CardDescription>Download and manage license documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Access all your license agreements, certificates and related documentation.
                </p>
                <Button variant="outline">View All Documents</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Support Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2">
                  <MessageSquare size={16} className="text-clms-blue" />
                  Contact Support
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Have questions about your licenses? Our support team is ready to help.
                </p>
                <Button className="mt-3 bg-clms-lightBlue hover:bg-clms-blue">
                  Open Support Ticket
                </Button>
              </div>
              
              <div className="flex-1 p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText size={16} className="text-clms-blue" />
                  License Resources
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Access guides and resources to help manage your licenses.
                </p>
                <Button variant="outline" className="mt-3">
                  View Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientPortal;
