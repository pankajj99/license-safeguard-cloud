
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  const isClientPath = location.pathname.startsWith('/client');
  
  // For auth pages, don't use the standard layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Only show sidebar on admin pages, not on client pages */}
      {!isClientPath && <Sidebar />}
      <div className={`flex flex-col flex-1 ${isClientPath ? 'w-full' : ''}`}>
        <Navbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
        {/* Footer for client pages */}
        {isClientPath && (
          <footer className="bg-white border-t border-gray-200 py-6 px-8">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600">© 2023 License Safeguard. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-gray-600 hover:text-clms-blue">Terms of Service</a>
                  <a href="#" className="text-sm text-gray-600 hover:text-clms-blue">Privacy Policy</a>
                  <a href="#" className="text-sm text-gray-600 hover:text-clms-blue">Support</a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Layout;
