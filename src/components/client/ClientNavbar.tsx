
import React, { useState } from 'react';
import { Bell, Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserNotifications, markAllNotificationsAsRead, markNotificationAsRead } from '@/services/notificationService';
import { Notification } from '@/types/database.types';
import { useToast } from '@/hooks/use-toast';

const ClientNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getUserNotifications,
    onSuccess: () => {
      // Success handling if needed
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error loading notifications",
        description: error.message,
      });
    }
  });
  
  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });
  
  const markSingleReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });
  
  const unreadCount = notifications?.filter((notification: Notification) => !notification.read).length || 0;
  
  const clearNotifications = () => {
    markAllReadMutation.mutate();
  };
  
  const handleNotificationDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markSingleReadMutation.mutate(id);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search licenses..." 
              className="pl-10 bg-gray-50 border border-gray-200 focus-visible:ring-clms-lightBlue" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={clearNotifications}
                    disabled={markAllReadMutation.isPending}
                  >
                    {markAllReadMutation.isPending ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      "Clear all"
                    )}
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[300px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <Loader2 size={30} className="text-gray-300 mb-2 animate-spin" />
                    <p className="text-gray-500">Loading notifications...</p>
                  </div>
                ) : notifications?.length ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification: Notification) => (
                      <NotificationItem 
                        key={notification.id}
                        notification={notification}
                        onDismiss={(e) => handleNotificationDismiss(notification.id, e)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <Bell size={40} className="text-gray-300 mb-2" />
                    <p className="text-gray-500">No notifications</p>
                    <p className="text-gray-400 text-sm">We'll notify you when something important happens.</p>
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <div className="h-8 w-8 rounded-full bg-clms-lightBlue flex items-center justify-center text-white cursor-pointer hover:bg-clms-blue transition-colors">
            C
          </div>
        </div>
      </div>
    </header>
  );
};

const NotificationItem = ({ 
  notification, 
  onDismiss 
}: { 
  notification: Notification; 
  onDismiss: (e: React.MouseEvent) => void;
}) => {
  const getBgColor = () => {
    if (notification.read) return '';
    
    switch (notification.type) {
      case 'expiry': return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'compliance': return 'bg-red-50 border-l-4 border-red-400';
      case 'request': return 'bg-blue-50 border-l-4 border-blue-400';
      case 'system': return 'bg-green-50 border-l-4 border-green-400';
      default: return 'bg-blue-50 border-l-4 border-blue-400';
    }
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now.getTime() - past.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className={`p-4 ${getBgColor()}`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</h4>
        <button className="text-gray-400 hover:text-gray-600" onClick={onDismiss}>
          <X size={14} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
      <span className="text-xs text-gray-400 mt-1 block">{timeAgo(notification.time)}</span>
    </div>
  );
};

export default ClientNavbar;
