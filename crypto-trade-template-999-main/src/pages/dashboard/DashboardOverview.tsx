
import DashboardCards from "@/components/dashboard/DashboardCards";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import PromotionalBanner from "@/components/dashboard/PromotionalBanner";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">👋</div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              GN, Janisar Haider!
            </h1>
            <p className="text-gray-400">
              Here's what's happening with your investments today.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Dashboard Cards */}
      <DashboardCards />
      
      {/* Charts and Promotional Banner */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <DashboardCharts />
          <RecentActivity />
        </div>
        <div className="xl:col-span-1">
          <PromotionalBanner />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
