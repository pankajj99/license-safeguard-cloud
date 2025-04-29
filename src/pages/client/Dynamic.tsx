
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, TrendingUp, AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react';

// Mock data fetching function - in a real app, this would connect to your backend
const fetchClientDashboardData = async (userId: string) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    upcomingRenewals: [
      { id: 'L-4567', name: 'Enterprise Security Suite', expiryDate: '2023-12-15', daysLeft: 21 },
      { id: 'L-4892', name: 'Data Analytics Platform', expiryDate: '2023-12-30', daysLeft: 36 }
    ],
    recentActivities: [
      { id: 1, type: 'license_activated', licenseId: 'L-3921', timestamp: '2023-11-20T09:15:00', message: 'License Enterprise Suite activated' },
      { id: 2, type: 'user_added', licenseId: 'L-3921', timestamp: '2023-11-19T14:30:00', message: 'New user John Smith added to license' },
      { id: 3, type: 'compliance_check', licenseId: 'L-4567', timestamp: '2023-11-18T11:00:00', message: 'Compliance check passed' }
    ],
    complianceStatus: {
      status: 'compliant',
      lastChecked: '2023-11-23T10:30:00',
      issues: 0
    },
    usageStats: {
      totalLicenses: 5,
      activeLicenses: 4,
      totalSeats: 250,
      usedSeats: 187
    }
  };
};

const Dynamic = () => {
  const { user } = useAuth();
  const userId = user?.id || '';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const { data, isLoading, error } = useQuery({
    queryKey: ['clientDashboard', userId],
    queryFn: () => fetchClientDashboardData(userId),
    enabled: !!userId
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 text-clms-lightBlue animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your personalized dashboard...</p>
      </div>
    );
  }

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading dashboard data",
      description: "There was a problem loading your dashboard data. Please try again later.",
    });

    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load dashboard data. Please refresh the page or contact support if the problem persists.
        </AlertDescription>
      </Alert>
    );
  }

  const { upcomingRenewals, recentActivities, complianceStatus, usageStats } = data || {
    upcomingRenewals: [],
    recentActivities: [],
    complianceStatus: { status: 'unknown', lastChecked: '', issues: 0 },
    usageStats: { totalLicenses: 0, activeLicenses: 0, totalSeats: 0, usedSeats: 0 }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Dynamic Dashboard</h1>
          <p className="text-gray-500 mt-1">Personalized insights and recommendations</p>
        </div>
        <Button className="bg-clms-lightBlue hover:bg-clms-blue">
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>License Usage</CardTitle>
                <CardDescription>Current allocation of licenses and seats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Licenses (Active/Total)</span>
                      <span className="text-sm font-medium">{usageStats.activeLicenses}/{usageStats.totalLicenses}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(usageStats.activeLicenses / usageStats.totalLicenses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Seats (Used/Total)</span>
                      <span className="text-sm font-medium">{usageStats.usedSeats}/{usageStats.totalSeats}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${usageStats.usedSeats / usageStats.totalSeats > 0.9 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${(usageStats.usedSeats / usageStats.totalSeats) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                {usageStats.usedSeats / usageStats.totalSeats > 0.9 ? (
                  <p className="flex items-center text-amber-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    You're nearing seat capacity. Consider upgrading soon.
                  </p>
                ) : (
                  <p>License utilization is within normal parameters.</p>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Renewals</CardTitle>
                <CardDescription>Licenses expiring in the next 45 days</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingRenewals.length > 0 ? (
                  <ul className="space-y-4">
                    {upcomingRenewals.map(license => (
                      <li key={license.id} className="border-b pb-3 last:border-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{license.name}</p>
                            <p className="text-sm text-gray-500">ID: {license.id}</p>
                          </div>
                          <Badge className={license.daysLeft < 30 ? 'bg-red-100 text-red-800 hover:bg-red-100' : 'bg-amber-100 text-amber-800 hover:bg-amber-100'}>
                            {license.daysLeft} days left
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">Expires on {formatDate(license.expiryDate)}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-6 text-gray-500">
                    No upcoming renewals in the next 45 days
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Renewals
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Overall compliance health check</CardDescription>
              </div>
              {complianceStatus.status === 'compliant' ? (
                <div className="bg-green-100 text-green-800 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
              ) : (
                <div className="bg-red-100 text-red-800 p-2 rounded-full">
                  <AlertCircle className="h-6 w-6" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Status: {complianceStatus.status === 'compliant' ? 'Compliant' : 'Non-Compliant'}</p>
                  <p className="text-sm text-gray-500">Last checked: {formatDate(complianceStatus.lastChecked)}</p>
                </div>
                <div>
                  <p className="text-center">
                    <span className="text-2xl font-bold block">{complianceStatus.issues}</span>
                    <span className="text-sm text-gray-500">Issues Found</span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Details</Button>
              <Button variant="outline">Run Compliance Check</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance History</CardTitle>
              <CardDescription>Track your compliance status over time</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-8">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Compliant</AlertTitle>
                  <AlertDescription className="flex justify-between">
                    <span>All licenses are in compliance with your agreement</span>
                    <span className="text-sm text-gray-500">November 23, 2023</span>
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Compliant</AlertTitle>
                  <AlertDescription className="flex justify-between">
                    <span>All licenses are in compliance with your agreement</span>
                    <span className="text-sm text-gray-500">October 15, 2023</span>
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle>Non-Compliant</AlertTitle>
                  <AlertDescription className="flex justify-between">
                    <span>License usage exceeds permitted count on Enterprise Suite</span>
                    <span className="text-sm text-gray-500">September 3, 2023</span>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>License and account activity in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="flex items-start space-x-3 border-b pb-4 last:border-0">
                    <div className={`p-2 rounded-full mt-1 ${
                      activity.type === 'license_activated' ? 'bg-green-100' :
                      activity.type === 'user_added' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'license_activated' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === 'user_added' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'compliance_check' && <Clock className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">License ID: {activity.licenseId}</p>
                        <p className="text-sm text-gray-500">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dynamic;
