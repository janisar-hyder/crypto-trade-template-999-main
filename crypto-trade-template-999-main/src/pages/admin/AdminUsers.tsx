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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Eye, Download } from "lucide-react";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      kycStatus: "Verified",
      totalInvested: "$2,500",
      totalEarned: "$450",
      referrals: 3,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      kycStatus: "Pending",
      totalInvested: "$1,200",
      totalEarned: "$180",
      referrals: 1,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      kycStatus: "Rejected",
      totalInvested: "$0",
      totalEarned: "$0",
      referrals: 0,
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header and Search - unchanged from previous version */}
      {/* ... */}

      {/* Desktop Table */}
      <Card className="hidden sm:block">
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Invested</TableHead>
                  <TableHead>Earned</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.kycStatus)}>
                        {user.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{user.totalInvested}</TableCell>
                    <TableCell className="font-medium text-green-600">{user.totalEarned}</TableCell>
                    <TableCell>{user.referrals}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleUserClick(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        <h2 className="text-lg font-bold">All Users ({filteredUsers.length})</h2>
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(user.kycStatus)}>
                  {user.kycStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invested</p>
                  <p className="font-medium">{user.totalInvested}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Earned</p>
                  <p className="font-medium text-green-600">{user.totalEarned}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Referrals</p>
                  <p className="font-medium">{user.referrals}</p>
                </div>
              </div>

               <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUserClick(user)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Details Dialog - now properly connected */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-[90vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>User Details - {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Name:</span> {selectedUser.name}</p>
                    <p><span className="text-muted-foreground">Email:</span> {selectedUser.email}</p>
                    <p><span className="text-muted-foreground">KYC Status:</span> 
                      <Badge className={`ml-2 ${getStatusColor(selectedUser.kycStatus)}`}>
                        {selectedUser.kycStatus}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Investment Summary</h4>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Total Invested:</span> {selectedUser.totalInvested}</p>
                    <p><span className="text-muted-foreground">Total Earned:</span> {selectedUser.totalEarned}</p>
                    <p><span className="text-muted-foreground">Referrals:</span> {selectedUser.referrals}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Message User</Button>
                <Button>Edit Profile</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;