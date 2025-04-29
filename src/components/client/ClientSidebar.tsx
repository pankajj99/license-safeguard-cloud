
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Key, 
  FileText, 
  MessageSquare, 
  Bell, 
  Settings, 
  User, 
  HelpCircle,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientSidebarProps {
  collapsed: boolean;
}

const ClientSidebar = ({ collapsed }: ClientSidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      icon: Home, 
      path: '/client/dashboard' 
    },
    { 
      name: 'Client Portal', 
      icon: LayoutDashboard, 
      path: '/client/portal' 
    },
    { 
      name: 'Licenses', 
      icon: Key, 
      path: '/client/licenses' 
    },
    { 
      name: 'Documents', 
      icon: FileText, 
      path: '/client/documents' 
    },
    { 
      name: 'Support', 
      icon: MessageSquare, 
      path: '/client/support' 
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      path: '/client/notifications' 
    },
    { 
      name: 'Profile', 
      icon: User, 
      path: '/client/profile' 
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: '/client/settings' 
    },
    { 
      name: 'Help', 
      icon: HelpCircle, 
      path: '/client/help' 
    },
  ];
  
  return (
    <div className="h-full">
      <div className={cn(
        "flex justify-center items-center h-16 border-b border-white/10",
        collapsed ? "px-2" : "px-4"
      )}>
        {collapsed ? (
          <div className="h-8 w-8 rounded-full bg-white text-clms-blue flex items-center justify-center font-bold text-lg">
            C
          </div>
        ) : (
          <div className="text-lg font-bold text-white">Client CLMS</div>
        )}
      </div>
      
      <div className="px-2 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
                collapsed ? "justify-center" : ""
              )}
            >
              <item.icon
                size={18}
                className={cn("flex-shrink-0", collapsed ? "" : "mr-3")}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ClientSidebar;
