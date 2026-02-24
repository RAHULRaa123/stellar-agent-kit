"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getNetworkDisplayName, getNetworkMismatchMessage } from "@/lib/network-validation"

interface NetworkMismatchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walletNetwork: string
  appNetwork: string
  onSwitchApp?: () => void
  onDisconnect?: () => void
}

export function NetworkMismatchDialog({
  open,
  onOpenChange,
  walletNetwork,
  appNetwork,
  onSwitchApp,
  onDisconnect,
}: NetworkMismatchDialogProps) {
  const walletDisplay = getNetworkDisplayName(walletNetwork)
  const appDisplay = getNetworkDisplayName(appNetwork)
  const message = getNetworkMismatchMessage(walletNetwork, appNetwork)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Network Mismatch</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>{message}</p>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Wallet:</span>
                <span className="font-medium">{walletDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">App:</span>
                <span className="font-medium">{appDisplay}</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel onClick={onDisconnect}>
            Disconnect Wallet
          </AlertDialogCancel>
          {onSwitchApp && (
            <AlertDialogAction onClick={onSwitchApp}>
              Switch App to {walletDisplay}
            </AlertDialogAction>
          )}
          <AlertDialogAction 
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Switch Wallet to {appDisplay}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}