import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, Shield, ArrowRight, Gem } from "lucide-react";

const DashboardCards = () => {
  const cards = [
    {
      title: "ROI Balance",
      amount: "$408.79",
      subtitle: "See Your Profit Clearly",
      icon: TrendingUp,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      
    },
    {
      title: "Account Balance",
      amount: "$1,256.23",
      subtitle: "Available for withdrawal",
      icon: Wallet,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",

    },
    {
      title: "Active Plan",
      amount: "Gold Premium",
      subtitle: "7% Monthly ROI",
      icon: Gem,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",

    },
    {
      title: "KYC Status",
      amount: "Verified",
      subtitle: "Identity confirmed",
      icon: Shield,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      badge: "Verified",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className={`bg-card/50 backdrop-blur-sm border ${card.borderColor} hover:border-primary/50 transition-all duration-300 h-full flex flex-col`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-3 rounded-xl ${card.bgColor} ${card.borderColor} border`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <div className={`text-3xl font-bold ${card.color}`}>
                  {card.amount}
                </div>
                {card.badge && (
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    {card.badge}
                  </Badge>
                )}
              </div>
              
              {card.subtitle && (
                <p className="text-sm text-muted-foreground">
                  {card.subtitle}
                </p>
              )}
            </div>
            
            
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;