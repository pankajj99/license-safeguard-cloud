
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LicenseUsage {
  id: string;
  product: string;
  used: number;
  total: number;
  percentage: number;
}

interface LicenseUsageSummaryProps {
  usages: LicenseUsage[];
}

const LicenseUsageSummary = ({ usages }: LicenseUsageSummaryProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">License Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {usages.map((usage) => (
          <div key={usage.id}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{usage.product}</span>
              <span className="text-sm text-gray-500">
                {usage.used} of {usage.total} seats used
              </span>
            </div>
            <div className="space-y-2">
              <Progress 
                value={usage.percentage} 
                className="h-2" 
                indicatorClassName={
                  usage.percentage > 90 
                    ? "bg-red-500" 
                    : usage.percentage > 75 
                    ? "bg-yellow-500" 
                    : "bg-green-500"
                }
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{usage.percentage}% utilized</span>
                {usage.percentage > 90 && (
                  <span className="text-red-500">Near limit</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LicenseUsageSummary;
