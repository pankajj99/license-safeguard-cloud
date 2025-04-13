
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Bell, Key, Lock, Mail, ShieldCheck, User } from 'lucide-react';

// Define user type
type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  lastLogin: string;
  notificationPreferences: {
    emails: boolean;
    expirationReminders: boolean;
    usageAlerts: boolean;
    newsUpdates: boolean;
  };
  sessions: {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }[];
};

const ClientProfile = () => {
  // Mock profile data
  const [profile, setProfile] = useState<UserProfile>({
    id: 'USR-12345',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Corp',
    role: 'License Administrator',
    phone: '+1 (555) 123-4567',
    lastLogin: '2025-04-12T10:30:00Z',
    notificationPreferences: {
      emails: true,
      expirationReminders: true,
      usageAlerts: true,
      newsUpdates: false
    },
    sessions: [
      {
        id: 'SESS-001',
        device: 'Chrome / Windows',
        location: 'New York, USA',
        lastActive: '2025-04-13T08:30:00Z',
        current: true
      },
      {
        id: 'SESS-002',
        device: 'Safari / macOS',
        location: 'New York, USA',
        lastActive: '2025-04-10T14:15:00Z',
        current: false
      },
      {
        id: 'SESS-003',
        device: 'Mobile App / iOS',
        location: 'Boston, USA',
        lastActive: '2025-04-05T09:45:00Z',
        current: false
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    company: profile.company,
    phone: profile.phone
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setProfile(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  const handleNotificationChange = (key: keyof UserProfile['notificationPreferences']) => {
    setProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [key]: !prev.notificationPreferences[key]
      }
    }));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="bg-clms-lightBlue hover:bg-clms-blue"
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  {isEditing ? (
                    // Edit mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile} className="bg-clms-lightBlue hover:bg-clms-blue">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">First Name</p>
                          <p className="font-medium">{profile.firstName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Last Name</p>
                          <p className="font-medium">{profile.lastName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profile.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Company</p>
                          <p className="font-medium">{profile.company}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Role</p>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{profile.role}</p>
                            <Badge className="bg-blue-100 text-blue-800">Administrator</Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{profile.phone}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="font-medium">{profile.id}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Last Login</p>
                        <p className="font-medium">{formatDate(profile.lastLogin)}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">Email Notifications</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emails">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive general email notifications</p>
                        </div>
                        <Switch 
                          id="emails" 
                          checked={profile.notificationPreferences.emails}
                          onCheckedChange={() => handleNotificationChange('emails')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="expirationReminders">Expiration Reminders</Label>
                          <p className="text-sm text-gray-500">Get notified before licenses expire</p>
                        </div>
                        <Switch 
                          id="expirationReminders" 
                          checked={profile.notificationPreferences.expirationReminders}
                          onCheckedChange={() => handleNotificationChange('expirationReminders')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="usageAlerts">Usage Alerts</Label>
                          <p className="text-sm text-gray-500">Notify when seat limits are approaching</p>
                        </div>
                        <Switch 
                          id="usageAlerts" 
                          checked={profile.notificationPreferences.usageAlerts}
                          onCheckedChange={() => handleNotificationChange('usageAlerts')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="newsUpdates">News & Updates</Label>
                          <p className="text-sm text-gray-500">Receive product updates and news</p>
                        </div>
                        <Switch 
                          id="newsUpdates" 
                          checked={profile.notificationPreferences.newsUpdates}
                          onCheckedChange={() => handleNotificationChange('newsUpdates')}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Active Sessions</h3>
                    
                    <div className="space-y-3">
                      {profile.sessions.map(session => (
                        <div 
                          key={session.id} 
                          className="p-3 border rounded-md flex items-start justify-between"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${session.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                              <User size={16} className={session.current ? 'text-green-600' : 'text-gray-600'} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{session.device}</p>
                                {session.current && <Badge className="bg-green-100 text-green-800">Current</Badge>}
                              </div>
                              <p className="text-sm text-gray-500">
                                {session.location} • Last active {formatDate(session.lastActive)}
                              </p>
                            </div>
                          </div>
                          
                          {!session.current && (
                            <Button variant="outline" size="sm">
                              Log Out
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Password</h3>
                    <Button variant="outline" className="gap-2">
                      <Lock size={16} />
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Two-Factor Authentication</h3>
                    <Button variant="outline" className="gap-2">
                      <ShieldCheck size={16} />
                      Enable 2FA
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium">Client Administrator</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Key size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Licenses</p>
                    <p className="font-medium">3 Licenses</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Bell size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Notifications</p>
                    <p className="font-medium">2 Unread</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Mail size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Verified</p>
                    <p className="font-medium">Yes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" />
                Account Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Your organization's main license is set to expire in 30 days. Please contact your
                account manager to discuss renewal options.
              </p>
              <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                Contact Account Manager
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
