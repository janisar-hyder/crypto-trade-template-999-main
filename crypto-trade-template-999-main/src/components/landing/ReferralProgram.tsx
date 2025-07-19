
import { motion } from "framer-motion";
import { Users, Share, Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://cryptoinvest.com/ref/user123";

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="refer" className="container px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                <Gift className="w-4 h-4 text-primary" />
                Earn Extra Income
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-gradient">5% Referral Bonus</span>{" "}
                for Every Friend
              </h2>
              
              <p className="text-lg text-gray-400">
                Invite your friends and earn 5% bonus on their investments. 
                The more you share, the more you earn. Start building your referral network today.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">How Referral Works:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Share className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300">Share your unique referral link</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300">Friend signs up and invests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300">You earn 5% of their investment</span>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="button-gradient">
              Start Referring Now
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-center">Your Referral Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-gray-400">Total Referrals</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-green-500">$2,400</div>
                    <div className="text-sm text-gray-400">Total Earned</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Your Referral Link:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm"
                    />
                    <Button
                      onClick={copyReferralLink}
                      size="sm"
                      variant="outline"
                      className="glass"
                    >
                      {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t border-white/10">
                  <Button className="w-full button-gradient">
                    Invite a Friend
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;
