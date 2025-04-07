
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LicensesPage from "./pages/LicensesPage";
import ClientsPage from "./pages/ClientsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ClientLoginPage from "./pages/ClientLoginPage";
import LandingPage from "./pages/LandingPage";

// Client pages
import ClientDashboard from "./pages/client/Dashboard";
import ClientLicenses from "./pages/client/Licenses";
import ClientLicenseDetails from "./pages/client/LicenseDetails";
import ClientProfile from "./pages/client/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Index />} />
          <Route path="/licenses" element={<LicensesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Client routes */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/licenses" element={<ClientLicenses />} />
          <Route path="/client/licenses/:id" element={<ClientLicenseDetails />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/client-login" element={<ClientLoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
