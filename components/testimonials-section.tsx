"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc",
    image: "/professional-woman.png",
    quote:
      "Amplify transformed our social media presence. Our engagement increased by 300% in just 3 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "Fashion Forward",
    image: "/professional-man.png",
    quote:
      "The team is incredibly creative and data-driven. They truly understand our brand vision.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    company: "Wellness Co",
    image: "/professional-woman-2.png",
    quote:
      "Best investment we made for our business. The ROI has been exceptional.",
    rating: 5,
  },
  {
    name: "David Park",
    company: "E-commerce Plus",
    image: "/professional-man-2.png",
    quote:
      "Professional, responsive, and results-driven. Highly recommend Amplify!",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [progress, setProgress] = useState(0)

  // ✅ Auto-scroll + progress logic
  useEffect(() => {
    if (!autoPlay) return

    const duration = 5000
    const interval = 50
    const totalSteps = duration / interval
    let step = 0

    const progressTimer = setInterval(() => {
      step++
      setProgress((step / totalSteps) * 100)
      if (step >= totalSteps) {
        setCurrent((prev) => (prev + 1) % testimonials.length)
        step = 0
      }
    }, interval)

    return () => clearInterval(progressTimer)
  }, [autoPlay, current])

  // ✅ Resume autoplay if user interacts
  useEffect(() => {
    if (autoPlay) return
    const resume = setTimeout(() => setAutoPlay(true), 8000)
    return () => clearTimeout(resume)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
    setProgress(0)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
    setProgress(0)
  }

  return (
    <section
      id="testimonials"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">What Our Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70">
            Join hundreds of satisfied brands that have transformed with Amplify
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="glass rounded-xl p-6 sm:p-8 min-h-72 flex flex-col justify-between relative overflow-hidden">
            {/* Testimonial Content */}
            <div
              key={current}
              className="animate-slide-in-up transition-all duration-700 ease-out"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl font-medium mb-6 text-foreground">
                "{testimonials[current].quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[current].image || "/placeholder.svg"}
                  alt={testimonials[current].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                  <p className="text-xs sm:text-sm text-foreground/60">
                    {testimonials[current].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index)
                      setAutoPlay(false)
                      setProgress(0)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current ? "w-6 bg-primary" : "w-2 bg-primary/30"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
