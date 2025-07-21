import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, CreditCard, Eye, MessageCircle, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminOverview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Active Investments",
      value: "$234,567",
      change: "+8%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    }
  ];

  const quickActions = [
    {
      title: "View Users",
      icon: Eye,
      color: "text-blue-400",
      path: "/admin/users"
    },
    {
      title: "Withdrawals",
      icon: CreditCard,
      color: "text-orange-400",
      path: "/admin/withdrawals"
    },
    {
      title: "Messages",
      icon: MessageCircle,
      color: "text-purple-400",
      path: "/admin/chat"
    }
  ];

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">👋</div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              Overview of your platform's performance
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Only 2 cards as requested */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`bg-black/40 backdrop-blur-xl border ${stat.borderColor} hover:bg-black/60 transition-all duration-300 group`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.borderColor} border`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-400">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions - Simplified to 3 buttons for better alignment */}
      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="h-24 flex flex-col space-y-3 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm rounded-xl"
                onClick={() => handleQuickAction(action.path)}
              >
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;