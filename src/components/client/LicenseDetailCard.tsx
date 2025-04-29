
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, FileText, Download, MessageSquare, Key, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { License } from '@/types/database.types';

interface LicenseDetailCardProps {
  license: License;
  compact?: boolean;
}

export const LicenseDetailCard = ({ license, compact = false }: LicenseDetailCardProps) => {
  // Calculate days until expiry
  const today = new Date();
  const expiryDate = new Date(license.expiry_date);
  const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Determine status badge color
  const getBadgeStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'renewing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader className={compact ? 'pb-2' : 'pb-3'}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={compact ? 'text-lg' : ''}>{license.name}</CardTitle>
            <CardDescription className="mt-1">
              {license.id} • {license.type}
            </CardDescription>
          </div>
          <Badge className={getBadgeStyles(license.status)}>
            {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={compact ? 'pb-2' : ''}>
        <div className="space-y-4">
          {!compact && (
            <p className="text-sm text-gray-500">{license.description}</p>
          )}
          
          {license.status !== 'expired' && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Expires {formatDate(license.expiry_date)}</span>
                <span>{daysRemaining} days remaining</span>
              </div>
              <Progress value={100 - (daysRemaining / 365 * 100)} className="h-2" />
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Seats Usage</span>
            <span>{license.used_seats}/{license.total_seats}</span>
          </div>
          <Progress value={(license.used_seats / license.total_seats) * 100} className="h-2" />
          
          {!compact && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-sm">
                <p className="text-gray-500">Purchase Date</p>
                <p className="font-medium">{formatDate(license.purchase_date)}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500">Last Renewal</p>
                <p className="font-medium">
                  {license.last_renewal_date ? formatDate(license.last_renewal_date) : 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className={`${compact ? 'pt-2' : 'pt-4'} flex justify-end gap-2`}>
        <Link to={`/client/licenses/${license.id}`}>
          <Button variant="outline" size={compact ? 'sm' : 'default'}>View Details</Button>
        </Link>
        {license.status === 'expired' && (
          <Button 
            size={compact ? 'sm' : 'default'} 
            className="bg-clms-lightBlue hover:bg-clms-blue"
          >
            Renew License
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
