import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Check, X, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminWithdrawals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder-avatar.jpg"
      },
      amount: "$500",
      currency: "BTC",
      walletAddress: "bc1q9x2v8n3k4l5m6p7r8s9t0u1v2w3x4y5z6a7b8c9d0",
      requestDate: "2024-07-18",
      status: "Pending",
      transactionId: ""
    },
    {
      id: 2,
      user: {
        name: "Alice Smith",
        email: "alice@example.com",
        avatar: "/placeholder-avatar.jpg"
      },
      amount: "$120",
      currency: "ETH",
      walletAddress: "0x742d35Cc4Bf9949A9CFa1df4B7C38A2f74b7E8c3",
      requestDate: "2024-07-19",
      status: "Approved",
      transactionId: "0x123...abc"
    },
    {
      id: 3,
      user: {
        name: "Bob Wilson",
        email: "bob@example.com",
        avatar: "/placeholder-avatar.jpg"
      },
      amount: "$75",
      currency: "USDT",
      walletAddress: "TQn9Y8Md3Ec3pK8VT5xK9r4Lj6Hf3mP2nQ",
      requestDate: "2024-07-17",
      status: "Rejected",
      transactionId: ""
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <Check className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Rejected":
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setWithdrawals(prev => 
      prev.map(withdrawal => 
        withdrawal.id === id 
          ? { ...withdrawal, status: newStatus, transactionId: newStatus === "Approved" ? "0x" + Math.random().toString(16).substr(2, 8) : "" }
          : withdrawal
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Withdrawal request has been ${newStatus.toLowerCase()}`,
    });
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal =>
    withdrawal.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    withdrawal.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = withdrawals.filter(w => w.status === "Pending").length;
  const approvedCount = withdrawals.filter(w => w.status === "Approved").length;
  const rejectedCount = withdrawals.filter(w => w.status === "Rejected").length;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Withdrawal Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Review and process withdrawal requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user name or email..."
          className="pl-10 w-full"
        />
      </div>

      {/* Desktop Table (hidden on mobile) */}
      <Card className="hidden sm:block">
        <CardHeader>
          <CardTitle>Withdrawal Requests ({filteredWithdrawals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={withdrawal.user.avatar} alt={withdrawal.user.name} />
                          <AvatarFallback>{withdrawal.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{withdrawal.user.name}</p>
                          <p className="text-sm text-muted-foreground">{withdrawal.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{withdrawal.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{withdrawal.currency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-32 truncate font-mono text-sm">
                        {withdrawal.walletAddress}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{withdrawal.requestDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(withdrawal.status)}>
                        {getStatusIcon(withdrawal.status)}
                        <span className="ml-1">{withdrawal.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {withdrawal.status === "Pending" && (
                          <>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                  <Check className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Approve Withdrawal</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to approve this withdrawal request for {withdrawal.amount}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleStatusUpdate(withdrawal.id, "Approved")}>
                                    Approve
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <X className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Reject Withdrawal</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to reject this withdrawal request?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleStatusUpdate(withdrawal.id, "Rejected")}>
                                    Reject
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards (shown only on mobile) */}
      <div className="sm:hidden space-y-4">
        <h2 className="text-lg font-bold">Withdrawal Requests ({filteredWithdrawals.length})</h2>
        {filteredWithdrawals.map((withdrawal) => (
          <Card key={withdrawal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={withdrawal.user.avatar} alt={withdrawal.user.name} />
                    <AvatarFallback>{withdrawal.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{withdrawal.user.name}</p>
                    <p className="text-sm text-muted-foreground">{withdrawal.user.email}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(withdrawal.status)}>
                  {getStatusIcon(withdrawal.status)}
                  <span className="ml-1">{withdrawal.status}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">{withdrawal.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Currency</p>
                  <p className="font-medium">
                    <Badge variant="outline">{withdrawal.currency}</Badge>
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{withdrawal.requestDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Wallet</p>
                  <p className="font-medium font-mono text-xs truncate">
                    {withdrawal.walletAddress}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                {withdrawal.status === "Pending" && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <Check className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve Withdrawal</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to approve this withdrawal request for {withdrawal.amount}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleStatusUpdate(withdrawal.id, "Approved")}>
                            Approve
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Withdrawal</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject this withdrawal request?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleStatusUpdate(withdrawal.id, "Rejected")}>
                            Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminWithdrawals;