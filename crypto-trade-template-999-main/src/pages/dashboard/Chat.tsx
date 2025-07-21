import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Clock } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "admin";
  message: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "admin",
      message: "Hello! How can I help you today?",
      timestamp: new Date(Date.now() - 3600000),
      status: "read"
    },
    {
      id: "2",
      sender: "user",
      message: "Hi, I have a question about my investment plan.",
      timestamp: new Date(Date.now() - 3500000),
      status: "read"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "user",
        message: newMessage,
        timestamp: new Date(),
        status: "sent"
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate admin typing
      setTimeout(() => setIsTyping(true), 1000);
      setTimeout(() => {
        setIsTyping(false);
        const adminReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          message: "Thank you for your message. I'll review your inquiry and get back to you shortly.",
          timestamp: new Date(),
          status: "sent"
        };
        setMessages(prev => [...prev, adminReply]);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chat with Admin</h1>
          <p className="text-muted-foreground">Get help with your account and investments</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Admin Online
        </Badge>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/admin-avatar.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Support Admin</CardTitle>
              <p className="text-sm text-muted-foreground">Usually replies instantly</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}>
                      <Clock className="w-3 h-3" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--background));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.5);
          border-radius: 3px;
          transition: background-color 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
};

export default Chat;