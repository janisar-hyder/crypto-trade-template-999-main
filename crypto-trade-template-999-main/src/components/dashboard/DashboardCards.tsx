
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Calendar,
  Wallet,
  Users,
  Shield,
  Info,
  ArrowRight
} from "lucide-react";

const DashboardCards = () => {
  const cards = [
    {
      title: "Season 1 Rewards",
      amount: "408.79",
      subtitle: "Points",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      tooltip: "Total ROI earned from all investments",
    },
    {
      title: "Today's Rewards",
      amount: "10.45",
      subtitle: "Points",
      icon: Calendar,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      tooltip: "ROI earned today",
    },
    {
      title: "Plan Status",
      amount: "2 Active",
      subtitle: "Next ROI: Tomorrow",
      icon: Wallet,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Withdrawal Balance",
      amount: "156.23 USDT",
      icon: Wallet,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      action: "Request Withdrawal",
    },
    {
      title: "Referral Bonus",
      amount: "25.50 USDT",
      subtitle: "5% bonus • 3 referrals",
      icon: Users,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      title: "KYC Status",
      amount: "Verified",
      icon: Shield,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      badge: "success",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className={`bg-black/40 backdrop-blur-xl border ${card.borderColor} hover:bg-black/60 transition-all duration-300 group relative overflow-hidden`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              {card.title}
              {card.tooltip && (
                <Info className="h-4 w-4 text-gray-400" />
              )}
            </CardTitle>
            <div className={`p-2 rounded-xl ${card.bgColor} ${card.borderColor} border`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`text-2xl font-bold ${card.color}`}>
                  {card.amount}
                </div>
                {card.badge && (
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    ✓ {card.amount}
                  </Badge>
                )}
              </div>
              
              {card.subtitle && (
                <p className="text-xs text-gray-400">
                  {card.subtitle}
                </p>
              )}
              
              {card.action && (
                <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-0">
                  {card.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
