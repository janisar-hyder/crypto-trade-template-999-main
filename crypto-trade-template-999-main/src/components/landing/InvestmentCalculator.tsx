import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const InvestmentCalculator = () => {
  const [selectedMetal, setSelectedMetal] = useState("crypto");
  const [startingAmount, setStartingAmount] = useState(3000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);

  // Calculate projected value based on average growth
  const calculateProjectedValue = () => {
    const years = 5;
    const annualGrowthRate = selectedMetal === "crypto" ? 0.15 : 0.10;
    const monthlyRate = annualGrowthRate / 12;
    
    // Future value of lump sum
    const lumpSumFV = startingAmount * Math.pow(1 + annualGrowthRate, years);
    
    // Future value of monthly investments (annuity)
    const monthlyFV = monthlyInvestment > 0 
      ? (monthlyInvestment * (Math.pow(1 + monthlyRate, years * 12) - 1)) / monthlyRate
      : 0;
    
    return lumpSumFV + monthlyFV;
  };

  // Generate chart data for 5 years
  const generateChartData = () => {
    const data = [];
    const years = 5;
    const annualGrowthRate = selectedMetal === "crypto" ? 0.15 : 0.10;
    const monthlyRate = annualGrowthRate / 12;
    
    for (let month = 0; month <= years * 12; month++) {
      const year = Math.floor(month / 12);
      const monthInYear = month % 12;
      
      // Calculate lump sum growth
      const lumpSumValue = startingAmount * Math.pow(1 + annualGrowthRate, month / 12);
      
      // Calculate monthly investment accumulation
      let monthlyAccumulation = 0;
      if (monthlyInvestment > 0 && month > 0) {
        monthlyAccumulation = (monthlyInvestment * (Math.pow(1 + monthlyRate, month) - 1)) / monthlyRate;
      }
      
      const totalValue = lumpSumValue + monthlyAccumulation;
      
      data.push({
        month: month,
        year: year,
        value: Math.round(totalValue),
        label: month === 0 ? "Now" : `Year ${year}${monthInYear === 0 ? "" : `.${monthInYear}`}`,
        displayLabel: month % 12 === 0 ? `Year ${year}` : ""
      });
    }
    
    return data;
  };

  const projectedValue = calculateProjectedValue();
  const chartData = generateChartData();

  const chartConfig = {
    value: {
      label: "Investment Value",
      color: "hsl(var(--primary))",
    },
  };

  // Custom active dot for the chart
  const renderActiveDot = (props) => (
    <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="hsl(var(--primary))" />
      <circle cx="8" cy="8" r="3" fill="white" />
      <circle cx="8" cy="8" r="8" fill="hsl(var(--primary)/0.2)" />
    </svg>
  );

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-6 md:space-y-8"
            >
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  If I had invested{" "}
                  <span className="text-primary">5 years ago?</span>
                </h2>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <p className="text-base sm:text-lg text-muted-foreground">
                  Cryptocurrencies have historically gained significant value in the long term. 
                  Estimate how much you could have earned with consistent investments over the past 5 years.
                </p>
                
                <div className="flex items-center space-x-2 text-primary">
                  <span className="text-lg">💡</span>
                  <p className="font-medium text-sm sm:text-base">
                    We have 3 strategies matching your starting amount!
                  </p>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary/80 p-0 h-auto font-medium text-sm sm:text-base"
                >
                  See my strategies <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Enhanced Chart Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Investment Growth</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">5 Year Projection</span>
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                </div>
                
                <div className="h-56 sm:h-64 w-full">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          vertical={false} 
                          stroke="hsl(var(--border))"
                          strokeOpacity={0.5}
                        />
                        
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => {
                            const year = Math.floor(value / 12);
                            return year === 0 ? "Now" : `Year ${year}`;
                          }}
                          tickMargin={10}
                        />
                        
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                          width={40}
                        />
                        
                        <ChartTooltip 
                          content={<ChartTooltipContent 
                            formatter={(value) => [`€${Number(value).toLocaleString()}`, "Value"]}
                            labelFormatter={(label) => {
                              const year = Math.floor(Number(label) / 12);
                              const month = Number(label) % 12;
                              return year === 0 ? "Now" : `Year ${year}, Month ${month}`;
                            }}
                            contentStyle={{
                              background: "hsl(var(--card))",
                              borderColor: "hsl(var(--border))",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                          />}
                        />
                        
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#colorGradient)"
                          fillOpacity={1}
                          activeDot={renderActiveDot}
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                  <span>Projected growth: {selectedMetal === "crypto" ? "15%" : "10%"} annually</span>
                  <span>Adjusted for compound interest</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-card border border-border rounded-xl lg:rounded-2xl p-6 md:p-8 shadow-lg lg:shadow-2xl">
                <div className="space-y-4 md:space-y-6">
                  {/* Asset Selection */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Investment Type
                    </label>
                    <div className="flex space-x-2">
                      <Button
                        variant={selectedMetal === "crypto" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetal("crypto")}
                        className="rounded-full text-xs sm:text-sm"
                      >
                        Crypto
                      </Button>
                      <Button
                        variant={selectedMetal === "stocks" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetal("stocks")}
                        className="rounded-full text-xs sm:text-sm"
                      >
                        Stocks
                      </Button>
                    </div>
                  </div>

                  {/* Starting Amount */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Starting amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        €
                      </span>
                      <input
                        type="number"
                        value={startingAmount}
                        onChange={(e) => setStartingAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((startingAmount / 10000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Monthly Investment */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Add a monthly investment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        €
                      </span>
                      <input
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Result */}
                  <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Today you would have:
                    </p>
                    <div className="text-2xl sm:text-3xl font-bold text-primary">
                      €{projectedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;