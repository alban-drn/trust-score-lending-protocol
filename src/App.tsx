
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Markets from "./pages/Markets";
import Schema from "./pages/Schema";
import CreditScoring from "./pages/CreditScoring";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider collapsedWidth={64} defaultCollapsed={false}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/schema" element={<Schema />} />
            <Route path="/credit-scoring" element={<CreditScoring />} />
            
            {/* These routes would be implemented in future iterations */}
            <Route path="/borrow" element={<NotFound />} />
            <Route path="/supply" element={<NotFound />} />
            <Route path="/repay" element={<NotFound />} />
            <Route path="/kyc" element={<NotFound />} />
            <Route path="/risk-analysis" element={<NotFound />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
