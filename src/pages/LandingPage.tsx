
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { KeyRound, Shield, Bell, BarChart, UserCheck, ArrowRight, Building } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <KeyRound className="text-clms-blue h-8 w-8" />
            <span className="font-bold text-xl text-clms-blue">License Safeguard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-clms-blue transition-colors">Features</a>
            <a href="#solutions" className="text-gray-600 hover:text-clms-blue transition-colors">Solutions</a>
            <a href="#testimonials" className="text-gray-600 hover:text-clms-blue transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-clms-blue transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Admin Login</Link>
            </Button>
            <Button className="bg-clms-lightBlue hover:bg-clms-blue" asChild>
              <Link to="/client-login">Client Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 bg-clms-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simplify Your License Management</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            A comprehensive platform for organizations to effectively manage software licenses, 
            ensure compliance, and optimize software spending.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-clms-blue hover:bg-gray-100" asChild>
              <Link to="/client-login">
                Access Client Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/login">
                Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful License Management Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage, track, and optimize your software licenses in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                <Shield className="text-clms-lightBlue h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">License Tracking</h3>
              <p className="text-gray-600">
                Centrally manage all your software licenses with detailed tracking and documentation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-green-100 rounded-full w-fit mb-4">
                <Bell className="text-clms-green h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Renewal Alerts</h3>
              <p className="text-gray-600">
                Never miss a renewal with automated notifications for expiring licenses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-yellow-100 rounded-full w-fit mb-4">
                <BarChart className="text-yellow-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Usage Analytics</h3>
              <p className="text-gray-600">
                Track license usage across your organization to optimize allocation and spending.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-purple-100 rounded-full w-fit mb-4">
                <UserCheck className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compliance Management</h3>
              <p className="text-gray-600">
                Ensure license compliance with auditing tools and detailed reporting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-red-100 rounded-full w-fit mb-4">
                <Building className="text-red-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vendor Management</h3>
              <p className="text-gray-600">
                Manage vendor relationships and contracts in one centralized system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-3 bg-teal-100 rounded-full w-fit mb-4">
                <ArrowRight className="text-teal-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Workflows</h3>
              <p className="text-gray-600">
                Create custom approval workflows for license requests and renewals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-clms-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your License Management?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get started with License Safeguard today and take control of your software assets.
          </p>
          <Button size="lg" className="bg-white text-clms-lightBlue hover:bg-gray-100" asChild>
            <Link to="/client-login">
              Access Client Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <KeyRound className="text-clms-blue h-6 w-6" />
                <span className="font-bold text-lg text-clms-blue">License Safeguard</span>
              </div>
              <p className="text-gray-600 mt-2">© 2023 License Safeguard. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-clms-blue">Features</a></li>
                  <li><a href="#" className="hover:text-clms-blue">Solutions</a></li>
                  <li><a href="#" className="hover:text-clms-blue">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-clms-blue">About Us</a></li>
                  <li><a href="#" className="hover:text-clms-blue">Careers</a></li>
                  <li><a href="#" className="hover:text-clms-blue">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-clms-blue">Blog</a></li>
                  <li><a href="#" className="hover:text-clms-blue">Documentation</a></li>
                  <li><a href="#" className="hover:text-clms-blue">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
