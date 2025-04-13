
import React from 'react';
import ClientLayout from '@/components/client/ClientLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Book, HelpCircle, Phone } from 'lucide-react';

const HelpPage = () => {
  return (
    <ClientLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-500 mt-1">Find answers and get support</p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about licenses and the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I renew my license?</AccordionTrigger>
                  <AccordionContent>
                    You can renew your license by navigating to the Licenses page, finding the license you want to renew, and clicking the "Renew" button. Follow the prompts to complete the renewal process. Alternatively, you can contact our support team for assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I add more seats to my license?</AccordionTrigger>
                  <AccordionContent>
                    To add more seats to your license, go to your Licenses page, select the license you want to modify, and click on "Manage Seats". From there, you can increase the number of seats and complete the purchase process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What happens when my license expires?</AccordionTrigger>
                  <AccordionContent>
                    When your license expires, you will no longer have access to the software or services covered by that license. You will receive notifications before the expiration date so you can renew in time. If your license has already expired, you can still renew it from the Licenses page.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I download my license certificate?</AccordionTrigger>
                  <AccordionContent>
                    You can download your license certificate by going to the specific license details page and clicking on "Download Certificate" button. This PDF document contains all the important information about your license, including the license key, expiration date, and terms of use.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I transfer my license to another organization?</AccordionTrigger>
                  <AccordionContent>
                    License transfers are handled on a case-by-case basis. Please contact our support team with your license details and the information about the receiving organization. Our team will guide you through the transfer process.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Getting Started Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Learn the basics of managing your licenses and navigating the portal.</p>
                <Button variant="outline" className="w-full gap-2">
                  <Book size={16} />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">License Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Everything you need to know about managing, renewing, and upgrading licenses.</p>
                <Button variant="outline" className="w-full gap-2">
                  <Book size={16} />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">How to manage users, assign licenses, and control access.</p>
                <Button variant="outline" className="w-full gap-2">
                  <Book size={16} />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Troubleshooting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Solutions to common problems and error messages.</p>
                <Button variant="outline" className="w-full gap-2">
                  <Book size={16} />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Billing & Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Understanding your invoices, payment methods, and subscription details.</p>
                <Button variant="outline" className="w-full gap-2">
                  <Book size={16} />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">API Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Technical documentation for integrating with our license management API.</p>
                <Button variant="outline" className="w-full gap-2">
                  <FileText size={16} />
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>We're here to help with any questions or issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Chat Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Connect with our support team via live chat for immediate assistance.</p>
                    <Button className="w-full gap-2 bg-clms-lightBlue hover:bg-clms-blue">
                      <MessageCircle size={16} />
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Email Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                    <Button variant="outline" className="w-full gap-2">
                      <HelpCircle size={16} />
                      Email Support
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Phone Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Available Monday to Friday, 9am to 5pm EST.</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="outline" className="gap-2">
                        <Phone size={16} />
                        +1 (555) 123-4567
                      </Button>
                      <span className="text-sm text-gray-500">Priority support for enterprise customers</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ClientLayout>
  );
};

export default HelpPage;
