"use client"

import React, { createContext, useContext, useRef, useEffect } from "react"
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react"
import { cn } from "@/lib/utils"

interface ScrollVelocityContextValue {
  velocity: ReturnType<typeof useSpring<number>>
}

const ScrollVelocityContext = createContext<ScrollVelocityContextValue | null>(null)

function useScrollVelocity() {
  const ctx = useContext(ScrollVelocityContext)
  if (!ctx) throw new Error("ScrollVelocityRow must be used inside ScrollVelocityContainer")
  return ctx
}

interface ScrollVelocityContainerProps {
  children: React.ReactNode
  className?: string
}

export function ScrollVelocityContainer({ children, className }: ScrollVelocityContainerProps) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 400, damping: 50 })

  return (
    <ScrollVelocityContext.Provider value={{ velocity: smoothVelocity }}>
      <div className={cn("relative flex w-full flex-col overflow-hidden", className)}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  )
}

interface ScrollVelocityRowProps {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
  className?: string
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
}: ScrollVelocityRowProps) {
  const { velocity } = useScrollVelocity()
  const baseX = useMotionValue(0)
  const x = useMotionValue(0)
  const segmentRef = useRef<HTMLSpanElement>(null)
  const width = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!segmentRef.current) return
    width.current = segmentRef.current.offsetWidth + 8
  }, [children])

  useAnimationFrame((_t, delta) => {
    if (prefersReducedMotion) return
    const v = velocity.get()
    const move = (baseVelocity + v * 0.02) * direction * (delta / 1000) * 80
    let next = baseX.get() + move
    const w = width.current
    if (w > 0) {
      while (direction === 1 && next <= -w) next += w
      while (direction === -1 && next >= w) next -= w
    }
    baseX.set(next)
    x.set(baseX.get())
  })

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex shrink-0 gap-[0.5em]" style={{ x }}>
        <span ref={segmentRef} className="inline-block shrink-0">{children}</span>
        <span className="inline-block shrink-0" aria-hidden>{children}</span>
        <span className="inline-block shrink-0" aria-hidden>{children}</span>
        <span className="inline-block shrink-0" aria-hidden>{children}</span>
      </motion.div>
    </div>
  )
}
