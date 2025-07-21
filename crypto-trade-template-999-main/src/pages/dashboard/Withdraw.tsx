import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  Wallet, 
  ArrowDownToLine, 
  CheckCircle,
  AlertCircle,
  CreditCard,
  BadgeInfo,
  Banknote, CircleDollarSign,
  Bitcoin
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Withdraw = () => {
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const availableBalance = 200.00;
  const minimumWithdraw = 10.00;

  const withdrawalStats = [
    {
      title: "Available Balance",
      amount: `${availableBalance} USDT`,
      icon: Wallet,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount < minimumWithdraw) {
      toast({
        title: "Invalid Amount",
        description: `Minimum withdrawal amount is ${minimumWithdraw} USDT`,
        variant: "destructive",
      });
      return;
    }
    if (amount > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }
    if (!selectedMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a withdrawal method",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal Submitted",
      description: "Your withdrawal request has been submitted for processing",
    });
    setWithdrawAmount("");
    setSelectedMethod("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Withdraw Funds</h1>
          <p className="text-muted-foreground mt-2">
            Transfer your earnings to your preferred payment method
          </p>
        </div>
      </div>

      {/* Withdrawal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {withdrawalStats.map((stat, index) => (
          <Card 
            key={index} 
            className={`bg-card/50 backdrop-blur-sm border ${stat.borderColor} hover:border-primary/50 transition-all duration-300`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.borderColor} border`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.amount}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ArrowDownToLine className="h-5 w-5 text-primary" />
            Withdrawal Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BadgeInfo className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-blue-400">Important Information</h3>
            </div>
            <ul className="text-sm text-blue-400 space-y-1">
              <li>• Minimum withdrawal amount: {minimumWithdraw} USDT</li>
              <li>• Processing fee: 2.5% of withdrawal amount</li>
              <li>• Processing time: 24-48 hours</li>
              <li>• KYC verification required for withdrawals over 100 USDT</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
  <Label htmlFor="amount">Withdrawal Amount (USDT)</Label>
  <Input
    id="amount"
    type="number"
    placeholder="Enter amount"
    value={withdrawAmount}
    onChange={(e) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value >= 0 && value <= availableBalance) {
        setWithdrawAmount(value);
      } else if (e.target.value === "") {
        setWithdrawAmount("");
      }
    }}
    className="bg-background/90 hover:bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
    min="0"
    max={availableBalance}
  />
  <p className="text-sm text-muted-foreground mt-1">
    Available: {availableBalance} USDT
  </p>
</div>


              <div>
  <Label htmlFor="method">Withdrawal Method</Label>
  <Select value={selectedMethod} onValueChange={setSelectedMethod}>
    <SelectTrigger className="bg-background/90 hover:bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99">
      <SelectValue placeholder="Select payment method" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="usdt-trc20">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-4 w-4 text-green-500" /> USDT (TRC20)
        </div>
      </SelectItem>
      <SelectItem value="usdt-erc20">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-4 w-4 text-blue-500" /> USDT (ERC20)
        </div>
      </SelectItem>
      <SelectItem value="bitcoin">
        <div className="flex items-center gap-2">
          <Bitcoin className="h-4 w-4 text-yellow-500" /> Bitcoin
        </div>
      </SelectItem>
      <SelectItem value="ethereum">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-purple-500" /> Ethereum
        </div>
      </SelectItem>
      <SelectItem value="bank-transfer">
        <div className="flex items-center gap-2">
          <Banknote className="h-4 w-4 text-gray-600" /> Bank Transfer
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</div>

              <div>
                <Label htmlFor="address">Wallet Address / Account Details</Label>
                <Input
                  id="address"
                  placeholder="Enter wallet address or account details"
                  className="bg-background/90 hover:bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  Withdrawal Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Withdrawal Amount:</span>
                    <span className="font-medium">{withdrawAmount || "0.00"} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee (2.5%):</span>
                    <span className="font-medium">
                      {withdrawAmount ? (parseFloat(withdrawAmount) * 0.025).toFixed(2) : "0.00"} USDT
                    </span>
                  </div>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between font-semibold">
                    <span>You'll Receive:</span>
                    <span className="text-emerald-400">
                      {withdrawAmount ? (parseFloat(withdrawAmount) * 0.975).toFixed(2) : "0.00"} USDT
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleWithdraw} 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                size="lg"
              >
                Request Withdrawal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdraw;