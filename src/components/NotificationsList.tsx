
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, Clock, AlertTriangle, User, CheckCircle } from 'lucide-react';

type NotificationType = 'expiry' | 'compliance' | 'request' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'expiry',
    message: 'Acme Corporation license #L-3890 expires in 14 days',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'n2',
    type: 'compliance',
    message: 'TechGlobal Inc. exceeded licensed user count by 5 users',
    time: '5 hours ago',
    read: false
  },
  {
    id: 'n3',
    type: 'request',
    message: 'Innovative Solutions requested a quote for license renewal',
    time: '1 day ago',
    read: true
  },
  {
    id: 'n4',
    type: 'system',
    message: 'System backup completed successfully',
    time: '2 days ago',
    read: true
  }
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'expiry':
      return <Clock className="text-clms-yellow" size={18} />;
    case 'compliance':
      return <AlertTriangle className="text-clms-red" size={18} />;
    case 'request':
      return <User className="text-clms-lightBlue" size={18} />;
    case 'system':
      return <CheckCircle className="text-clms-green" size={18} />;
    default:
      return <Clock size={18} />;
  }
};

const NotificationsList = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Recent Notifications</CardTitle>
        <Badge variant="outline" className="text-xs">
          {notifications.filter(n => !n.read).length} new
        </Badge>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`flex items-start gap-4 px-6 py-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NotificationsList;
