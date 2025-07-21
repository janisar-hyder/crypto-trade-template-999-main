import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  DollarSign, 
  Copy,
  Gift,
  ArrowRight,
  Sparkles,
  Share2,
  MessageSquare,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referrals = () => {
  const { toast } = useToast();
  const referralCode = "CRYPTOABC123";

  const referralStats = [
    {
      title: "Total Referrals",
      amount: "12",
      subtitle: "+3 this month",
      icon: Users,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
      
    },
    {
      title: "Referral Earnings",
      amount: "$75.18",
      subtitle: "+$12.50 this month",
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",

    }
  ];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy referral code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referral Program</h1>
          <p className="text-muted-foreground mt-2">
            Invite friends and earn <span className="font-semibold text-emerald-400">5% commission</span> on their investments
          </p>
        </div>
        <Sparkles className="h-8 w-8 text-amber-400" />
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {referralStats.map((card, index) => (
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
                </div>
                
                
              </div>
              
              
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Code Section */}
      <Card className="bg-amber-500/10 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-400" />
            Your Referral Code
          </CardTitle>
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Share2 className="h-6 w-6 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input 
                value={referralCode} 
                readOnly 
                className="h-12 text-base font-mono border-2 border-primary/20 bg-background/50" 
              />
            </div>
            <Button 
              onClick={handleCopyCode}
              className="h-12 px-6 bg-primary hover:bg-primary/90"
            >
              <Copy className="h-5 w-5 mr-2" />
              Copy Referral Code
            </Button>
          </div>
          {/* <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/50">
              <Mail className="h-4 w-4 mr-2" />
              Share via Email
            </Button>
            <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/50">
              <MessageSquare className="h-4 w-4 mr-2" />
              Share on Social
            </Button>
          </div> */}
        </CardContent>
      </Card>

      {/* Referral Program Info */}
      <Card className="bg-card/50 backdrop-blur-sm border border-sky-500/20 hover:border-sky-500/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-sky-500/10 border border-sky-500/20">
              <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-sky-400">1</span>
              </div>
              <h3 className="font-semibold text-center">Share Your Code</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Share your unique referral code with friends
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">2</span>
              </div>
              <h3 className="font-semibold text-center">They Invest</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Your friends sign up and make investments
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-amber-400">3</span>
              </div>
              <h3 className="font-semibold text-center">You Earn</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Get 5% commission on all their investments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referrals;