"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart3, Users, Zap } from "lucide-react"

export default function AboutSection() {
  const [stats, setStats] = useState({ campaigns: 0, retention: 0, growth: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setStats({
        campaigns: Math.floor(500 * progress),
        retention: Math.floor(95 * progress),
        growth: Math.floor(300 * progress),
      })

      if (progress < 1) requestAnimationFrame(animate)
    }

    animate()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div
            className={`relative h-96 rounded-2xl overflow-hidden glass hover-lift transition-all duration-700 ${
              isVisible ? "animate-slide-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-24 h-24 text-primary/40 mx-auto mb-4" />
                <p className="text-foreground/50">Agency Workspace</p>
              </div>
            </div>

            {/* Floating icons */}
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/80 dark:bg-slate-900/80 flex items-center justify-center shadow-lg animate-float">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div
              className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-white/80 dark:bg-slate-900/80 flex items-center justify-center shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Zap className="w-8 h-8 text-accent" />
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? "animate-slide-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 animate-slide-in-up">
                <span className="gradient-text">Who We Are</span>
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We're a team of passionate digital strategists, creative minds, and data analysts dedicated to
                transforming brands through social media excellence. With years of industry experience, we've helped
                hundreds of businesses unlock their full potential.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div
                className="glass p-4 sm:p-6 rounded-xl text-center hover-lift animate-slide-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-xl sm:text-3xl font-bold gradient-text mb-2">{stats.campaigns}+</div>
                <p className="text-xs sm:text-sm text-foreground/60">Campaigns</p>
              </div>

              <div
                className="glass p-4 sm:p-6 rounded-xl text-center hover-lift animate-slide-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-xl sm:text-3xl font-bold gradient-text mb-2">{stats.retention}%</div>
                <p className="text-xs sm:text-sm text-foreground/60">Retention</p>
              </div>

              <div
                className="glass p-4 sm:p-6 rounded-xl text-center hover-lift animate-slide-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-xl sm:text-3xl font-bold gradient-text mb-2">{stats.growth}%</div>
                <p className="text-xs sm:text-sm text-foreground/60">Avg Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Animation */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.9s ease-out both;
        }
      `}</style>
    </section>
  )
}
