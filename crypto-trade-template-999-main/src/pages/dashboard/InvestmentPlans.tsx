import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gem,
  Coins,
  BarChart2,
  Clock,
  ChevronRight,
  Zap
} from "lucide-react";
import { useState } from "react";

const InvestmentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);

  const investmentPlans = [
    {
      id: 1,
      name: "Gold Growth Plan",
      roi: "5% Monthly",
      apy: "79.6%", // Annual Percentage Yield
      duration: "6 Months",
      minAmount: "$1,000",
      maxAmount: "$50,000",
      features: [
        "Monthly compounding",
        "Early withdrawal penalty: 2%",
        "Physical gold redemption option"
      ]
    },
    {
      id: 2,
      name: "Premium Gold Plan",
      roi: "7% Monthly",
      apy: "125.2%",
      duration: "12 Months",
      minAmount: "$5,000",
      maxAmount: "$100,000",
      features: [
        "Monthly compounding",
        "Priority customer support",
        "Free storage insurance",
        "Physical gold redemption option"
      ]
    },
    {
      id: 3,
      name: "Starter Gold Plan",
      roi: "3% Monthly",
      apy: "42.6%",
      duration: "3 Months",
      minAmount: "$500",
      maxAmount: "$10,000",
      features: [
        "Simple interest",
        "No withdrawal penalty",
        "Great for beginners"
      ]
    }
  ];

  const handlePurchaseClick = (planId: number) => {
    setSelectedPlan(planId);
    setShowPurchaseModal(true);
  };

  const handlePurchaseConfirm = () => {
    // Here you would typically send the data to your backend
    console.log(`Purchasing plan ${selectedPlan} with amount ${investmentAmount}`);
    // Reset form
    setShowPurchaseModal(false);
    setInvestmentAmount("");
    setSelectedPlan(null);
    // Show success message
    alert("Investment successfully purchased!");
  };

  const selectedPlanData = selectedPlan 
    ? investmentPlans.find(plan => plan.id === selectedPlan) 
    : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gold Investment Plans</h1>
          <p className="text-muted-foreground">Choose a plan that fits your financial goals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investmentPlans.map((plan) => (
          <Card key={plan.id} className="border-border hover:border-primary/50 transition-colors h-full flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Gem className="w-6 h-6 text-amber-500" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                  </div>
                  <Badge className="text-white bg-amber-600">
                    Popular
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart2 className="w-4 h-4" />
                    ROI
                  </p>
                  <p className="text-lg font-semibold text-primary">{plan.roi}</p>
                  <p className="text-xs text-muted-foreground">{plan.apy} APY</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Duration
                  </p>
                  <p className="text-lg font-semibold">{plan.duration}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm text-muted-foreground">Investment Range</p>
                  <p className="text-lg font-semibold">{plan.minAmount} - {plan.maxAmount}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">Features:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-amber-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button 
                className="w-full button-gradient"
                onClick={() => handlePurchaseClick(plan.id)}
              >
                <Coins className="w-5 h-5 mr-2" />
                Invest Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPlanData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Confirm Investment</h3>
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Gem className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold">{selectedPlanData.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedPlanData.roi} ROI</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder={`Enter amount between ${selectedPlanData.minAmount} - ${selectedPlanData.maxAmount}`}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum: {selectedPlanData.minAmount}, Maximum: {selectedPlanData.maxAmount}
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Projected Returns</h4>
                {investmentAmount && !isNaN(parseFloat(investmentAmount)) ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Principal:</span>
                      <span>${parseFloat(investmentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Returns:</span>
                      <span className="text-green-500">
                        ${(parseFloat(investmentAmount) * 0.05 * 6).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 mt-2">
                      <span>Total Value at Maturity:</span>
                      <span className="text-primary">
                        ${(parseFloat(investmentAmount) * 1.3).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Enter an amount to see projected returns
                  </p>
                )}
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-grow"
                  onClick={() => setShowPurchaseModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-grow button-gradient"
                  onClick={handlePurchaseConfirm}
                  disabled={!investmentAmount}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Confirm Investment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;