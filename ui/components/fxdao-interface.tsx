"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, Unlock, Info, CheckCircle, XCircle, Coins } from "lucide-react"
import { useAccount } from "@/hooks/use-account"

// FxDAO synthetic stablecoins
const FXDAO_STABLECOINS = [
  { symbol: "USDx", name: "FxDAO USD", contractId: "FXDAO_USDX_CONTRACT" },
  { symbol: "EURx", name: "FxDAO EUR", contractId: "FXDAO_EURX_CONTRACT" },
  { symbol: "GBPx", name: "FxDAO GBP", contractId: "FXDAO_GBPX_CONTRACT" },
] as const

type FxdaoStablecoin = typeof FXDAO_STABLECOINS[number]

interface FxdaoTransaction {
  id: string
  type: "mint" | "burn" | "lock" | "unlock"
  asset: string
  amount: string
  status: "pending" | "success" | "error"
  hash?: string
  timestamp: number
}

export function FxdaoInterface() {
  const { publicKey, isConnected } = useAccount()
  const [selectedStablecoin, setSelectedStablecoin] = useState<FxdaoStablecoin>(FXDAO_STABLECOINS[0])
  const [xlmAmount, setXlmAmount] = useState("")
  const [stablecoinAmount, setStablecoinAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<FxdaoTransaction[]>([])
  const [positionStats, setPositionStats] = useState<{
    lockedXLM: string
    mintedUSDx: string
    collateralRatio: string
    liquidationPrice: string
  } | null>(null)

  // FxDAO position API not yet integrated — show placeholders until real endpoint exists
  // When /api/fxdao/position exists, fetch here by publicKey and setPositionStats

  const handleMintStablecoin = async () => {
    if (!isConnected || !publicKey || !xlmAmount) {
      setError("Please connect wallet and enter XLM amount to lock")
      return
    }
    setError("FxDAO mint is not yet connected to the network. Integration coming soon.")
  }

  const handleBurnStablecoin = async () => {
    if (!isConnected || !publicKey || !stablecoinAmount) {
      setError("Please connect wallet and enter stablecoin amount to burn")
      return
    }
    setError("FxDAO burn is not yet connected to the network. Integration coming soon.")
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <Alert className="max-w-md mx-auto">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Connect your Freighter wallet to interact with FxDAO protocol
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Position — real data when FxDAO position API is available */}
      <Card className="bg-zinc-900/50 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-[#a78bfa]" />
            Your Position
          </CardTitle>
          <CardDescription>
            Position data will appear here when the FxDAO API is integrated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{positionStats?.lockedXLM ?? "—"}</p>
              <p className="text-sm text-zinc-400">Locked XLM</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{positionStats?.mintedUSDx ?? "—"}</p>
              <p className="text-sm text-zinc-400">Minted USDx</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{positionStats?.collateralRatio ?? "—"}</p>
              <p className="text-sm text-zinc-400">Collateral Ratio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">{positionStats?.liquidationPrice ?? "—"}</p>
              <p className="text-sm text-zinc-400">Liquidation Price</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="mint" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-zinc-900 border border-zinc-700">
          <TabsTrigger 
            value="mint" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            <Lock className="h-4 w-4 mr-2" />
            Mint Stablecoins
          </TabsTrigger>
          <TabsTrigger 
            value="burn" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            <Unlock className="h-4 w-4 mr-2" />
            Burn & Unlock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mint" className="space-y-4">
          <Card className="bg-zinc-900/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Mint Synthetic Stablecoins</CardTitle>
              <CardDescription>
                Lock XLM as collateral to mint synthetic stablecoins (USDx, EURx, GBPx)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Stablecoin to Mint</Label>
                <Select
                  value={selectedStablecoin.symbol}
                  onValueChange={(value) => {
                    const stablecoin = FXDAO_STABLECOINS.find(s => s.symbol === value)
                    if (stablecoin) setSelectedStablecoin(stablecoin)
                    setError(null)
                  }}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600">
                    {FXDAO_STABLECOINS.map((stablecoin) => (
                      <SelectItem key={stablecoin.symbol} value={stablecoin.symbol} className="text-white hover:bg-zinc-700">
                        <div className="flex items-center gap-2">
                          <span>{stablecoin.symbol}</span>
                          <span className="text-zinc-400">({stablecoin.name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">XLM to Lock</Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={xlmAmount}
                    onChange={(e) => {
                      setXlmAmount(e.target.value)
                      setError(null)
                      // Calculate estimated stablecoin amount
                      if (e.target.value) {
                        const estimated = (parseFloat(e.target.value) * 0.68).toFixed(2)
                        setStablecoinAmount(estimated)
                      } else {
                        setStablecoinAmount("")
                      }
                    }}
                    className="bg-zinc-800 border-zinc-600 text-white pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    XLM
                  </div>
                </div>
              </div>

              {xlmAmount && (
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <p className="text-sm text-zinc-400 mb-1">Estimated {selectedStablecoin.symbol} to receive:</p>
                  <p className="text-lg font-semibold text-white">
                    {stablecoinAmount} {selectedStablecoin.symbol}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Collateral ratio: ~147% (minimum: 110%)
                  </p>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleMintStablecoin}
                disabled={isLoading || !xlmAmount}
                className="w-full bg-[#a78bfa] hover:bg-[#9333ea] text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Minting...
                  </>
                ) : (
                  `Lock XLM & Mint ${selectedStablecoin.symbol}`
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burn" className="space-y-4">
          <Card className="bg-zinc-900/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Burn Stablecoins & Unlock XLM</CardTitle>
              <CardDescription>
                Burn synthetic stablecoins to unlock your XLM collateral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Stablecoin to Burn</Label>
                <Select
                  value={selectedStablecoin.symbol}
                  onValueChange={(value) => {
                    const stablecoin = FXDAO_STABLECOINS.find(s => s.symbol === value)
                    if (stablecoin) setSelectedStablecoin(stablecoin)
                    setError(null)
                  }}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600">
                    {FXDAO_STABLECOINS.map((stablecoin) => (
                      <SelectItem key={stablecoin.symbol} value={stablecoin.symbol} className="text-white hover:bg-zinc-700">
                        {stablecoin.symbol} ({stablecoin.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Amount to Burn</Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stablecoinAmount}
                    onChange={(e) => {
                      setStablecoinAmount(e.target.value)
                      setError(null)
                    }}
                    className="bg-zinc-800 border-zinc-600 text-white pr-20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    {selectedStablecoin.symbol}
                  </div>
                </div>
                <p className="text-xs text-zinc-400">
                  Available: {positionStats?.mintedUSDx ?? "—"} {selectedStablecoin.symbol}
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleBurnStablecoin}
                disabled={isLoading || !stablecoinAmount}
                className="w-full bg-[#a78bfa] hover:bg-[#9333ea] text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Burning...
                  </>
                ) : (
                  `Burn ${selectedStablecoin.symbol} & Unlock XLM`
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction History */}
      {transactions.length > 0 && (
        <Card className="bg-zinc-900/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <div className="flex items-center gap-3">
                    {tx.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : tx.status === "error" ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
                    )}
                    <div>
                      <p className="text-white text-sm font-medium">
                        {tx.type === "mint" ? "Minted" : "Burned"} {tx.amount} {tx.asset}
                      </p>
                      <p className="text-zinc-400 text-xs">
                        {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {tx.hash && (
                    <a
                      href={`https://stellar.expert/explorer/public/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a78bfa] hover:underline text-xs"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}