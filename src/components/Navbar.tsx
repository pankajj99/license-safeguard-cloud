
import React from 'react';
import { Bell, Search, LogIn, User, Key, Home, FileText, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  const isClientPath = location.pathname.startsWith('/client');
  
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
              placeholder="Search License Safeguard..." 
              className="pl-10 bg-gray-50 border border-gray-200 focus-visible:ring-clms-lightBlue" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Show Sign In button if not on client pages */}
          {!isClientPath && (
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link to="/login">
                <LogIn size={18} />
                Sign In
              </Link>
            </Button>
          )}

          {/* Client navigation if on client pages */}
          {isClientPath && (
            <nav className="hidden md:flex items-center space-x-6 mr-4">
              <Link to="/client" className="text-gray-700 hover:text-clms-blue flex items-center gap-1.5">
                <Home size={16} />
                <span>Dashboard</span>
              </Link>
              <Link to="/client/licenses" className="text-gray-700 hover:text-clms-blue flex items-center gap-1.5">
                <Key size={16} />
                <span>Licenses</span>
              </Link>
            </nav>
          )}

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Show user dropdown if on client pages */}
          {isClientPath ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 rounded-full bg-clms-blue flex items-center justify-center text-white">
                  JD
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-gray-500">john.doe@company.com</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/client/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/client/licenses" className="cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>My Licenses</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/client/profile?tab=settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="cursor-pointer text-red-600">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="h-8 w-8 rounded-full bg-clms-blue flex items-center justify-center text-white">
              LS
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
