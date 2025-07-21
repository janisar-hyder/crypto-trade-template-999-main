
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

        
      </div>


      {/* Right side Profile */}
      <div className="flex items-center space-x-4">


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
