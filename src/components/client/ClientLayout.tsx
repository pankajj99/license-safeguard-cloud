
import React, { useState } from 'react';
import ClientSidebar from './ClientSidebar';
import ClientNavbar from './ClientNavbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out bg-clms-blue",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <ClientSidebar collapsed={sidebarCollapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 bg-clms-blue text-white rounded-full border border-clms-blue hover:bg-clms-lightBlue hover:text-white"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
        </Button>
      </div>
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        <ClientNavbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
