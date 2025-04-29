
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  FilePen, 
  Copy, 
  Trash2, 
  ClipboardCheck,
  Settings
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const templateCategories = [
  { id: 'enterprise', name: 'Enterprise', count: 5 },
  { id: 'smb', name: 'SMB', count: 3 },
  { id: 'trial', name: 'Trial', count: 2 },
  { id: 'custom', name: 'Custom', count: 4 },
];

const templates = [
  {
    id: 'template-1',
    name: 'Enterprise Standard',
    description: 'Standard enterprise license template with full feature access',
    category: 'enterprise',
    features: ['All modules', 'Unlimited users', 'API access', 'Premium support'],
    createdAt: '2023-10-15',
    isDefault: true,
  },
  {
    id: 'template-2',
    name: 'Enterprise Advanced',
    description: 'Advanced enterprise license with additional security features',
    category: 'enterprise',
    features: ['All modules', 'Unlimited users', 'API access', 'Premium support', 'Enhanced security'],
    createdAt: '2023-11-02',
    isDefault: false,
  },
  {
    id: 'template-3',
    name: 'SMB Basic',
    description: 'Basic license for small and medium businesses',
    category: 'smb',
    features: ['Core modules', 'Up to 50 users', 'Standard support'],
    createdAt: '2023-12-10',
    isDefault: true,
  },
  {
    id: 'template-4',
    name: 'Trial 30-Day',
    description: '30-day evaluation license with full feature access',
    category: 'trial',
    features: ['All modules', 'Up to 10 users', 'Basic support', 'Time-limited'],
    createdAt: '2024-01-05',
    isDefault: true,
  },
  {
    id: 'template-5',
    name: 'Custom Healthcare',
    description: 'Specialized license template for healthcare organizations',
    category: 'custom',
    features: ['Core modules', 'HIPAA compliance', 'Data encryption', 'Audit logs', 'Custom reporting'],
    createdAt: '2024-02-18',
    isDefault: false,
  },
];

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false);
  
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">License Templates</h1>
        <p className="text-gray-500 mt-1">Manage and customize license templates for client provisioning</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle>License Templates</CardTitle>
              <CardDescription>Create and manage templates for license provisioning</CardDescription>
            </div>
            <Button 
              className="bg-clms-lightBlue hover:bg-clms-blue flex items-center gap-1" 
              onClick={() => setShowNewTemplateDialog(true)}
            >
              <Plus size={16} />
              <span>New Template</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === 'all' 
                        ? 'bg-clms-lightBlue bg-opacity-10 text-clms-blue font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory('all')}
                  >
                    All Templates
                    <span className="ml-2 text-xs text-gray-500">{templates.length}</span>
                  </button>
                  
                  {templateCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === category.id 
                          ? 'bg-clms-lightBlue bg-opacity-10 text-clms-blue font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                      <span className="ml-2 text-xs text-gray-500">{category.count}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Template Settings</h3>
                  <Button variant="outline" size="sm" className="w-full justify-start text-sm" onClick={() => {}}>
                    <Settings size={14} className="mr-2" />
                    Configure Fields
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search templates..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <div 
                      key={template.id} 
                      className="border rounded-lg p-4 hover:border-gray-300 transition-colors group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{template.name}</h3>
                            {template.isDefault && (
                              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FilePen size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {template.features.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Created on {template.createdAt}
                        </span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No templates found</p>
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => setShowNewTemplateDialog(true)}
                    >
                      Create new template
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showNewTemplateDialog} onOpenChange={setShowNewTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New License Template</DialogTitle>
            <DialogDescription>
              Define a new license template that can be assigned to clients
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Name</label>
              <Input className="col-span-3" placeholder="Template name" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Category</label>
              <div className="col-span-3">
                <select className="w-full border border-gray-300 rounded-md h-10 px-3">
                  <option value="">Select a category</option>
                  {templateCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Description</label>
              <textarea 
                className="col-span-3 w-full border border-gray-300 rounded-md p-3" 
                rows={3}
                placeholder="Template description"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm">Default</label>
              <div className="col-span-3 flex items-center">
                <Switch id="default-template" />
                <label htmlFor="default-template" className="ml-2 text-sm">
                  Set as default template for this category
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4 mt-2">
              <label className="text-right font-medium text-sm pt-2">Features</label>
              <div className="col-span-3 space-y-3">
                <div className="flex items-center gap-2">
                  <Input placeholder="Add feature" className="flex-1" />
                  <Button variant="secondary" size="sm" className="shrink-0">
                    <Plus size={16} className="mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2 pt-2">
                  {['All modules', 'API access', 'Premium support'].map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <span className="text-sm">{feature}</span>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTemplateDialog(false)}>Cancel</Button>
            <Button className="bg-clms-lightBlue hover:bg-clms-blue">
              <ClipboardCheck size={16} className="mr-2" />
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TemplatesPage;
