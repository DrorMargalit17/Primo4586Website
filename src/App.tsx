import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminModeProvider } from "@/hooks/useAdminMode";
import Layout from "./components/Layout";
import { AdminModeToggle } from "@/components/admin/AdminModeToggle";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Robot from "./pages/Robot";
import Robot2026 from "./pages/Robot2026";
import Robot2024 from "./pages/Robot2024";
import Community from "./pages/Community";
import FLLMentorship from "./pages/FLLMentorship";
import Resources from "./pages/Resources";
import Sponsors from "./pages/Sponsors";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import BootstrapAdmin from "./pages/BootstrapAdmin";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/robot2026" element={<Robot2026 />} />
                <Route path="/robot" element={<Robot />} />
                <Route path="/robot2024" element={<Robot2024 />} />
                <Route path="/community" element={<Community />} />
                <Route path="/fll-mentorship" element={<FLLMentorship />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/bootstrap-admin" element={<BootstrapAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <AdminModeToggle />
          </BrowserRouter>
        </TooltipProvider>
      </AdminModeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
