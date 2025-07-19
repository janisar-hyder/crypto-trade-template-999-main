
import { motion } from "framer-motion";
import { ChevronDown, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const faqCategories = [
  {
    category: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Get Started' button, fill in your personal information, verify your email, and complete the KYC process. The entire process takes about 5-10 minutes."
      },
      {
        question: "What documents do I need for verification?",
        answer: "You'll need a government-issued ID (passport, driver's license, or national ID card) and a proof of address (utility bill or bank statement) not older than 3 months."
      },
      {
        question: "How long does account verification take?",
        answer: "Account verification typically takes 24-48 hours. You'll receive an email notification once your account is approved and ready for investment."
      }
    ]
  },
  {
    category: "Investment Plans",
    faqs: [
      {
        question: "What are the available investment plans?",
        answer: "We offer three plans: Starter Plan (3% monthly ROI, $100-$999), Growth Plan (5% monthly ROI, $1,000-$9,999), and Premium Plan (7% monthly ROI, $10,000+)."
      },
      {
        question: "How is the ROI calculated and paid?",
        answer: "ROI is calculated monthly based on your total investment amount. Returns are automatically credited to your wallet on the same date each month after your investment."
      },
      {
        question: "Can I upgrade my investment plan?",
        answer: "Yes, you can upgrade your plan at any time by making an additional investment that meets the minimum requirement for the higher tier."
      }
    ]
  },
  {
    category: "Payments & Withdrawals",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Bitcoin (BTC), Ethereum (ETH), USDT (TRC20 and ERC20), and other major cryptocurrencies. Bank transfers are also available in select regions."
      },
      {
        question: "How do I withdraw my funds?",
        answer: "Go to your dashboard, click 'Withdraw', enter the amount and your wallet address. Withdrawals are processed within 24-48 hours after verification."
      },
      {
        question: "Are there any withdrawal fees?",
        answer: "We charge a minimal network fee for cryptocurrency withdrawals to cover blockchain transaction costs. The exact fee depends on the network congestion."
      }
    ]
  },
  {
    category: "Referral Program",
    faqs: [
      {
        question: "How does the referral program work?",
        answer: "Share your unique referral link with friends. When they sign up and make their first investment, you earn 5% of their investment amount as a bonus."
      },
      {
        question: "When do I receive referral bonuses?",
        answer: "Referral bonuses are credited to your wallet immediately after your referred friend's investment is confirmed on the blockchain."
      },
      {
        question: "Is there a limit to how many people I can refer?",
        answer: "No, there's no limit! You can refer as many people as you want and earn 5% bonus on each of their investments."
      }
    ]
  },
  {
    category: "Security & Support",
    faqs: [
      {
        question: "How secure is my investment?",
        answer: "We use advanced security measures including multi-signature wallets, cold storage, SSL encryption, and regular security audits to protect your funds."
      },
      {
        question: "What happens if I forget my password?",
        answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions in the reset email to create a new password."
      },
      {
        question: "How can I contact customer support?",
        answer: "You can reach us through live chat (24/7), email support@cryptoinvest.com, or use our AI chatbot for instant assistance with common questions."
      }
    ]
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Header */}
      <div className="container px-4 pt-24 pb-12">
        

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mb-6">
            <HelpCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to all your questions about our crypto investment platform
          </p>
        </motion.div>
      </div>

      {/* FAQ Content */}
      <div className="container px-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <Card key={faqIndex} className="glass border-border">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
                        >
                          <h3 className="text-lg font-semibold pr-4 text-foreground">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 flex-shrink-0 transition-transform text-muted-foreground ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6"
                          >
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <Card className="glass border-border">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4 text-foreground">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you 24/7. Get in touch with us through live chat or email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="button-gradient">
                  Start Live Chat
                </Button>
                <Button variant="outline" className="glass border-border">
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
