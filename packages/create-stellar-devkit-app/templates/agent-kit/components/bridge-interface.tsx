"use client";

import { useState } from "react";
import { useAccount } from "@/hooks/use-account";
import { Link2, ExternalLink, ArrowRight } from "lucide-react";
import { ConnectButton } from "./connect-button";
import { toast } from "sonner";
import { signTransaction } from "@stellar/freighter-api";
import { Networks } from "@stellar/stellar-sdk";

const SUPPORTED_CHAINS = [
  { id: "stellar", name: "Stellar", symbol: "XLM" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "bsc", name: "BSC", symbol: "BNB" },
  { id: "polygon", name: "Polygon", symbol: "MATIC" },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX" },
  { id: "fantom", name: "Fantom", symbol: "FTM" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "tron", name: "Tron", symbol: "TRX" },
];

const SUPPORTED_ASSETS = [
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "USDT", name: "Tether USD" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "BTC", name: "Bitcoin" },
];

export function BridgeInterface() {
  const { account } = useAccount();
  const [fromChain, setFromChain] = useState("stellar");
  const [toChain, setToChain] = useState("ethereum");
  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBridge = async () => {
    if (!account?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!toAddress) {
      toast.error("Please enter destination address");
      return;
    }

    if (fromChain === toChain) {
      toast.error("Please select different source and destination chains");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Build the bridge transaction
      const buildResponse = await fetch("/api/bridge/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromChain,
          toChain,
          asset,
          amount,
          fromAddress: account.address,
          toAddress,
        }),
      });

      const buildResult = await buildResponse.json();

      if (!buildResponse.ok) {
        throw new Error(buildResult.error || "Failed to build bridge transaction");
      }

      // Step 2: Sign with Freighter
      const networkPassphrase = Networks.PUBLIC;
      const signResult = await signTransaction(buildResult.xdr, { networkPassphrase });
      
      if (signResult.error) {
        if (signResult.error.message?.toLowerCase().includes("rejected") || 
            signResult.error.message?.toLowerCase().includes("denied")) {
          toast.info("Bridge transaction cancelled");
          return;
        }
        throw new Error(signResult.error.message || "Failed to sign transaction");
      }

      // Step 3: Submit the signed transaction
      const submitResponse = await fetch("/api/bridge/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signedXdr: signResult.signedTxXdr,
        }),
      });

      const submitResult = await submitResponse.json();

      if (!submitResponse.ok) {
        throw new Error(submitResult.error || "Failed to submit transaction");
      }

      toast.success(`Successfully bridged ${amount} ${asset}!`, {
        description: `From ${buildResult.sourceChain} to ${buildResult.destChain}. Hash: ${submitResult.hash}`,
        action: {
          label: "View on Stellar Expert",
          onClick: () => window.open(`https://stellar.expert/explorer/public/tx/${submitResult.hash}`, "_blank"),
        },
      });

      // Reset form
      setAmount("");
      setToAddress("");
      
    } catch (error) {
      console.error("Bridge error:", error);
      const message = error instanceof Error ? error.message : "Failed to initiate bridge transaction";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
      <div className="mb-6 flex items-center gap-2">
        <Link2 className="h-6 w-6 text-[#a78bfa]" />
        <h3 className="text-xl font-medium text-white">Allbridge Core</h3>
      </div>

      {!account?.address ? (
        <div className="text-center py-8">
          <p className="mb-4 text-zinc-400">Connect your wallet to bridge assets cross-chain</p>
          <ConnectButton />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Chain Selection */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">From</label>
              <select
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-[#5100fd] focus:outline-none"
              >
                {SUPPORTED_CHAINS.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name} ({chain.symbol})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="button"
              onClick={swapChains}
              className="mt-6 rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">To</label>
              <select
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-[#5100fd] focus:outline-none"
              >
                {SUPPORTED_CHAINS.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name} ({chain.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Asset Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Asset</label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-[#5100fd] focus:outline-none"
            >
              {SUPPORTED_ASSETS.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.symbol} - {asset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-[#5100fd] focus:outline-none"
            />
          </div>

          {/* Destination Address */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Destination Address ({SUPPORTED_CHAINS.find(c => c.id === toChain)?.name})
            </label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="Enter destination address"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-[#5100fd] focus:outline-none"
            />
          </div>

          {/* Bridge Button */}
          <button
            type="button"
            onClick={handleBridge}
            disabled={loading || !amount || !toAddress || fromChain === toChain}
            className="w-full rounded-xl bg-[#5100fd] py-3 font-medium text-white transition-colors hover:bg-[#6610ff] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Bridging..." : `Bridge ${asset}`}
          </button>

          {/* Info */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
            <p className="text-sm text-zinc-400 mb-2">
              Cross-chain bridge powered by Allbridge Core. Connect 10+ networks including Ethereum, BSC, Polygon, Solana, and more.
            </p>
            <a
              href="https://docs-core.allbridge.io/sdk/guides/stellar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#a78bfa] hover:underline"
            >
              SDK Documentation <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}