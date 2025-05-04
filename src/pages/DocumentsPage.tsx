
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Search, Upload, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const documents = [
  {
    id: 1,
    name: 'License Agreement Template.docx',
    type: 'License',
    category: 'Templates',
    lastModified: 'May 15, 2023',
    size: '245 KB',
  },
  {
    id: 2,
    name: 'Client Onboarding Guide.pdf',
    type: 'Guide',
    category: 'Documentation',
    lastModified: 'Jun 22, 2023',
    size: '1.2 MB',
  },
  {
    id: 3,
    name: 'License Compliance Policy.pdf',
    type: 'Policy',
    category: 'Legal',
    lastModified: 'Apr 10, 2023',
    size: '780 KB',
  },
  {
    id: 4,
    name: 'Enterprise License Agreement.docx',
    type: 'License',
    category: 'Templates',
    lastModified: 'Jul 03, 2023',
    size: '310 KB',
  },
  {
    id: 5,
    name: 'Software Installation Guide.pdf',
    type: 'Guide',
    category: 'Documentation',
    lastModified: 'May 28, 2023',
    size: '2.4 MB',
  },
  {
    id: 6,
    name: 'License Audit Report - Q2 2023.xlsx',
    type: 'Report',
    category: 'Reports',
    lastModified: 'Jul 15, 2023',
    size: '875 KB',
  },
  {
    id: 7,
    name: 'Data Protection Agreement.pdf',
    type: 'Policy',
    category: 'Legal',
    lastModified: 'Mar 05, 2023',
    size: '1.5 MB',
  },
];

const DocumentsPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500 mt-1">Manage your license agreements, templates and other documents</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search documents..." 
                className="pl-10 bg-white" 
              />
            </div>
            <div className="flex gap-3">
              <Button className="gap-2">
                <Upload size={16} />
                Upload
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer font-medium text-clms-blue">
                All Documents
              </div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                Templates
              </div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                Legal
              </div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                Documentation
              </div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                Reports
              </div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                Archived
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>File Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-blue-500" />
                  <span>PDF</span>
                </div>
                <Badge variant="outline">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-green-500" />
                  <span>Excel</span>
                </div>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-blue-700" />
                  <span>Word</span>
                </div>
                <Badge variant="outline">15</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-red-500" />
                  <span>PowerPoint</span>
                </div>
                <Badge variant="outline">3</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Documents</CardTitle>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Modified</TableHead>
                    <TableHead className="hidden md:table-cell">Size</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-500" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {doc.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{doc.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.lastModified}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
