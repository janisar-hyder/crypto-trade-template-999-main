import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gem,
  Coins,
  BarChart2,
  Clock,
  ChevronRight
} from "lucide-react";

const Investments = () => {
  const investments = [
    {
      id: 1,
      name: "Gold Growth Plan",
      roi: "5% Monthly",
      duration: "6 Months",
      status: "Active",
      amount: "$5,000",
      startDate: "15 Jun 2023",
      maturityDate: "15 Dec 2023"
    },
    {
      id: 2,
      name: "Premium Gold Plan",
      roi: "7% Monthly",
      duration: "12 Months",
      status: "Active",
      amount: "$10,000",
      startDate: "01 Aug 2023",
      maturityDate: "01 Aug 2024"
    },
    {
      id: 3,
      name: "Starter Gold Plan",
      roi: "3% Monthly",
      duration: "3 Months",
      status: "Completed",
      amount: "$1,000",
      startDate: "01 May 2023",
      maturityDate: "01 Aug 2023"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Completed": return "bg-blue-500";
      case "Paused": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Gold Investments</h1>
          <p className="text-muted-foreground">Your active and completed gold investment plans</p>
        </div>
        {/* <Button className="button-gradient">
          <Coins className="w-5 h-5 mr-2" />
          New Investment
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <Card key={investment.id} className="border-border hover:border-primary/50 transition-colors h-full">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Gem className="w-6 h-6 text-amber-500" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{investment.name}</CardTitle>
                  </div>
                  <Badge className={`text-white ${getStatusColor(investment.status)}`}>
                    {investment.status}
                  </Badge>
                </div>
                
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart2 className="w-4 h-4" />
                    ROI
                  </p>
                  <p className="text-lg font-semibold text-primary">{investment.roi}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Duration
                  </p>
                  <p className="text-lg font-semibold">{investment.duration}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-semibold">{investment.amount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="text-lg font-semibold">{investment.startDate}</p>
                </div>
              </div>
              
             
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Investments;