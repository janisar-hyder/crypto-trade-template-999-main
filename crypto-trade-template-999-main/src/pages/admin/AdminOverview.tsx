
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, CreditCard, DollarSign, Eye, MessageCircle, ArrowUpRight, TrendingDown } from "lucide-react";

const AdminOverview = () => {
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
    },
    {
      title: "Pending Withdrawals",
      value: "23",
      change: "+5",
      changeType: "neutral",
      icon: CreditCard,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      title: "Total Withdrawn",
      value: "$45,678",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const recentActivities = [
    { user: "John Doe", action: "Requested withdrawal", amount: "$500", time: "2 min ago", type: "withdrawal" },
    { user: "Alice Smith", action: "New investment", amount: "$1,200", time: "5 min ago", type: "investment" },
    { user: "Bob Wilson", action: "KYC submitted", amount: "", time: "10 min ago", type: "kyc" },
    { user: "Emma Davis", action: "Message sent", amount: "", time: "15 min ago", type: "message" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'withdrawal': return '💸';
      case 'investment': return '💰';
      case 'kyc': return '📋';
      case 'message': return '💬';
      default: return '📊';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'withdrawal': return 'text-red-400';
      case 'investment': return 'text-green-400';
      case 'kyc': return 'text-yellow-400';
      case 'message': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">👋</div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              GN, Admin Haider!
            </h1>
            <p className="text-gray-400">
              Here's what's happening with your platform today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`bg-black/40 backdrop-blur-xl border ${stat.borderColor} hover:bg-black/60 transition-all duration-300 group`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.borderColor} border`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="flex items-center gap-1">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-400">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div>
                      <p className="text-sm font-medium text-white">{activity.user}</p>
                      <p className={`text-xs ${getActivityColor(activity.type)}`}>{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="text-sm font-medium text-primary">{activity.amount}</p>
                    )}
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col space-y-3 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm rounded-xl">
                <Eye className="h-6 w-6 text-blue-400" />
                <span className="text-sm font-medium">View Users</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col space-y-3 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm rounded-xl">
                <CreditCard className="h-6 w-6 text-orange-400" />
                <span className="text-sm font-medium">Withdrawals</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col space-y-3 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm rounded-xl">
                <MessageCircle className="h-6 w-6 text-purple-400" />
                <span className="text-sm font-medium">Messages</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col space-y-3 bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm rounded-xl">
                <Users className="h-6 w-6 text-green-400" />
                <span className="text-sm font-medium">User Stats</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
