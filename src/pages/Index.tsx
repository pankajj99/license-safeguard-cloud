
import React from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import LicenseTable from '@/components/LicenseTable';
import NotificationsList from '@/components/NotificationsList';
import QuickActions from '@/components/QuickActions';

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to your license management overview</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <LicenseTable />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <NotificationsList />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
