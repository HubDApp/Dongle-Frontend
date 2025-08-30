"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { truncateAddress } from "@/lib/codec"
import { Wallet, LogOut } from "lucide-react"

export function WalletButton() {
  const { isConnected, address, isConnecting, connect, disconnect } = useWallet()

  if (isConnected && address) {
    return (
      <Button variant="outline" onClick={disconnect} className="gap-2 bg-transparent">
        <Wallet className="h-4 w-4" />
        {truncateAddress(address)}
        <LogOut className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button onClick={connect} disabled={isConnecting} className="gap-2">
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
