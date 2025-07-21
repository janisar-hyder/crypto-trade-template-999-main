"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Professional Trader",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content:
      "The real-time market data and advanced trading features have significantly improved my trading performance. The platform's security measures give me peace of mind.",
  },
  {
    name: "Sarah Johnson",
    role: "Gold Fund Manager",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content:
      "GoldTrade's institutional-grade tools have transformed our trading strategy. The API integration and automated features have saved us countless hours.",
  },
  {
    name: "David Wilson",
    role: "Early Gold Investor",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content:
      "The customer support is exceptional, and the platform's intuitive design made getting started with Gold trading seamless. A game-changer for both beginners and pros.",
  },
  {
    name: "Emily Zhang",
    role: "DeFi Developer",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content:
      "We've seen remarkable improvements in our trading efficiency since switching to GoldTrade. The smart order routing and liquidity aggregation are particularly impressive.",
  },
  {
    name: "James Rodriguez",
    role: "Gold Security Expert",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content:
      "The security features are robust and the regular updates keep us ahead of emerging threats. It's exactly what the Gold industry needed.",
  },
  {
    name: "Lisa Thompson",
    role: "Portfolio Manager",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content:
      "The platform's ability to handle complex trading strategies while maintaining simplicity in its interface is remarkable. It's been invaluable for our portfolio management.",
  },
];

const TestimonialsSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <section className="py-20 overflow-hidden  ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-primary mr-4" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Testimonials
            </span>
            <div className="w-12 h-px bg-primary ml-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Trusted by Traders Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied traders who have transformed their trading experience
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-background via-background/0 to-background [background-size:200%_100%] [background-position:center]" />


          <motion.div
            className="flex min-w-[200%] space-x-4 py-6"
            animate={controls}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-[320px] flex-shrink-0 px-2"
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveIndex(index % testimonials.length);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Card className="h-full p-6 bg-card/60 border border-border/20 rounded-2xl backdrop-blur-md hover:border-primary/30 hover:shadow-lg transition-all group">
                  <Quote className="w-6 h-6 text-primary opacity-40 mb-4 group-hover:opacity-70 transition-opacity" />
                  <p className="text-foreground/90 mb-6 leading-relaxed text-sm group-hover:text-foreground transition-colors">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="h-12 w-12 border-2 border-primary/30 group-hover:border-primary/50 transition-colors">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-muted-foreground group-hover:text-primary/80 transition-colors">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
