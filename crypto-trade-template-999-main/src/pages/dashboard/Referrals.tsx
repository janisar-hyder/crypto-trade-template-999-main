
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Share2, 
  Copy, 
  DollarSign, 
  TrendingUp,
  Link,
  Mail,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referrals = () => {
  const { toast } = useToast();
  const referralLink = "https://cryptoroi.app/ref/abc123";

  const referralStats = [
    {
      title: "Total Referrals",
      value: "12",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Active Referrals",
      value: "8",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Referral Earnings",
      value: "75.18 USDT",
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "Commission Rate",
      value: "5%",
      icon: Share2,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const referralHistory = [
    { name: "John Smith", email: "john@example.com", date: "2024-01-15", status: "Active", earnings: "12.50 USDT" },
    { name: "Sarah Johnson", email: "sarah@example.com", date: "2024-01-14", status: "Active", earnings: "8.75 USDT" },
    { name: "Mike Wilson", email: "mike@example.com", date: "2024-01-12", status: "Inactive", earnings: "5.25 USDT" },
    { name: "Emma Davis", email: "emma@example.com", date: "2024-01-10", status: "Active", earnings: "15.80 USDT" },
    { name: "Alex Brown", email: "alex@example.com", date: "2024-01-08", status: "Active", earnings: "9.45 USDT" }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy referral link",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Referrals</h1>
          <p className="text-muted-foreground">Invite friends and earn 5% commission on their investments</p>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {referralStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Link Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Your Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input value={referralLink} readOnly className="flex-1" />
            <Button onClick={handleCopyLink} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Share via Email
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Share on Social
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Program Info */}
      <Card>
        <CardHeader>
          <CardTitle>How the Referral Program Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto">
                <Share2 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold">1. Share Your Link</h3>
              <p className="text-sm text-muted-foreground">
                Share your unique referral link with friends and family
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold">2. Friends Join</h3>
              <p className="text-sm text-muted-foreground">
                Your friends sign up and start investing using your link
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mx-auto">
                <DollarSign className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="font-semibold">3. Earn Commission</h3>
              <p className="text-sm text-muted-foreground">
                Earn 5% commission on all their investments automatically
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralHistory.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.email}</p>
                    <p className="text-xs text-muted-foreground">Joined: {referral.date}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="secondary" className={getStatusColor(referral.status)}>
                    {referral.status}
                  </Badge>
                  <p className="text-sm font-medium text-green-500">{referral.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referrals;
