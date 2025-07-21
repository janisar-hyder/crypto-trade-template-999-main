
import React from 'react';
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import Investments from "./pages/dashboard/Investments";
// import Rewards from "./pages/dashboard/Rewards";
import Referrals from "./pages/dashboard/Referrals";
import Withdraw from "./pages/dashboard/Withdraw";
import Settings from "./pages/dashboard/Settings";
import Chat from "./pages/dashboard/Chat";
import KYCVerification from "./pages/dashboard/KYCVerification";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminChat from "./pages/admin/AdminChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardOverview />} />
              <Route path="investments" element={<Investments />} />
              {/* <Route path="rewards" element={<Rewards />} /> */}
              <Route path="referrals" element={<Referrals />} />
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="kyc" element={<KYCVerification />} />
              <Route path="chat" element={<Chat />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="withdrawals" element={<AdminWithdrawals />} />
              <Route path="chat" element={<AdminChat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
