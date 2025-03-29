
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ClientFormProps {
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

const ClientForm = ({ isEditing = false, onSave, onCancel }: ClientFormProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Client' : 'Add New Client'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Client Details</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Enter company name" defaultValue={isEditing ? "Acme Corporation" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue={isEditing ? "technology" : ""}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" defaultValue={isEditing ? "https://acme.com" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-type">Client Type</Label>
                  <Select defaultValue={isEditing ? "enterprise" : ""}>
                    <SelectTrigger id="client-type">
                      <SelectValue placeholder="Select client type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small Business</SelectItem>
                      <SelectItem value="medium">Medium Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="education">Educational</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" defaultValue={isEditing ? "123 Acme St" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" defaultValue={isEditing ? "San Francisco" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="State or province" defaultValue={isEditing ? "California" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input id="zip" placeholder="ZIP or postal code" defaultValue={isEditing ? "94105" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue={isEditing ? "us" : ""}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes about this client" rows={3} defaultValue={isEditing ? "Major enterprise client with multiple license types." : ""} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contacts">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Primary Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" placeholder="Full name" defaultValue={isEditing ? "John Smith" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-title">Job Title</Label>
                  <Input id="contact-title" placeholder="Job title" defaultValue={isEditing ? "IT Director" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="Email address" defaultValue={isEditing ? "john.smith@acme.com" : ""} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input id="contact-phone" placeholder="Phone number" defaultValue={isEditing ? "(555) 123-4567" : ""} />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <h3 className="text-lg font-medium">Additional Contacts</h3>
                <Button variant="outline" size="sm">Add Contact</Button>
              </div>
              
              {isEditing && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-gray-500">License Administrator</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm">jane.doe@acme.com | (555) 987-6543</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Robert Johnson</p>
                        <p className="text-sm text-gray-500">Finance Manager</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm">robert.johnson@acme.com | (555) 456-7890</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-renew">Automatic License Renewal</Label>
                  <p className="text-sm text-gray-500">Automatically renew licenses before they expire</p>
                </div>
                <Switch id="auto-renew" defaultChecked={isEditing} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications for license events</p>
                </div>
                <Switch id="notifications" defaultChecked={isEditing} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reports">Monthly Reports</Label>
                  <p className="text-sm text-gray-500">Send monthly license usage reports</p>
                </div>
                <Switch id="reports" defaultChecked={isEditing} />
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="communication-preferences">Communication Preferences</Label>
                <Select defaultValue={isEditing ? "email" : ""}>
                  <SelectTrigger id="communication-preferences">
                    <SelectValue placeholder="Select preferred contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="both">Both Email and Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billing-cycle">Preferred Billing Cycle</Label>
                <Select defaultValue={isEditing ? "annual" : ""}>
                  <SelectTrigger id="billing-cycle">
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          {isEditing ? 'Update Client' : 'Create Client'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClientForm;
