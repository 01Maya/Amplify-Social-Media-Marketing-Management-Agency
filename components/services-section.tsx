"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, TrendingUp, Users, Palette, FileText, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Sparkles,
    title: "Social Media Strategy",
    description: "Comprehensive strategies tailored to your brand goals and target audience.",
    points: [
      "Platform-specific content plans",
      "Competitor benchmarking",
      "Hashtag & trend research",
      "Monthly growth tracking",
    ],
  },
  {
    icon: TrendingUp,
    title: "Ad Campaigns",
    description: "Data-driven advertising campaigns that maximize ROI and engagement.",
    points: [
      "Audience segmentation",
      "A/B creative testing",
      "Real-time performance monitoring",
      "ROI optimization",
    ],
  },
  {
    icon: Users,
    title: "Influencer Marketing",
    description: "Connect with the right influencers to amplify your brand message.",
    points: [
      "Influencer outreach strategy",
      "Engagement-based selection",
      "Campaign collaboration management",
      "Post-campaign analytics",
    ],
  },
  {
    icon: Palette,
    title: "Brand Identity Design",
    description: "Create a cohesive visual identity that resonates with your audience.",
    points: [
      "Logo & typography design",
      "Color palette curation",
      "Brand guideline creation",
      "Mockups & visual assets",
    ],
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Engaging, high-quality content that drives engagement and conversions.",
    points: [
      "Video & photo production",
      "Copywriting & storytelling",
      "Content scheduling",
      "SEO-optimized content",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Deep analytics and actionable insights to optimize your strategy.",
    points: [
      "Custom performance dashboards",
      "Engagement tracking",
      "Audience growth analysis",
      "Data-driven recommendations",
    ],
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false))
  const [flipped, setFlipped] = useState<boolean[]>(new Array(services.length).fill(false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev]
      newFlipped[index] = !newFlipped[index]
      return newFlipped
    })
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">What We Do</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Comprehensive social media solutions designed to elevate your brand and drive meaningful results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                data-index={index}
                onClick={() => toggleFlip(index)}
                className={`relative group h-[320px] transform-style-preserve-3d transition-transform duration-700 cursor-pointer ${
                  flipped[index] ? "rotate-y-180" : ""
                } ${
                  visibleCards[index]
                    ? "animate-fade-in-up"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 glass p-8 rounded-2xl flex flex-col items-start justify-center backface-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-105">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{service.description}</p>
                </div>

                {/* BACK SIDE - improved spacing and alignment */}
                <div className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground rotate-y-180 backface-hidden shadow-lg flex flex-col gap-6">
                  {/* Top row: title (left) and logo (top-right) */}
                  <div className="w-full flex items-start justify-between">
                    <h3 className="text-2xl font-semibold leading-tight">{service.title}</h3>

                    {/* Logo (no bg) */}
                    <div className="ml-4 flex-shrink-0">
                      <Icon className="w-10 h-10 text-primary-foreground opacity-95" />
                    </div>
                  </div>

                  {/* Bullet list — consistent spacing and indentation */}
                  <div className="flex-1">
                    <ul className="flex flex-col gap-3 text-sm text-primary-foreground/95">
                      {service.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 mt-1 bg-white rounded-full flex-shrink-0" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* optional footer area kept empty to preserve spacing */}
                  <div className="h-0" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
