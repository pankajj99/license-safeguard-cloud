
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LicensesPage from "./pages/LicensesPage";
import ClientsPage from "./pages/ClientsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReportsPage from "./pages/ReportsPage";
import DocumentsPage from "./pages/DocumentsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import ClientLogin from "./pages/client/Login";
import ClientRegister from "./pages/client/Register";
import ClientDashboard from "./pages/client/Dashboard";
import ClientLicenses from "./pages/client/Licenses";
import ClientLicenseDetails from "./pages/client/LicenseDetails";
import ClientProfile from "./pages/client/Profile";
import ClientLayout from "./components/client/ClientLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/licenses" element={<LicensesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Client Routes */}
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/register" element={<ClientRegister />} />
          <Route path="/client" element={<ClientLayout><ClientDashboard /></ClientLayout>} />
          <Route path="/client/licenses" element={<ClientLayout><ClientLicenses /></ClientLayout>} />
          <Route path="/client/licenses/:id" element={<ClientLayout><ClientLicenseDetails /></ClientLayout>} />
          <Route path="/client/profile" element={<ClientLayout><ClientProfile /></ClientLayout>} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
