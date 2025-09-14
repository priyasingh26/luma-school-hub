import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/use-auth";
import { UserProfileForm } from "@/components/user/UserProfileForm";

// Pages
import Index from "./pages/Index";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

// Auth context
export const AuthContext = React.createContext<any>(null);

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthContext.Provider value={{ user }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />

              {/* Private Routes */}
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Index />} />
                <Route path="/students" element={<Students />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<UserProfileForm />} />
              </Route>
            </Routes>
          </AuthContext.Provider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
