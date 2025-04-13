
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

// Admin Pages
import Index from "./pages/Index";
import LicensesPage from "./pages/LicensesPage";
import ClientsPage from "./pages/ClientsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReportsPage from "./pages/ReportsPage";
import DocumentsPage from "./pages/DocumentsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

// Client Pages
import ClientLogin from "./pages/client/Login";
import ClientRegister from "./pages/client/Register";
import ClientDashboard from "./pages/client/Dashboard";
import ClientLicenses from "./pages/client/Licenses";
import ClientLicenseDetails from "./pages/client/LicenseDetails";
import ClientProfile from "./pages/client/Profile";
import ClientLayout from "./components/client/ClientLayout";
import ClientHelp from "./pages/client/Help";
import ClientSettings from "./pages/client/Settings";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/client/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
            
            {/* Client Public Routes */}
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/register" element={<ClientRegister />} />
            
            {/* Client Protected Routes */}
            <Route path="/client" element={
              <ProtectedRoute>
                <ClientLayout><ClientDashboard /></ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/licenses" element={
              <ProtectedRoute>
                <ClientLayout><ClientLicenses /></ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/licenses/:id" element={
              <ProtectedRoute>
                <ClientLayout><ClientLicenseDetails /></ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/profile" element={
              <ProtectedRoute>
                <ClientLayout><ClientProfile /></ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/help" element={
              <ProtectedRoute>
                <ClientLayout><ClientHelp /></ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/settings" element={
              <ProtectedRoute>
                <ClientLayout><ClientSettings /></ClientLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
