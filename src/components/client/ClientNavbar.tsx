
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NotificationCenter } from './NotificationCenter';

const ClientNavbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className="pl-10 bg-gray-50 border border-gray-200 focus-visible:ring-clms-lightBlue" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationCenter variant="icon" />
          <div className="h-8 w-8 rounded-full bg-clms-blue flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientNavbar;
