
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Download, 
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  Key,
  Calendar
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock data for audit logs
const auditLogs = [
  {
    id: 'log-001',
    timestamp: '2024-04-29 09:23:15',
    user: 'admin@clms.com',
    action: 'License Created',
    details: 'Created new license L-3892 for Acme Corporation',
    entity: 'license',
    entityId: 'L-3892',
    severity: 'info',
  },
  {
    id: 'log-002',
    timestamp: '2024-04-29 09:15:22',
    user: 'admin@clms.com',
    action: 'User Login',
    details: 'Successful login from 192.168.1.105',
    entity: 'auth',
    entityId: '',
    severity: 'info',
  },
  {
    id: 'log-003',
    timestamp: '2024-04-28 16:42:10',
    user: 'sarah@techglobal.com',
    action: 'License Updated',
    details: 'Added 25 seats to license L-3890',
    entity: 'license',
    entityId: 'L-3890',
    severity: 'info',
  },
  {
    id: 'log-004',
    timestamp: '2024-04-28 14:18:35',
    user: 'system',
    action: 'License Expired',
    details: 'License L-3889 expired for Global Systems Ltd',
    entity: 'license',
    entityId: 'L-3889',
    severity: 'warning',
  },
  {
    id: 'log-005',
    timestamp: '2024-04-28 11:05:42',
    user: 'admin@clms.com',
    action: 'Client Created',
    details: 'Created new client Future Tech with ID C-1005',
    entity: 'client',
    entityId: 'C-1005',
    severity: 'info',
  },
  {
    id: 'log-006',
    timestamp: '2024-04-27 17:22:19',
    user: 'john@acme.com',
    action: 'Failed Login',
    details: 'Failed login attempt from 203.0.113.42',
    entity: 'auth',
    entityId: '',
    severity: 'error',
  },
  {
    id: 'log-007',
    timestamp: '2024-04-27 16:54:03',
    user: 'admin@clms.com',
    action: 'License Revoked',
    details: 'Revoked license L-3886 for Omega Innovations',
    entity: 'license',
    entityId: 'L-3886',
    severity: 'warning',
  },
  {
    id: 'log-008',
    timestamp: '2024-04-27 15:10:27',
    user: 'system',
    action: 'Backup Completed',
    details: 'System backup completed successfully',
    entity: 'system',
    entityId: '',
    severity: 'success',
  },
  {
    id: 'log-009',
    timestamp: '2024-04-27 09:34:51',
    user: 'admin@clms.com',
    action: 'Settings Updated',
    details: 'Updated notification settings for license renewals',
    entity: 'settings',
    entityId: '',
    severity: 'info',
  },
  {
    id: 'log-010',
    timestamp: '2024-04-26 14:45:32',
    user: 'sarah@techglobal.com',
    action: 'Client Updated',
    details: 'Updated contact information for client TechGlobal Inc',
    entity: 'client',
    entityId: 'C-1002',
    severity: 'info',
  },
];

const AuditLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  
  // Filter logs based on filters and search query
  const filteredLogs = auditLogs.filter(log => {
    const matchesEntity = entityFilter === 'all' || log.entity === entityFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesEntity && matchesSeverity && matchesSearch;
  });
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 mt-1">Track and monitor system activity and user actions</p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Events</p>
                  <h4 className="text-xl font-bold">1,284</h4>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Past 30 days</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User Actions</p>
                  <h4 className="text-xl font-bold">863</h4>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Past 30 days</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Warnings</p>
                  <h4 className="text-xl font-bold">42</h4>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Past 30 days</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Errors</p>
                  <h4 className="text-xl font-bold">17</h4>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Past 30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle>System Logs</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Select Range</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download size={16} />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="license">Licenses</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px]">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="text-sm text-gray-600">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{log.details}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {log.entity === 'license' && <Key size={14} />}
                      {log.entity === 'client' && <User size={14} />}
                      {log.entity === 'auth' && <Shield size={14} />}
                      {log.entity === 'system' && <Settings size={14} />}
                      {log.entity === 'settings' && <Settings size={14} />}
                      <span>{log.entityId ? log.entityId : log.entity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`
                        ${log.severity === 'info' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        ${log.severity === 'success' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${log.severity === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                        ${log.severity === 'error' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      `}
                    >
                      {log.severity === 'info' && <Info size={14} className="mr-1" />}
                      {log.severity === 'success' && <CheckCircle size={14} className="mr-1" />}
                      {log.severity === 'warning' && <AlertTriangle size={14} className="mr-1" />}
                      {log.severity === 'error' && <AlertTriangle size={14} className="mr-1" />}
                      {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No logs found matching your filters</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setEntityFilter('all');
                  setSeverityFilter('all');
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {filteredLogs.length} of {auditLogs.length} logs</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AuditLogsPage;
