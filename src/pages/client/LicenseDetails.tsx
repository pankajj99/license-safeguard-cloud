
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Download, FileText, HelpCircle, Key, RefreshCw, User, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Define license type
type License = {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'expired' | 'renewing';
  expiryDate: string;
  purchaseDate: string;
  lastRenewal: string;
  productKey: string;
  seats: {
    used: number;
    total: number;
  };
  features: string[];
  contacts: {
    primary: {
      name: string;
      email: string;
    };
    technical: {
      name: string;
      email: string;
    };
  };
  documents: {
    id: string;
    name: string;
    type: string;
    date: string;
  }[];
  history: {
    id: string;
    action: string;
    date: string;
    user: string;
  }[];
};

const ClientLicenseDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch this data from an API
  const license: License = {
    id: id || 'LIC-1234',
    name: 'Enterprise Suite',
    description: 'Complete enterprise license package with all modules and premium support',
    type: 'Annual',
    status: 'active',
    expiryDate: '2025-12-15',
    purchaseDate: '2024-12-15',
    lastRenewal: '2024-12-15',
    productKey: 'ENTX-XXXX-XXXX-XXXX-XXXX',
    seats: {
      used: 42,
      total: 50
    },
    features: [
      'Core Platform Access',
      'Advanced Analytics',
      'Integration API',
      'Premium Support',
      'Mobile Application',
      'Custom Reporting'
    ],
    contacts: {
      primary: {
        name: 'John Smith',
        email: 'john.smith@example.com'
      },
      technical: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com'
      }
    },
    documents: [
      {
        id: 'DOC-001',
        name: 'License Agreement',
        type: 'PDF',
        date: '2024-12-15'
      },
      {
        id: 'DOC-002',
        name: 'Invoice #INV-12345',
        type: 'PDF',
        date: '2024-12-15'
      },
      {
        id: 'DOC-003',
        name: 'Support Terms',
        type: 'PDF',
        date: '2024-12-15'
      }
    ],
    history: [
      {
        id: 'HIST-001',
        action: 'License activated',
        date: '2024-12-15',
        user: 'System'
      },
      {
        id: 'HIST-002',
        action: 'User John Doe added',
        date: '2024-12-16',
        user: 'Admin'
      },
      {
        id: 'HIST-003',
        action: '5 seats added',
        date: '2025-02-10',
        user: 'Admin'
      },
      {
        id: 'HIST-004',
        action: 'License configuration updated',
        date: '2025-03-22',
        user: 'Sarah Johnson'
      }
    ]
  };

  const getStatusBadge = (status: License['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'renewing':
        return <Badge className="bg-blue-100 text-blue-800">Renewing</Badge>;
      default:
        return null;
    }
  };

  // Calculate days until expiry
  const today = new Date();
  const expiryDate = new Date(license.expiryDate);
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Convert date strings to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/client/licenses">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft size={16} />
            Back to Licenses
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{license.name}</h1>
        {getStatusBadge(license.status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>License Details</CardTitle>
              <CardDescription>{license.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">License ID</p>
                      <p className="font-medium">{license.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{license.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Purchase Date</p>
                      <p className="font-medium">{formatDate(license.purchaseDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Last Renewal</p>
                      <p className="font-medium">{formatDate(license.lastRenewal)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium">{formatDate(license.expiryDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Product Key</p>
                      <p className="font-medium">{license.productKey}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Included Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {license.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500">Primary Contact</p>
                        <p className="font-medium">{license.contacts.primary.name}</p>
                        <p className="text-sm">{license.contacts.primary.email}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500">Technical Contact</p>
                        <p className="font-medium">{license.contacts.technical.name}</p>
                        <p className="text-sm">{license.contacts.technical.email}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="users" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">License Seats</h3>
                        <p className="text-sm text-gray-500">
                          {license.seats.used} of {license.seats.total} seats used
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Request More Seats</Button>
                    </div>
                    
                    <Progress 
                      value={(license.seats.used / license.seats.total) * 100} 
                      className="h-2"
                    />
                    
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date Added</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Mock users data */}
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                  <User size={14} />
                                </div>
                                <span>John Doe</span>
                              </div>
                            </TableCell>
                            <TableCell>john.doe@example.com</TableCell>
                            <TableCell>Dec 16, 2024</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                  <User size={14} />
                                </div>
                                <span>Jane Smith</span>
                              </div>
                            </TableCell>
                            <TableCell>jane.smith@example.com</TableCell>
                            <TableCell>Jan 3, 2025</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                  <User size={14} />
                                </div>
                                <span>Robert Johnson</span>
                              </div>
                            </TableCell>
                            <TableCell>robert.j@example.com</TableCell>
                            <TableCell>Feb 12, 2025</TableCell>
                            <TableCell><Badge className="bg-amber-100 text-amber-800">Pending</Badge></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-4">
                  <div className="space-y-4">
                    {license.documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-md">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download size={16} />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="mt-4">
                  <div className="space-y-4">
                    {license.history.map(item => (
                      <div key={item.id} className="flex items-start gap-3 p-3 border rounded-md">
                        <div className="p-2 bg-gray-100 rounded-full mt-1">
                          <RefreshCw size={14} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <div className="flex text-sm text-gray-500 mt-1">
                            <span>{item.date}</span>
                            <span className="mx-1">•</span>
                            <span>{item.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>License Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Expiration</span>
                    <span className="text-sm font-medium">{daysUntilExpiry} days left</span>
                  </div>
                  <Progress value={(daysUntilExpiry / 365) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Expires on {formatDate(license.expiryDate)}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Seat Usage</span>
                    <span className="text-sm font-medium">{license.seats.used}/{license.seats.total}</span>
                  </div>
                  <Progress value={(license.seats.used / license.seats.total) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{license.seats.total - license.seats.used} seats available</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2">
              <Button className="w-full bg-clms-lightBlue hover:bg-clms-blue">
                Renew License
              </Button>
              <Button variant="outline" className="w-full">
                Request Support
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 rounded-full">
                  <HelpCircle size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">License Support</p>
                  <p className="text-sm text-gray-500">Contact our team for license-related issues</p>
                  <Button variant="link" className="p-0 h-auto text-clms-lightBlue">
                    support@example.com
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-green-100 rounded-full">
                  <Key size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Activation Help</p>
                  <p className="text-sm text-gray-500">Having trouble activating?</p>
                  <Button variant="link" className="p-0 h-auto text-clms-lightBlue">
                    View Activation Guide
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-amber-100 rounded-full">
                  <Calendar size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Renewal Process</p>
                  <p className="text-sm text-gray-500">Learn about the renewal process</p>
                  <Button variant="link" className="p-0 h-auto text-clms-lightBlue">
                    View Renewal Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientLicenseDetails;
