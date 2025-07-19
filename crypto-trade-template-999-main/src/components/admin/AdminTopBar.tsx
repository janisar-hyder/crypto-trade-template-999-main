
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, Bell, User, Settings, LogOut, Shield } from "lucide-react";

interface AdminTopBarProps {
  onMenuClick: () => void;
}

const AdminTopBar = ({ onMenuClick }: AdminTopBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { type: "withdrawal", count: 3 },
    { type: "message", count: 5 },
  ]);

  const totalNotifications = notifications.reduce((sum, n) => sum + n.count, 0);

  return (
    <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
      {/* Left side - Menu button (mobile) */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden hover:bg-white/10 rounded-xl border border-white/10"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Account Status & Total */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-400">Account Status:</span>
            </div>
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-primary rounded-full" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Total:</div>
            <div className="text-sm font-bold text-primary">674.04 pt</div>
          </div>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name or email..."
            className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-colors backdrop-blur-sm rounded-xl"
          />
        </div>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm">
              <Bell className="h-4 w-4" />
              {totalNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600 border-0">
                  {totalNotifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-black/95 backdrop-blur-xl border-white/10">
            <div className="p-3 font-semibold flex items-center gap-2 border-b border-white/10">
              <Bell className="h-4 w-4" />
              Notifications
            </div>
            <DropdownMenuItem className="hover:bg-white/5">
              <div className="flex justify-between w-full">
                <span>Pending Withdrawals</span>
                <Badge variant="destructive" className="ml-2">{notifications[0].count}</Badge>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/5">
              <div className="flex justify-between w-full">
                <span>New Messages</span>
                <Badge variant="secondary" className="ml-2">{notifications[1].count}</Badge>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Admin Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
              <Avatar className="h-10 w-10 ring-2 ring-primary/30 ring-offset-2 ring-offset-black">
                <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold border border-primary/20">
                  <Shield className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black/95 backdrop-blur-xl border-white/10" align="end">
            <div className="flex items-center justify-start gap-3 p-3 border-b border-white/10">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
                  <Shield className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@cryptoroi.com</p>
              </div>
            </div>
            <DropdownMenuItem className="hover:bg-white/5">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/5">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminTopBar;
