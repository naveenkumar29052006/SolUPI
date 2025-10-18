"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "../../lib/utils"

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items?.[0]?.name ?? "")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn("fixed top-0 left-0 w-full z-50", className)}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        className={cn(
          "w-full backdrop-blur-xl border-b transition-colors",
          isScrolled ? "bg-black/60 border-white/10" : "bg-black/30 border-white/5"
        )}
      >
        <div className="container flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <Link href="#home" className="font-extrabold text-xl sm:text-2xl tracking-tight">
            <span className="gradient-text">SolUPI</span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {items?.map((item) => {
              const isActive = activeTab === item.name
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-colors py-2",
                    isActive && "text-white"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-gradient-to-r from-[#14F195] to-[#9945FF]"
                    />)
                  }
                </Link>
              )
            })}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <Link
              href="/app"
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-semibold shadow-lg hover:shadow-purple-500/30 transition-shadow"
            >
              Open App
            </Link>
          </div>
        </div>

        {/* Mobile Nav Row */}
        <div className="md:hidden">
          <div className="container overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-4 py-3">
              {items?.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm whitespace-nowrap border",
                    activeTab === item.name
                      ? "bg-white/10 text-white border-white/20"
                      : "text-gray-300 border-white/10 hover:text-white hover:border-white/20"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
