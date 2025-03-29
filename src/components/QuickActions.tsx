
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Download, Upload } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button className="py-6 h-auto flex-col gap-2 bg-clms-lightBlue hover:bg-clms-blue">
          <Plus size={24} />
          <span>Create License</span>
        </Button>
        
        <Button variant="outline" className="py-6 h-auto flex-col gap-2 border-clms-teal text-clms-teal hover:bg-clms-teal hover:text-white">
          <RefreshCw size={24} />
          <span>Renew License</span>
        </Button>
        
        <Button variant="outline" className="py-6 h-auto flex-col gap-2">
          <Download size={24} />
          <span>Export Report</span>
        </Button>
        
        <Button variant="outline" className="py-6 h-auto flex-col gap-2">
          <Upload size={24} />
          <span>Bulk Import</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
