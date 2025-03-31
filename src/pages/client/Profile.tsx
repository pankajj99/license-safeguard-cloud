
import React from 'react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Building, User, Lock, CreditCard, Bell, ShieldCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const ClientProfile = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-white p-1 border">
          <TabsTrigger value="personal" className="flex gap-2">
            <User size={16} />
            Personal
          </TabsTrigger>
          <TabsTrigger value="company" className="flex gap-2">
            <Building size={16} />
            Company
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2">
            <Lock size={16} />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex gap-2">
            <CreditCard size={16} />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2">
            <Bell size={16} />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 space-y-2">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                    JD
                  </div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="IT Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Information Technology" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://acme.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Number of Employees</Label>
                  <Input id="employeeCount" defaultValue="250" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Main Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue="California" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input id="zipCode" defaultValue="94105" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="md:col-span-2 border-t pt-4"></div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-clms-blue" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                <div>
                  <p className="font-medium">Two-factor authentication is disabled</p>
                  <p className="text-sm text-gray-500">Protect your account with an additional security layer</p>
                </div>
                <Button>Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md mb-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/2025</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">Default</Badge>
              </div>
              
              <Button variant="outline">Add Payment Method</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">Invoice #INV-2023-001</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Oct 15, 2023</p>
                    <p className="font-medium">$12,500.00</p>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">Invoice #INV-2023-002</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Sep 15, 2023</p>
                    <p className="font-medium">$7,200.00</p>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">Invoice #INV-2023-003</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Aug 15, 2023</p>
                    <p className="font-medium">$3,750.00</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="mt-6">View All Invoices</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">License Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>License Expiration Reminders</Label>
                      <p className="text-sm text-gray-500">Receive reminders when licenses are about to expire</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Seat Usage Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified when approaching seat usage limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>License Updates</Label>
                      <p className="text-sm text-gray-500">Notifications about changes to your licenses</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Account Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-gray-500">Important security-related notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Newsletter</Label>
                      <p className="text-sm text-gray-500">Monthly newsletter with product updates and tips</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Promotional Emails</Label>
                      <p className="text-sm text-gray-500">Special offers and promotional content</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ClientProfile;
