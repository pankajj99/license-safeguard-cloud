
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeBarProps {
  userName: string;
  companyName: string;
}

const WelcomeBar = ({ userName, companyName }: WelcomeBarProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome back, {userName}!</h2>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your {companyName} licenses today
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href="https://docs.example.com/licenses" target="_blank" rel="noopener noreferrer">
              <Info size={16} />
              <span>License Documentation</span>
              <ExternalLink size={14} />
            </a>
          </Button>
          <Button className="flex items-center gap-1" asChild>
            <Link to="/client/licenses">
              <span>View All Licenses</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBar;
