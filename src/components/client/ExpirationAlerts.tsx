
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExpirationAlert {
  id: string;
  product: string;
  daysLeft: number;
  expiryDate: string;
}

interface ExpirationAlertsProps {
  alerts: ExpirationAlert[];
}

const ExpirationAlerts = ({ alerts }: ExpirationAlertsProps) => {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8 border-l-4 border-l-yellow-500">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <AlertTriangle size={18} className="text-yellow-500" />
          Licenses Expiring Soon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 bg-yellow-50 rounded-md">
              <div>
                <p className="font-medium">{alert.product}</p>
                <p className="text-sm text-gray-600">
                  Expires in <span className="font-medium text-yellow-700">{alert.daysLeft} days</span> ({alert.expiryDate})
                </p>
              </div>
              <Button size="sm" className="bg-clms-lightBlue hover:bg-clms-blue" asChild>
                <Link to={`/client/licenses/${alert.id}`}>
                  <span>Renew Now</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpirationAlerts;
