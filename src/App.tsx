import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Regolamento from "./pages/Regolamento";
import Guide from "./pages/Guide";
import GuideDetail from "./pages/GuideDetail";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminRegolamento from "./pages/AdminRegolamento";
import AdminGuide from "./pages/AdminGuide";
import AdminGuideEdit from "./pages/AdminGuideEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/regolamento" element={<Regolamento />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/:slug" element={<GuideDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="regolamento" element={<AdminRegolamento />} />
              <Route path="guide" element={<AdminGuide />} />
              <Route path="guide/:id" element={<AdminGuideEdit />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
