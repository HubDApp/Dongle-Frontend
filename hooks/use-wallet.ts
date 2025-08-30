"use client"

import { useState, useEffect } from "react"
import { walletProvider, type WalletState } from "@/lib/wallet-provider"

export function useWallet() {
  const [state, setState] = useState<WalletState>(walletProvider.getState())

  useEffect(() => {
    const unsubscribe = walletProvider.subscribe(setState)
    return unsubscribe
  }, [])

  const connect = async () => {
    try {
      await walletProvider.connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    }
  }

  const disconnect = async () => {
    try {
      await walletProvider.disconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      throw error
    }
  }

  return {
    ...state,
    connect,
    disconnect,
  }
}
