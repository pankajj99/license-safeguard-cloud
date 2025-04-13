
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Key, 
  User,
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/client', icon: Home },
  { name: 'My Licenses', href: '/client/licenses', icon: Key },
  { name: 'Profile', href: '/client/profile', icon: User },
];

const ClientSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    // This would be implemented with actual authentication
    window.location.href = '/client/login';
  };

  return (
    <div 
      className={cn(
        "bg-clms-lightBlue text-white transition-all duration-300 relative flex flex-col h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex items-center py-6 transition-all duration-300",
        collapsed ? "justify-center" : "px-4"
      )}>
        {!collapsed && <span className="font-bold text-xl tracking-tight">Client Portal</span>}
        {collapsed && <span className="font-bold text-xl">C</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-6 translate-x-1/2 bg-clms-lightBlue text-white rounded-full p-1 hover:bg-opacity-90"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 mt-5">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center py-3 px-3 rounded-md transition-all",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-200 hover:bg-white/5 hover:text-white",
                    collapsed ? "justify-center" : ""
                  )}
                >
                  <Icon size={20} />
                  {!collapsed && <span className="ml-4">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cn(
        "p-4 border-t border-white/10 mt-auto",
        collapsed ? "text-center" : ""
      )}>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center py-2 px-3 rounded-md text-gray-200 hover:bg-white/5 hover:text-white w-full",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default ClientSidebar;
