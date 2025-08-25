
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Index from "./pages/Index";
import { initializeSampleData } from "./services/sampleData";
import { initializeExpenseCategories } from "./services/expenseService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize sample data when app starts
    const initializeData = async () => {
      try {
        await initializeSampleData();
        await initializeExpenseCategories();
        console.log('Sample data initialized successfully');
      } catch (error) {
        console.error('Error initializing sample data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
