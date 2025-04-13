
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Key, 
  User, 
  Settings, 
  LogOut,
  HelpCircle,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/client', icon: Home },
  { name: 'Licenses', href: '/client/licenses', icon: Key },
  { name: 'Profile', href: '/client/profile', icon: User },
  { name: 'Documents', href: '/client/documents', icon: FileText },
  { name: 'Help', href: '/client/help', icon: HelpCircle },
  { name: 'Settings', href: '/client/settings', icon: Settings },
];

interface ClientSidebarProps {
  collapsed?: boolean;
}

const ClientSidebar = ({ collapsed = false }: ClientSidebarProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full text-white">
      <div className={cn(
        "flex items-center h-16 transition-all duration-300",
        collapsed ? "justify-center" : "px-6"
      )}>
        {!collapsed ? (
          <span className="font-bold text-xl">Client Portal</span>
        ) : (
          <span className="font-bold text-xl">C</span>
        )}
      </div>

      <nav className="flex-1 py-6">
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

      <div className="p-4 mt-auto">
        <Link
          to="/client/login"
          className={cn(
            "flex items-center py-3 px-3 rounded-md transition-all text-gray-300 hover:bg-white/5 hover:text-white",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-4">Logout</span>}
        </Link>
      </div>

      <div className={cn(
        "p-4 border-t border-white/10",
        collapsed ? "text-center" : ""
      )}>
        {!collapsed ? (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-clms-lightBlue flex items-center justify-center text-white font-medium">
              C
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Client User</p>
              <p className="text-xs text-gray-400">client@example.com</p>
            </div>
          </div>
        ) : (
          <div className="h-8 w-8 mx-auto rounded-full bg-clms-lightBlue flex items-center justify-center text-white font-medium">
            C
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSidebar;
