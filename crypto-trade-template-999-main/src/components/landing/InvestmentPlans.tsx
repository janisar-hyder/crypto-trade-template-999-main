
import { motion } from "framer-motion";
import { Check, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter Plan",
    minInvestment: "$100",
    maxInvestment: "$999",
    roi: "3%",
    period: "Monthly",
    features: [
      "3% Monthly ROI",
      "Minimum $100 investment",
      "Basic support",
      "Referral bonus eligible"
    ],
    popular: false
  },
  {
    name: "Growth Plan",
    minInvestment: "$1,000",
    maxInvestment: "$9,999",
    roi: "5%",
    period: "Monthly",
    features: [
      "5% Monthly ROI",
      "Minimum $1,000 investment",
      "Priority support",
      "Higher referral bonus",
      "Advanced analytics"
    ],
    popular: true
  },
  {
    name: "Premium Plan",
    minInvestment: "$10,000",
    maxInvestment: "$50,000+",
    roi: "7%",
    period: "Monthly",
    features: [
      "7% Monthly ROI",
      "Minimum $10,000 investment",
      "VIP support",
      "Maximum referral bonus",
      "Personal advisor",
      "Early access to new features"
    ],
    popular: false
  }
];

const InvestmentPlans = () => {
  return (
    <section id="plans" className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-bold mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient">Investment Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-gray-400"
        >
          Select the perfect plan that matches your investment goals and risk tolerance
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <Card className={`relative h-full glass ${plan.popular ? 'border-primary scale-105' : 'border-white/10'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">{plan.roi}</div>
                  <div className="text-sm text-gray-400">{plan.period} Returns</div>
                  <div className="text-lg font-semibold">
                    {plan.minInvestment} - {plan.maxInvestment}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full button-gradient">
                  <Link to="/signup">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Invest Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentPlans;
