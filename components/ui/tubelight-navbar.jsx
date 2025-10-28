"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { StarButton } from "./star-button"

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items?.[0]?.name ?? "")
  const [isScrolled, setIsScrolled] = useState(false)
  const clickFreezeRef = useRef(0)

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

  // ScrollSpy: robust centerline detection based on scroll position
  useEffect(() => {
    if (!items?.length) return

    const sections = items
      .map((it) => {
        const id = typeof it.url === 'string' && it.url.startsWith('#') ? it.url.slice(1) : null
        if (!id) return null
        const el = document.getElementById(id)
        return el ? { id, name: it.name, el } : null
      })
      .filter(Boolean)

    let ticking = false

    const computeActive = () => {
      ticking = false
      // small freeze after direct click to avoid flicker
      if (performance.now() - clickFreezeRef.current < 450) return

      const mid = window.innerHeight * 0.4
      let best = null
      let bestScore = Number.POSITIVE_INFINITY
      for (const s of sections) {
        const rect = s.el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        // Prefer the one covering the mid line, otherwise nearest center to mid
        let score = Math.abs(center - mid)
        if (rect.top <= mid && rect.bottom >= mid) score -= 10000
        if (score < bestScore) {
          bestScore = score
          best = s
        }
      }
      if (best && best.name !== activeTab) {
        setActiveTab(best.name)
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(computeActive)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Initial compute after layout
    const initId = setTimeout(onScroll, 60)

    return () => {
      clearTimeout(initId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items, activeTab])

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
              className="hidden md:flex items-center gap-2 relative"
              style={{ willChange: "transform" }}
            >
              {items?.map((item) => {
                const isActive = activeTab === item.name
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => {
                      clickFreezeRef.current = performance.now()
                      setActiveTab(item.name)
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative font-medium transition-all duration-[500ms] overflow-hidden",
                      isScrolled
                        ? "text-sm px-4 py-2 rounded-full " + (isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5")
                        : "text-sm lg:text-base relative py-2 px-3 " + (isActive ? "text-white" : "text-gray-300 hover:text-white")
                    )}
                  >
                    {/* Active pill highlight (compact state) */}
                    {isScrolled && isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/15 shadow-[0_2px_20px_rgba(153,69,255,0.18)]"
                        transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.8 }}
                        style={{ willChange: "transform, box-shadow" }}
                      />
                    )}

                    {/* Hover sheen */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

                    {item.name}
                    {!isScrolled && isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-gradient-to-r from-[#14F195] to-[#9945FF]"
                        transition={{ type: "spring", stiffness: 600, damping: 40 }}
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
                      onClick={() => {
                        clickFreezeRef.current = performance.now()
                        setActiveTab(item.name)
                      }}
                      className={cn(
                        "group relative px-3 py-1.5 rounded-full text-sm whitespace-nowrap border overflow-hidden",
                        activeTab === item.name
                          ? "text-white border-white/20"
                          : "text-gray-300 border-white/10 hover:text-white hover:border-white/20"
                      )}
                    >
                      {activeTab === item.name && (
                        <motion.span
                          layoutId="mobile-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />
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
