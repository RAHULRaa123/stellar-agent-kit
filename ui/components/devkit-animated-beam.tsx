"use client"

import { forwardRef, useRef, useState } from "react"
import Image from "next/image"
import { User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"

// Same 5 protocols as protocols-integrated.tsx — logos from public/brand/logos
const PROTOCOL_LOGOS = [
  { name: "SoroSwap", logo: "/brand/logos/soroswap.svg" },
  { name: "Blend", logo: "/brand/logos/blend.svg" },
  { name: "Allbridge", logo: "/brand/logos/allbridge.svg" },
  { name: "FxDAO", logo: "/brand/logos/FxDAO.svg" },
  { name: "Reflector", logo: "/brand/logos/relflector.svg" },
] as const

const Node = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-white text-zinc-800 shadow-md",
      className
    )}
  >
    {children}
  </div>
))
Node.displayName = "Node"

const ProtocolNode = forwardRef<
  HTMLDivElement,
  { logo: string; name: string }
>(function ProtocolNode({ logo, name }, ref) {
  const [failed, setFailed] = useState(false)
  return (
    <Node ref={ref} className="size-11 overflow-hidden p-1.5">
      {!failed ? (
        <Image
          src={logo}
          alt={name}
          width={36}
          height={36}
          className="h-full w-full object-contain"
          unoptimized={logo.endsWith(".svg")}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs font-medium text-zinc-600">{name.slice(0, 2)}</span>
      )}
    </Node>
  )
})

export function DevKitAnimatedBeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const platformRef = useRef<HTMLDivElement>(null)
  const p1Ref = useRef<HTMLDivElement>(null)
  const p2Ref = useRef<HTMLDivElement>(null)
  const p3Ref = useRef<HTMLDivElement>(null)
  const p4Ref = useRef<HTMLDivElement>(null)
  const p5Ref = useRef<HTMLDivElement>(null)
  const protocolRefs = [p1Ref, p2Ref, p3Ref, p4Ref, p5Ref]

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg p-3"
    >
      <div className="relative flex min-h-[200px] w-full max-w-[340px] flex-1 flex-col items-center justify-between gap-3">
        {/* Top: User */}
        <Node ref={userRef} className="size-10">
          <User className="h-5 w-5" strokeWidth={2} />
        </Node>

        {/* Middle: Platform */}
        <Node ref={platformRef} className="size-12 border-white bg-white">
          <Zap className="h-6 w-6 text-zinc-700" strokeWidth={2} />
        </Node>

        {/* Bottom: 5 protocol logos in a row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {PROTOCOL_LOGOS.map((p, i) => (
            <ProtocolNode
              key={p.name}
              ref={protocolRefs[i] as React.RefObject<HTMLDivElement>}
              logo={p.logo}
              name={p.name}
            />
          ))}
        </div>
      </div>

      {/* User → Platform */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={platformRef}
        curvature={0}
        gradientStartColor="#facc15"
        gradientStopColor="#a78bfa"
        pathColor="rgba(255,255,255,0.4)"
        pathWidth={1.5}
        pathOpacity={0.5}
        duration={3}
      />

      {/* 5 protocols → Platform */}
      {protocolRefs.map((ref, i) => (
        <AnimatedBeam
          key={i}
          containerRef={containerRef}
          fromRef={ref}
          toRef={platformRef}
          curvature={i === 0 ? 25 : i === 4 ? -25 : i === 1 ? 12 : i === 3 ? -12 : 0}
          gradientStartColor="#facc15"
          gradientStopColor="#a78bfa"
          pathColor="rgba(255,255,255,0.4)"
          pathWidth={1.5}
          pathOpacity={0.5}
          duration={3}
          delay={i * 0.2}
        />
      ))}
    </div>
  )
}
