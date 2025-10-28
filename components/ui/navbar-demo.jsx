"use client"

import { Home, Zap, Settings, HelpCircle, BarChart3, Star } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"

export function SolUPINavBar() {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Features', url: '#features', icon: Zap },
    { name: 'How It Works', url: '#how-it-works', icon: Settings },
    { name: 'Comparison', url: '#comparison', icon: BarChart3 },
    { name: 'Testimonials', url: '#testimonials', icon: Star },
    { name: 'FAQ', url: '#faq', icon: HelpCircle },
  ]

  return <NavBar items={navItems} />
}
