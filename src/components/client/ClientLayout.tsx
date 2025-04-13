
import React from 'react';
import ClientSidebar from './ClientSidebar';
import ClientNavbar from './ClientNavbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />
      <div className="flex flex-col flex-1">
        <ClientNavbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
