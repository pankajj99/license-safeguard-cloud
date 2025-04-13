
import React, { useState } from 'react';
import { Bell, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const ClientNavbar = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  
  const clearNotifications = () => {
    setNotificationCount(0);
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
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium">Notifications</h3>
                {notificationCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={clearNotifications}
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[300px]">
                {notificationCount > 0 ? (
                  <div className="divide-y divide-gray-100">
                    <NotificationItem 
                      title="License Expiring Soon" 
                      description="Your Enterprise Suite Pro license will expire in 15 days."
                      time="2 hours ago"
                      type="warning"
                    />
                    <NotificationItem 
                      title="License Renewal Complete" 
                      description="Security Manager license was successfully renewed."
                      time="Yesterday"
                      type="success"
                    />
                    <NotificationItem 
                      title="Seats Usage Alert" 
                      description="Your Data Analyzer Pro license is at 90% seat capacity."
                      time="2 days ago"
                      type="info"
                    />
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
  title, 
  description, 
  time, 
  type 
}: { 
  title: string; 
  description: string; 
  time: string; 
  type: 'info' | 'warning' | 'success' | 'error' 
}) => {
  const getBgColor = () => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'success': return 'bg-green-50 border-l-4 border-green-400';
      case 'error': return 'bg-red-50 border-l-4 border-red-400';
      default: return 'bg-blue-50 border-l-4 border-blue-400';
    }
  };

  return (
    <div className={`p-4 ${getBgColor()}`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">{title}</h4>
        <button className="text-gray-400 hover:text-gray-600">
          <X size={14} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <span className="text-xs text-gray-400 mt-1 block">{time}</span>
    </div>
  );
};

export default ClientNavbar;
