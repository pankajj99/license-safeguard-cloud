
import React from 'react';
import { 
  Key, 
  Users, 
  AlertTriangle, 
  Clock 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change 
}: { 
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change?: { value: string; positive: boolean };
}) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6 flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {change && (
            <p className={`text-xs mt-1 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.positive ? '+' : ''}{change.value} from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className={color} size={24} />
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
      <StatsCard
        title="Total Licenses"
        value="1,254"
        icon={Key}
        color="text-clms-lightBlue"
        change={{ value: "5.3%", positive: true }}
      />
      <StatsCard
        title="Active Clients"
        value="867"
        icon={Users}
        color="text-clms-green"
        change={{ value: "2.1%", positive: true }}
      />
      <StatsCard
        title="Expiring Soon"
        value="28"
        icon={Clock}
        color="text-clms-yellow"
      />
      <StatsCard
        title="Compliance Issues"
        value="5"
        icon={AlertTriangle}
        color="text-clms-red"
      />
    </div>
  );
};

export default DashboardStats;
