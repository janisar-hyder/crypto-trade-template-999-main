
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your crypto investment assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your question! Our support team will get back to you shortly. In the meantime, feel free to explore our investment plans or check our FAQ section.",
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full button-gradient shadow-lg hover:shadow-xl transition-shadow"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 sm:bottom-24 right-4 sm:right-6 w-72 sm:w-80 z-40 max-w-[calc(100vw-2rem)]"
          >
            <Card className="glass border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="truncate">Crypto Assistant</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-auto animate-pulse flex-shrink-0" />
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3 sm:space-y-4">
                {/* Messages */}
                <div className="h-56 sm:h-64 overflow-y-auto space-y-2 sm:space-y-3 scrollbar-thin scrollbar-thumb-primary/20">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[75%] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${
                          message.isBot
                            ? 'bg-white/10 text-gray-200'
                            : 'bg-primary text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button
                    onClick={sendMessage}
                    size="sm"
                    className="button-gradient px-2 sm:px-3"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                <div className="text-[10px] sm:text-xs text-gray-500 text-center">
                  Powered by AI • Available 24/7
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;