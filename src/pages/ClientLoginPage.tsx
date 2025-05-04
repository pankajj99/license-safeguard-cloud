
import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Check } from 'lucide-react';

const ClientLoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding and benefits */}
      <div className="md:w-1/2 bg-clms-blue p-8 md:p-12 text-white flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">License Safeguard</h1>
          <p className="mt-2 text-blue-200">Client Portal</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Manage your software licenses with ease</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-blue-700 rounded-full">
                <Check size={16} />
              </div>
              <div>
                <h3 className="font-medium text-blue-100">Easy License Management</h3>
                <p className="text-blue-200 text-sm mt-1">View and manage all your licenses in one central dashboard</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-blue-700 rounded-full">
                <Check size={16} />
              </div>
              <div>
                <h3 className="font-medium text-blue-100">Expiration Tracking</h3>
                <p className="text-blue-200 text-sm mt-1">Get notified when licenses are about to expire</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-blue-700 rounded-full">
                <Check size={16} />
              </div>
              <div>
                <h3 className="font-medium text-blue-100">Usage Monitoring</h3>
                <p className="text-blue-200 text-sm mt-1">Monitor seat usage and optimize your license allocation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-blue-700 rounded-full">
                <Check size={16} />
              </div>
              <div>
                <h3 className="font-medium text-blue-100">Secure Access</h3>
                <p className="text-blue-200 text-sm mt-1">Role-based access control for your team members</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-blue-200">
          &copy; 2023 License Safeguard. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-clms-lightBlue rounded-full flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Client Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your license dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-clms-lightBlue hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full bg-clms-lightBlue hover:bg-clms-blue">
              Sign In
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don't have an account? 
              <Link to="/signup" className="text-clms-lightBlue hover:underline ml-1">
                Contact your administrator
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ClientLoginPage;
