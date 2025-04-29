
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, AlertTriangle, User, CheckCircle, Bell, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getUserNotifications, markAllNotificationsAsRead, markNotificationAsRead } from '@/services/notificationService';
import { Notification } from '@/types/database.types';
import { useToast } from '@/hooks/use-toast';

interface NotificationCenterProps {
  variant?: 'icon' | 'button';
  className?: string;
}

export const NotificationCenter = ({ variant = 'button', className = '' }: NotificationCenterProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const { 
    data: notifications = [], 
    isLoading,
    refetch 
  } = useQuery({
    queryKey: ['userNotifications'],
    queryFn: getUserNotifications
  });
  
  const unreadCount = notifications.filter((n: Notification) => !n.read).length;
  
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      toast({
        title: "Notification marked as read",
        description: "The notification has been updated",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark notification as read",
      });
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      toast({
        title: "All notifications marked as read",
        description: "Your notifications have been updated",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark all notifications as read",
      });
    }
  };
  
  const getNotificationIcon = (type: string, size = 16) => {
    switch (type) {
      case 'expiry':
        return <Calendar size={size} className="text-amber-500" />;
      case 'compliance':
        return <AlertTriangle size={size} className="text-red-500" />;
      case 'request':
        return <User size={size} className="text-blue-500" />;
      case 'system':
        return <CheckCircle size={size} className="text-green-500" />;
      default:
        return <CheckCircle size={size} className="text-gray-500" />;
    }
  };
  
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {variant === 'icon' ? (
          <Button variant="ghost" size="icon" className={`relative ${className}`}>
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        ) : (
          <Button variant="outline" className={`flex items-center gap-2 ${className}`}>
            <Bell size={16} />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">{unreadCount}</Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="px-2 py-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
            <ul className="space-y-2 px-4">
              {notifications.map((notification: Notification) => (
                <li 
                  key={notification.id} 
                  className={`flex items-start gap-3 p-3 rounded-md ${!notification.read ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(notification.time)}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <X size={14} />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell size={40} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
              <p className="text-gray-500 text-center mt-1">
                You're all caught up. New notifications will appear here.
              </p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
