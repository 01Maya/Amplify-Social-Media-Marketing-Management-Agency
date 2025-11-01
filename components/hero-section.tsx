"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const brands = [
  { name: "Apple", logo: "/logos/apple.png" },
  { name: "Google", logo: "/logos/google.png" },
  { name: "Meta", logo: "/logos/meta.png" },
  { name: "Disney", logo: "/logos/disney.png" },
  { name: "Figma", logo: "/logos/figma.png" },
  { name: "CocaCola", logo: "/logos/cocacola.png" },
  { name: "Github", logo: "/logos/github.png" },
  { name: "Netflix", logo: "/logos/netflix.png" },
  { name: "Mercedes", logo: "/logos/mercedez.png" },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height
      containerRef.current.style.setProperty("--mouse-x", `${x * 100}%`)
      containerRef.current.style.setProperty("--mouse-y", `${y * 100}%`)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-12"
    >
      {/* BG Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background animate-gradient-shift" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Text */}
      <div className="inline-block mt-20 mb-6 px-6 py-3 rounded-full glass hover-glow transition-all duration-300">
        <span className="text-sm font-medium gradient-text">
          Welcome to the Future of Social Marketing
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center animate-slide-in-up">
        <span className="text-foreground/70 block">Your Digital Presence,</span>
        <span className="gradient-text text-card-foreground block">AMPLIFIED</span>
      </h1>

      <p
        className="text-base sm:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto text-center animate-slide-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        We help brands grow through social storytelling, strategic ads, and audience intelligence.
        Transform your digital presence into a powerful growth engine.
      </p>

      {/* Buttons */}
      <div
        className="flex flex-col sm:flex-row gap-3 justify-center mb-10 animate-slide-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <a href="#contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover-lift transition-all duration-300 hover:glow-lilac">
          Get Started
        </a>
        <button className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300">
          View Portfolio
        </button>
      </div>

      {/* ✅ Seamless Infinite Scroll */}
      <div className="relative w-full overflow-hidden border-t border-white/10 mt-2 mb-6">
        <div className="marquee flex items-center gap-20 whitespace-nowrap py-4">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center px-6 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={40}
                height={20}
                className="object-contain w-12 sm:w-14 md:w-16 h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Icon */}
      <div
        className="flex justify-center animate-bounce-soft mb-4 cursor-pointer"
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight * 0.9, // 👈 scrolls 60% of the screen height
            behavior: "smooth",
          })
        }}
      >
        <ChevronDown className="w-6 h-6 text-primary/60 hover:text-primary transition-colors duration-300" />
      </div>
      
      {/* ✅ CSS for seamless + responsive speed */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
        }
        @media (max-width: 1024px) {
          .marquee {
            animation-duration: 15s;
          }
        }
        @media (max-width: 640px) {
          .marquee {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  )
}
