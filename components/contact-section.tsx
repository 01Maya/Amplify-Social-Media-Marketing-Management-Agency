"use client"

import React, { useEffect, useRef, useState } from "react"
import { Mail, Phone, MessageSquare, Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const rightRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = leftRef.current ?? rightRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )

    if (leftRef.current) obs.observe(leftRef.current)
    if (rightRef.current) obs.observe(rightRef.current)

    return () => obs.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side — Info */}
          <div
            ref={leftRef}
            className={`${
              visible ? "animate-slide-in-left" : "opacity-0 translate-x-[-30px]"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Let's Connect</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-12">
              Ready to amplify your digital presence? Get in touch with our team and let's create
              something amazing together.
            </p>

            <div className="space-y-6">
              {[
                {
                  Icon: Mail,
                  title: "Email",
                  text: "hello@amplify.agency",
                },
                {
                  Icon: Phone,
                  title: "Phone",
                  text: "+1 (555) 123-4567",
                },
                {
                  Icon: MessageSquare,
                  title: "Live Chat",
                  text: "Available 9am - 6pm EST",
                },
              ].map(({ Icon, title, text }, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:animate-glow-pulse transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-foreground/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side — Form */}
          <div
            ref={rightRef}
            className={`glass rounded-2xl p-8 hover-lift ${
              visible ? "animate-slide-in-right" : "opacity-0 translate-x-[30px]"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  label: "Name",
                  name: "name",
                  type: "text",
                  placeholder: "Your name",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "your@email.com",
                },
              ].map((input, i) => (
                <div key={i} className="group">
                  <label className="block text-sm font-medium mb-2">{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}

              <div className="group">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:glow-lilac transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>{submitted ? "Message Sent!" : "Send Message"}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Inline animation CSS (kept minimal & robust) */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.85s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.85s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </section>
  )
}
