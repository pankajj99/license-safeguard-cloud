
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface LicenseFormProps {
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

const LicenseForm = ({ isEditing = false, onSave, onCancel }: LicenseFormProps) => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)); // Default: 1 year from now

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit License' : 'Create New License'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="license-name">License Name</Label>
            <Input id="license-name" placeholder="Enter license name" defaultValue={isEditing ? "Enterprise License - Acme Corp" : ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license-type">License Type</Label>
            <Select defaultValue={isEditing ? "enterprise" : ""}>
              <SelectTrigger id="license-type">
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select defaultValue={isEditing ? "acme" : ""}>
              <SelectTrigger id="client">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acme">Acme Corporation</SelectItem>
                <SelectItem value="globex">Globex Industries</SelectItem>
                <SelectItem value="stark">Stark Enterprises</SelectItem>
                <SelectItem value="wayne">Wayne Enterprises</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select defaultValue={isEditing ? "clms-pro" : ""}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clms-basic">CLMS Basic</SelectItem>
                <SelectItem value="clms-pro">CLMS Professional</SelectItem>
                <SelectItem value="clms-enterprise">CLMS Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Seats/Users</Label>
            <Input id="seats" type="number" placeholder="Number of seats" defaultValue={isEditing ? "50" : ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key">License Key</Label>
            <Input id="key" placeholder="Generated automatically" defaultValue={isEditing ? "CLMS-ENT-4269-8547-ACME" : ""} readOnly={isEditing} className={isEditing ? "bg-gray-50" : ""} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Add any additional information" rows={4} defaultValue={isEditing ? "Enterprise license includes premium support and all features." : ""} />
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Switch id="auto-renew" defaultChecked={isEditing} />
              <Label htmlFor="auto-renew">Auto-renew license</Label>
            </div>
            <p className="text-sm text-gray-500 pl-7">License will be automatically renewed before expiry</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is-active" defaultChecked={isEditing} />
            <Label htmlFor="is-active">{isEditing ? "Active" : "Activate immediately"}</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          {isEditing ? 'Update License' : 'Create License'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LicenseForm;
