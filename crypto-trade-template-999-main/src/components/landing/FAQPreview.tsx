
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How does the 5% monthly ROI work?",
    answer: "Our platform generates returns through strategic crypto trading and DeFi protocols. The 5% monthly ROI is calculated on your total investment and paid out monthly to your wallet."
  },
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment starts at $100 for our Starter Plan. You can choose from three different plans based on your investment capacity and risk tolerance."
  },
  {
    question: "How secure are my investments?",
    answer: "We use bank-level security with multi-signature wallets, cold storage, and comprehensive KYC verification. Your funds are protected by advanced blockchain security protocols."
  },
  {
    question: "When can I withdraw my funds?",
    answer: "You can withdraw your funds anytime after completing KYC verification. Withdrawals are processed within 24-48 hours during business days."
  },
  {
    question: "How does the referral program work?",
    answer: "Earn 5% bonus on every friend's investment. Share your unique referral link, and when someone invests using your link, you receive 5% of their investment amount as a bonus."
  }
];

const FAQPreview = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-400"
          >
            Get answers to the most common questions about our platform
          </motion.p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline" className="glass">
            <Link to="/faq">
              View All FAQs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPreview;
