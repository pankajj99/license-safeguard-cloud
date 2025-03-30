
import React from 'react';
import Layout from '@/components/Layout';
import DashboardStats from '@/components/DashboardStats';
import LicenseTable from '@/components/LicenseTable';
import NotificationsList from '@/components/NotificationsList';
import QuickActions from '@/components/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart } from '@/components/ReportCharts';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ArrowUpRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome to your license management overview</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/licenses">Manage Licenses</Link>
            </Button>
          </div>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-900">License Trend</CardTitle>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Info</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">License Growth Trend</h4>
                    <p className="text-sm text-muted-foreground">
                      This chart shows the growth in active licenses over the past 6 months.
                      Each data point represents the total licenses at the end of the month.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardHeader>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
          
          <LicenseTable />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <NotificationsList />
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-clms-lightBlue pl-4 py-1">
                <p className="text-sm font-medium">New license created</p>
                <p className="text-xs text-gray-500">Standard license for Stark Enterprises</p>
                <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
              </div>
              
              <div className="border-l-4 border-clms-green pl-4 py-1">
                <p className="text-sm font-medium">License activated</p>
                <p className="text-xs text-gray-500">Enterprise license for Wayne Enterprises</p>
                <p className="text-xs text-gray-400 mt-1">45 minutes ago</p>
              </div>
              
              <div className="border-l-4 border-clms-teal pl-4 py-1">
                <p className="text-sm font-medium">Client details updated</p>
                <p className="text-xs text-gray-500">Updated contact information for Acme Corp</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday at 4:30 PM</p>
              </div>
              
              <div className="border-l-4 border-clms-yellow pl-4 py-1">
                <p className="text-sm font-medium">License renewal reminder sent</p>
                <p className="text-xs text-gray-500">Standard license for Globex Industries</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday at 10:15 AM</p>
              </div>
              
              <Button variant="ghost" className="w-full flex gap-2 mt-2 text-clms-blue" asChild>
                <Link to="/notifications">
                  View All Activities <ArrowUpRight size={16} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
