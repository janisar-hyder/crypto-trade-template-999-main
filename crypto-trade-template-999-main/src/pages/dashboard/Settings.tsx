import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Shield, 
  Key, 
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    sms: false
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile, security, and notification preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-background/50 backdrop-blur-sm border border-border">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Profile Information
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue="John" 
                      className="bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="john@example.com" 
                      className="bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue="Doe" 
                      className="bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      defaultValue="+1 (555) 123-4567" 
                      className="bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSaveProfile} 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-md"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card className="bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Key className="h-5 w-5 text-emerald-500" />
                  </div>
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Change Password
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    className="bg-background/90 hover:bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    className="bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    className="bg-background focus:bg-background focus:ring-0 focus:ring-offset-0 focus:border-0 border-border/99"
                  />
                </div>
                <Button 
                  onClick={handlePasswordChange} 
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-md"
                >
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;