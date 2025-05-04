
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Key, 
  Users, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Licenses', href: '/licenses', icon: Key },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "bg-clms-blue text-white transition-all duration-300 relative flex flex-col h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex items-center py-6 transition-all duration-300",
        collapsed ? "justify-center" : "px-4"
      )}>
        {!collapsed && <span className="font-bold text-xl tracking-tight">CLMS</span>}
        {collapsed && <span className="font-bold text-xl">C</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-6 translate-x-1/2 bg-clms-blue text-white rounded-full p-1 hover:bg-opacity-90"
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
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
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
        {!collapsed ? (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-clms-lightBlue flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@clms.com</p>
            </div>
          </div>
        ) : (
          <div className="h-8 w-8 mx-auto rounded-full bg-clms-lightBlue flex items-center justify-center text-white font-medium">
            A
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
