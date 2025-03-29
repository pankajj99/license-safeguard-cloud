
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const notifications = [
  {
    id: 1,
    type: 'license',
    title: 'License Expiring Soon',
    message: 'Acme Corp\'s enterprise license will expire in 7 days.',
    date: '2 hours ago',
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'license',
    title: 'License Renewed',
    message: 'Globex Industries has renewed their Standard license for 1 year.',
    date: '6 hours ago',
    read: true,
    priority: 'normal'
  },
  {
    id: 3,
    type: 'system',
    title: 'System Update Completed',
    message: 'The system update has been successfully installed.',
    date: 'Yesterday',
    read: true,
    priority: 'normal'
  },
  {
    id: 4,
    type: 'compliance',
    title: 'Compliance Issue Detected',
    message: 'Stark Enterprises has exceeded their licensed user count by 5 users.',
    date: 'Yesterday',
    read: false,
    priority: 'high'
  },
  {
    id: 5,
    type: 'license',
    title: 'New License Created',
    message: 'A new Professional license has been created for Wayne Enterprises.',
    date: '2 days ago',
    read: true,
    priority: 'normal'
  },
  {
    id: 6,
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'The system will undergo scheduled maintenance this weekend.',
    date: '3 days ago',
    read: true,
    priority: 'normal'
  },
];

const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => (
  <div className={`p-4 ${notification.read ? '' : 'bg-blue-50'} hover:bg-gray-50 transition-colors`}>
    <div className="flex items-start gap-4">
      <div className={`mt-1 p-2 rounded-full ${
        notification.type === 'license' ? 'bg-clms-lightBlue bg-opacity-10 text-clms-lightBlue' :
        notification.type === 'system' ? 'bg-clms-teal bg-opacity-10 text-clms-teal' :
        'bg-clms-red bg-opacity-10 text-clms-red'
      }`}>
        <Bell size={16} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium">{notification.title}</h4>
          <span className="text-xs text-gray-500">{notification.date}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
        <div className="flex items-center gap-2">
          {notification.priority === 'high' && (
            <Badge variant="destructive" className="text-xs">High Priority</Badge>
          )}
          {!notification.read && (
            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Unread</Badge>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Check className="h-4 w-4" />
          <span className="sr-only">Mark as read</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  </div>
);

const NotificationsPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500 mt-1">Stay updated with license events and system notifications</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notification Settings</CardTitle>
            <Button>Mark All as Read</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="gap-2">
              <Bell size={16} />
              Enable Browser Notifications
            </Button>
            <Button variant="outline" className="gap-2">
              Configure Email Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread <Badge className="ml-2 bg-blue-500">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="license">License</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications
                  .filter(notification => !notification.read)
                  .map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="license">
          <Card>
            <CardHeader>
              <CardTitle>License Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications
                  .filter(notification => notification.type === 'license')
                  .map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications
                  .filter(notification => notification.type === 'system')
                  .map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications
                  .filter(notification => notification.type === 'compliance')
                  .map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default NotificationsPage;
