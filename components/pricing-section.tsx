"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    price: 999,
    description: "Perfect for small businesses",
    features: [
      "Social media strategy",
      "Content calendar (30 posts/month)",
      "Basic analytics",
      "Community management",
      "Monthly reporting",
    ],
  },
  {
    name: "Professional",
    price: 2499,
    description: "For growing brands",
    features: [
      "Everything in Starter",
      "Paid ad campaigns",
      "Influencer outreach",
      "Advanced analytics",
      "Weekly reporting",
      "Brand strategy consultation",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 4999,
    description: "For established brands",
    features: [
      "Everything in Professional",
      "Custom content creation",
      "Dedicated account manager",
      "Real-time analytics dashboard",
      "Daily reporting",
      "Crisis management support",
      "Quarterly strategy reviews",
    ],
  },
]

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section
      id="pricing"
      className="relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Simple, Transparent Pricing</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Choose the perfect plan for your business needs
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-foreground" : "text-foreground/50"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-primary transition-transform ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isYearly ? "text-foreground" : "text-foreground/50"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-accent">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-primary/10 via-accent/10 to-transparent border border-primary/40 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
                  : "glass hover:shadow-md hover:shadow-primary/10 hover:scale-105"
              }`}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold shadow-md">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold gradient-text">
                    ${isYearly ? Math.floor(plan.price * 12 * 0.8) : plan.price}
                  </span>
                  <span className="text-foreground/60 text-sm ml-2">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-full font-semibold mb-8 transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/40"
                      : "border-2 border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  Choose Plan
                </button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
