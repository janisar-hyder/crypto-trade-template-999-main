
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  ArrowDownToLine, 
  Clock, 
  CheckCircle, 
  XCircle,
  DollarSign,
  AlertCircle,
  CreditCard
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
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Total Withdrawn",
      amount: "1,250.00 USDT",
      icon: ArrowDownToLine,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Pending Withdrawals",
      amount: "0.00 USDT",
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "Processing Fee",
      amount: "2.5%",
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const withdrawalHistory = [
    { date: "2024-01-15", amount: "150.00 USDT", method: "USDT (TRC20)", status: "Completed", fee: "3.75 USDT" },
    { date: "2024-01-10", amount: "100.00 USDT", method: "Bitcoin", status: "Completed", fee: "2.50 USDT" },
    { date: "2024-01-08", amount: "75.00 USDT", method: "USDT (TRC20)", status: "Completed", fee: "1.88 USDT" },
    { date: "2024-01-05", amount: "200.00 USDT", method: "Ethereum", status: "Completed", fee: "5.00 USDT" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "Rejected": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Withdraw</h1>
          <p className="text-muted-foreground">Request withdrawals from your available balance</p>
        </div>
      </div>

      {/* Withdrawal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {withdrawalStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.amount}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="withdraw" className="space-y-4">
        <TabsList>
          <TabsTrigger value="withdraw">Make Withdrawal</TabsTrigger>
          <TabsTrigger value="history">Withdrawal History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownToLine className="h-5 w-5" />
                Request Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300">Important Information</h3>
                </div>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
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
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Available: {availableBalance} USDT
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="method">Withdrawal Method</Label>
                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usdt-trc20">USDT (TRC20)</SelectItem>
                        <SelectItem value="usdt-erc20">USDT (ERC20)</SelectItem>
                        <SelectItem value="bitcoin">Bitcoin</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Wallet Address / Account Details</Label>
                    <Input
                      id="address"
                      placeholder="Enter wallet address or account details"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Withdrawal Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Withdrawal Amount:</span>
                        <span>{withdrawAmount || "0.00"} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Fee (2.5%):</span>
                        <span>{withdrawAmount ? (parseFloat(withdrawAmount) * 0.025).toFixed(2) : "0.00"} USDT</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>You'll Receive:</span>
                        <span className="text-green-500">
                          {withdrawAmount ? (parseFloat(withdrawAmount) * 0.975).toFixed(2) : "0.00"} USDT
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleWithdraw} className="w-full" size="lg">
                    Request Withdrawal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {withdrawalHistory.map((withdrawal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        {getStatusIcon(withdrawal.status)}
                      </div>
                      <div>
                        <p className="font-medium">{withdrawal.amount}</p>
                        <p className="text-sm text-muted-foreground">{withdrawal.method}</p>
                        <p className="text-xs text-muted-foreground">{withdrawal.date}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="secondary" className={getStatusColor(withdrawal.status)}>
                        {withdrawal.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">Fee: {withdrawal.fee}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">USDT (TRC20)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Fast and low-cost withdrawals on TRON network
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• Processing time: 10-30 minutes</p>
                    <p>• Network fee: ~1 USDT</p>
                    <p>• Minimum: 10 USDT</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Bitcoin</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Secure withdrawals to Bitcoin wallets
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• Processing time: 30-60 minutes</p>
                    <p>• Network fee: Variable</p>
                    <p>• Minimum: 0.001 BTC</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Ethereum</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Withdrawals to Ethereum wallets
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• Processing time: 15-30 minutes</p>
                    <p>• Network fee: Variable</p>
                    <p>• Minimum: 0.01 ETH</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Direct bank transfers (KYC required)
                  </p>
                  <div className="text-xs space-y-1">
                    <p>• Processing time: 1-3 business days</p>
                    <p>• Bank fee: Variable</p>
                    <p>• Minimum: 50 USD</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Withdraw;
