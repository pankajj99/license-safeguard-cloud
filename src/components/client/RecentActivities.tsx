
import React from 'react';
import { Clock, FileText, User, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Activity {
  id: string;
  action: string;
  date: string;
  user: string;
  licenseId?: string;
  type: 'update' | 'user' | 'system' | 'settings';
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'update':
        return <FileText size={16} className="text-clms-lightBlue" />;
      case 'user':
        return <User size={16} className="text-clms-green" />;
      case 'settings':
        return <Settings size={16} className="text-clms-teal" />;
      default:
        return <Clock size={16} className="text-clms-yellow" />;
    }
  };

  const getActivityBorderColor = (type: string) => {
    switch (type) {
      case 'update':
        return 'border-clms-lightBlue';
      case 'user':
        return 'border-clms-green';
      case 'settings':
        return 'border-clms-teal';
      default:
        return 'border-clms-yellow';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`border-l-4 ${getActivityBorderColor(activity.type)} pl-4 py-1`}
          >
            <div className="flex items-center gap-2">
              {getActivityIcon(activity.type)}
              <p className="text-sm font-medium">{activity.action}</p>
            </div>
            <p className="text-xs text-gray-500">By: {activity.user}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
