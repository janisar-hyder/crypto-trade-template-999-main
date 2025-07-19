
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Clock, 
  Plus,
  Eye,
  Pause,
  Play
} from "lucide-react";

const Investments = () => {
  const investments = [
    {
      id: 1,
      name: "Bitcoin Pro Plan",
      amount: "500 USDT",
      roi: "25%",
      duration: "30 days",
      dailyReward: "4.17 USDT",
      progress: 67,
      status: "Active",
      daysLeft: 10,
      totalEarned: "83.33 USDT"
    },
    {
      id: 2,
      name: "Ethereum Elite",
      amount: "1000 USDT",
      roi: "30%",
      duration: "45 days",
      dailyReward: "6.67 USDT",
      progress: 89,
      status: "Active",
      daysLeft: 5,
      totalEarned: "266.67 USDT"
    },
    {
      id: 3,
      name: "Altcoin Starter",
      amount: "200 USDT",
      roi: "20%",
      duration: "20 days",
      dailyReward: "2.00 USDT",
      progress: 100,
      status: "Completed",
      daysLeft: 0,
      totalEarned: "40.00 USDT"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Completed": return "bg-blue-500";
      case "Paused": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Investments</h1>
          <p className="text-muted-foreground">Track and manage your investment plans</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Investment
        </Button>
      </div>

      {/* Investment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-lg font-bold">1,700 USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-lg font-bold">390 USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-lg font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg ROI</p>
                <p className="text-lg font-bold">25%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <Card key={investment.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{investment.name}</CardTitle>
                <Badge variant="secondary" className={`text-white ${getStatusColor(investment.status)}`}>
                  {investment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-semibold">{investment.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ROI</p>
                  <p className="font-semibold text-green-500">{investment.roi}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">{investment.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Daily Reward</p>
                  <p className="font-semibold">{investment.dailyReward}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{investment.progress}%</span>
                </div>
                <Progress value={investment.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total Earned: {investment.totalEarned}</span>
                  <span>{investment.daysLeft > 0 ? `${investment.daysLeft} days left` : 'Completed'}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {investment.status === "Active" && (
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Investments;
