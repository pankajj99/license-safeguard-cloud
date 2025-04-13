
import React from 'react';
import { Bell, Search, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  
  // Don't show navbar on auth pages
  if (isAuthPage) {
    return null;
  }

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
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/login">
              <LogIn size={18} />
              Sign In
            </Link>
          </Button>
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-clms-blue flex items-center justify-center text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
