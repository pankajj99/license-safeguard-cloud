
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Key, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ClientRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password || !confirmPassword || !companyName || !contactName) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill all required fields",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Passwords do not match",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Register the user
      await signUp(email, password, {
        company_name: companyName,
        contact_name: contactName,
        phone: phone
      });
      
      // We'll redirect to login since they need to verify email
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account before logging in",
      });
      
      navigate('/client/login');
    } catch (error) {
      // Error is already handled in the signUp function
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-clms-blue flex items-center justify-center text-white">
              <Key size={24} />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">CLMS Client Portal</h1>
          <p className="mt-2 text-gray-600">Create your account to manage licenses</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create a new account to access the client portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  type="text" 
                  placeholder="Acme Corporation" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input 
                  id="contactName" 
                  type="text" 
                  placeholder="John Smith" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (123) 456-7890" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-clms-lightBlue hover:bg-clms-blue"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/client/login" className="text-clms-lightBlue hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ClientRegister;
