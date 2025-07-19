
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Copy, LogOut, User, Settings, CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DashboardTopBarProps {
  onMenuClick: () => void;
}

const DashboardTopBar = ({ onMenuClick }: DashboardTopBarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [referralCount] = useState(3);
  const [totalBalance] = useState("0.472 BTC");
  const [accountStatus] = useState("Verified");
  const referralLink = "https://cryptoroi.app/ref/abc123";

  const handleCopyReferralLink = async () => {
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

  const handleProfileClick = () => {
    navigate("/dashboard/settings");
  };

  const handleSettingsClick = () => {
    navigate("/dashboard/settings");
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500";
      case "KYC Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <header className="bg-gradient-to-r from-background via-background/95 to-background/90 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
      {/* Left side - Menu button (mobile) */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden hover:bg-accent rounded-xl"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Referred Counter */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Referred:</span>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">{referralCount}</Badge>
        </div>
      </div>

      {/* Center/Right side - User info */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Copy Referral Link */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyReferralLink}
          className="flex items-center space-x-2 bg-card/50 border-border hover:bg-accent backdrop-blur-sm rounded-xl"
        >
          <Copy className="h-4 w-4" />
          <span className="hidden sm:inline">Copy Referral Link</span>
        </Button>

        {/* Account Status */}
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
          <div className={cn("w-2 h-2 rounded-full animate-pulse", getStatusColor(accountStatus))} />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">{accountStatus}</span>
          {accountStatus === "Verified" && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </div>

        {/* Total Balance */}
        <div className="text-right px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
          <div className="text-xs text-muted-foreground">Total Balance</div>
          <div className="text-sm font-bold text-primary">{totalBalance}</div>
        </div>

        {/* Profile Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold border border-primary/20">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-xl border-border" align="end">
            <div className="flex items-center justify-start gap-2 p-2 border-b border-border">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <DropdownMenuItem onClick={handleProfileClick} className="hover:bg-accent cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick} className="hover:bg-accent cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:bg-red-500/10 hover:text-red-400 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardTopBar;
