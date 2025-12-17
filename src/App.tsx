import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Landing from "./pages/Landing";
import OverviewPage from "./features/overview/page";
import RoutesPage from "./features/routes/page";
import Fleet from "./features/fleet/page";
import Orders from "./features/orders/page";
import Analytics from "./features/analytics/page";
import DriversPage from "./features/drivers/page";
import TrackingPage from "./features/tracking/page";
import NotificationsPage from "./features/notifications/page";
import SettingsPage from "./features/settings/page";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<OverviewPage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
