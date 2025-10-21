"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { StarButton } from "./star-button"

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items?.[0]?.name ?? "")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Once scrolled, always stay in compact mode
      if (window.scrollY > 10) {
        setIsScrolled(true)
      }
    }
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
      <motion.div
        layout
        transition={{
          layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }}
        className={cn(
          "transition-all duration-[600ms]",
          isScrolled ? "px-4 mt-4" : "px-0 mt-0"
        )}
        style={{ willChange: "transform" }}
      >
        <motion.div
          layout
          transition={{
            layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
          }}
          className={cn(
            "backdrop-blur-5xl border shadow-2xl transition-all duration-[600ms]",
            isScrolled 
              ? "bg-black/10 border-white/15 rounded-full px-6 py-3 max-w-5xl mx-auto shadow-purple-500/20"
              : "bg-black/40 border-white/5 border-b border-t-0 border-l-0 border-r-0 rounded-none w-full px-0 py-0"
          )}
          style={{ willChange: "transform, border-radius" }}
        >
          <motion.div 
            layout
            transition={{
              layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
            }}
            className={cn(
              "flex items-center transition-all duration-[600ms]",
              isScrolled 
                ? "justify-between gap-8" 
                : "container justify-between h-16 sm:h-20"
            )}
            style={{ willChange: "transform" }}
          >
            {/* Logo */}
            <motion.div 
              layout="position"
              transition={{
                layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
              }}
              style={{ willChange: "transform" }}
            >
              <Link 
                href="#home" 
                className={cn(
                  "font-extrabold tracking-tight transition-all duration-[600ms]",
                  isScrolled ? "text-lg" : "text-xl sm:text-2xl"
                )}
              >
                <span className="gradient-text">SolUPI</span>
              </Link>
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              layout="position"
              transition={{
                layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
              }}
              className="hidden md:flex items-center gap-2"
              style={{ willChange: "transform" }}
            >
              {items?.map((item) => {
                const isActive = activeTab === item.name
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "font-medium transition-all duration-[500ms]",
                      isScrolled
                        ? "text-sm px-4 py-2 rounded-full " + (isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5")
                        : "text-sm lg:text-base relative py-2 px-3 " + (isActive ? "text-white" : "text-gray-300 hover:text-white")
                    )}
                  >
                    {item.name}
                    {!isScrolled && isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-gradient-to-r from-[#14F195] to-[#9945FF]"
                      />
                    )}
                  </Link>
                )
              })}
            </motion.nav>

            {/* CTA Button */}
            <motion.div 
              layout="position"
              transition={{
                layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
              }}
              style={{ willChange: "transform" }}
            >
              <Link href="/app">
                <StarButton 
                  lightColor="#14F195"
                  duration={3}
                  className="bg-black border border-white/20 hover:border-white/40 transition-all duration-500"
                >
                  Open App
                </StarButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Nav - only show when not scrolled */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="md:hidden overflow-hidden"
              >
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
            </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
