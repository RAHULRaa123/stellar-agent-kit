"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { BlendInterface } from "@/components/blend-interface"
import { AllbridgeInterface } from "@/components/allbridge-interface"
import { FxdaoInterface } from "@/components/fxdao-interface"
import { ReflectorInterface } from "@/components/reflector-interface"
import { SwapInterface } from "@/components/swap-interface"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PageTransition } from "@/components/page-transition"
import { ArrowLeftRight, Landmark, Link2, Vote, LineChart } from "lucide-react"

const PROTOCOL_TABS = [
  { id: "soroswap", label: "SoroSwap", icon: ArrowLeftRight, description: "DEX Aggregator" },
  { id: "blend", label: "Blend", icon: Landmark, description: "Lending Protocol" },
  { id: "allbridge", label: "Allbridge", icon: Link2, description: "Cross-chain Bridge" },
  { id: "fxdao", label: "FxDAO", icon: Vote, description: "Synthetic Stablecoins" },
  { id: "reflector", label: "Reflector", icon: LineChart, description: "Price Oracles" },
] as const

type ProtocolId = typeof PROTOCOL_TABS[number]["id"]

export default function ProtocolsUIPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("protocol")
  const validTab = PROTOCOL_TABS.find(tab => tab.id === tabParam)
  const tabFromUrl = validTab ? validTab.id : "soroswap"
  const [activeTab, setActiveTab] = useState<ProtocolId>(tabFromUrl)

  // Keep URL in sync when tab changes
  useEffect(() => {
    setActiveTab(tabFromUrl)
  }, [tabFromUrl])

  const onTabChange = useCallback(
    (value: string) => {
      const validProtocol = PROTOCOL_TABS.find(tab => tab.id === value)
      if (!validProtocol) return
      
      setActiveTab(validProtocol.id)
      const params = new URLSearchParams(searchParams.toString())
      if (validProtocol.id === "soroswap") {
        params.delete("protocol")
      } else {
        params.set("protocol", validProtocol.id)
      }
      router.replace(params.toString() ? `/protocols-ui?${params}` : "/protocols-ui", { scroll: false })
    },
    [router, searchParams]
  )

  const activeProtocol = PROTOCOL_TABS.find(tab => tab.id === activeTab)

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <PageTransition>
        <div className="relative z-20 container mx-auto px-6 lg:px-12 pt-24 pb-32 min-h-screen">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-none">
                Protocol Interfaces
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-8">
                Interact with all integrated Stellar protocols through our unified interface
              </p>
            </div>

            {/* Protocol Tabs */}
            <div className="animate-fade-in-up animation-delay-200">
              <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8 h-auto bg-zinc-950 border border-zinc-800 p-2 rounded-xl">
                  {PROTOCOL_TABS.map((protocol) => {
                    const Icon = protocol.icon
                    return (
                      <TabsTrigger
                        key={protocol.id}
                        value={protocol.id}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 data-[state=inactive]:text-zinc-400 data-[state=inactive]:hover:text-zinc-300 data-[state=active]:bg-zinc-600 data-[state=active]:text-white"
                      >
                        <Icon className="h-5 w-5" />
                        <div className="text-center">
                          <div className="font-medium text-sm">{protocol.label}</div>
                          <div className="text-xs opacity-70">{protocol.description}</div>
                        </div>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                {/* Protocol Content */}
                <div className="relative min-h-[600px] w-full">
                  <TabsContent
                    value="soroswap"
                    forceMount
                    className="protocol-tab-content w-full relative z-10 data-[state=inactive]:z-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 outline-none transition-opacity duration-300"
                  >
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <ArrowLeftRight className="h-6 w-6 text-[#a78bfa]" />
                        <div>
                          <h2 className="text-xl font-semibold text-white">SoroSwap Finance</h2>
                          <p className="text-sm text-zinc-400">DEX aggregator for optimal token swaps</p>
                        </div>
                      </div>
                      <SwapInterface />
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="blend"
                    forceMount
                    className="protocol-tab-content w-full relative z-10 data-[state=inactive]:z-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 outline-none transition-opacity duration-300"
                  >
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Landmark className="h-6 w-6 text-[#a78bfa]" />
                        <div>
                          <h2 className="text-xl font-semibold text-white">Blend Protocol</h2>
                          <p className="text-sm text-zinc-400">Lending and borrowing on Stellar</p>
                        </div>
                      </div>
                      <BlendInterface />
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="allbridge"
                    forceMount
                    className="protocol-tab-content w-full relative z-10 data-[state=inactive]:z-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 outline-none transition-opacity duration-300"
                  >
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Link2 className="h-6 w-6 text-[#a78bfa]" />
                        <div>
                          <h2 className="text-xl font-semibold text-white">Allbridge Core</h2>
                          <p className="text-sm text-zinc-400">Cross-chain bridge for asset transfers</p>
                        </div>
                      </div>
                      <AllbridgeInterface />
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="fxdao"
                    forceMount
                    className="protocol-tab-content w-full relative z-10 data-[state=inactive]:z-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 outline-none transition-opacity duration-300"
                  >
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Vote className="h-6 w-6 text-[#a78bfa]" />
                        <div>
                          <h2 className="text-xl font-semibold text-white">FxDAO</h2>
                          <p className="text-sm text-zinc-400">Synthetic stablecoins and DeFi vaults</p>
                        </div>
                      </div>
                      <FxdaoInterface />
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="reflector"
                    forceMount
                    className="protocol-tab-content w-full relative z-10 data-[state=inactive]:z-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 outline-none transition-opacity duration-300"
                  >
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <LineChart className="h-6 w-6 text-[#a78bfa]" />
                        <div>
                          <h2 className="text-xl font-semibold text-white">Reflector Oracle</h2>
                          <p className="text-sm text-zinc-400">Real-time price feeds and market data</p>
                        </div>
                      </div>
                      <ReflectorInterface />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </PageTransition>
    </main>
  )
}