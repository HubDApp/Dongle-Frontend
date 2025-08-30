import { connect, disconnect } from "get-starknet"
import type { AccountInterface } from "starknet"

export interface WalletState {
  account: AccountInterface | null
  address: string | null
  isConnected: boolean
  isConnecting: boolean
}

class WalletProvider {
  private state: WalletState = {
    account: null,
    address: null,
    isConnected: false,
    isConnecting: false,
  }

  private listeners: ((state: WalletState) => void)[] = []

  subscribe(listener: (state: WalletState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state))
  }

  async connect() {
    try {
      this.state.isConnecting = true
      this.notify()

      const wallet = await connect({ modalMode: "alwaysAsk" })
      if (!wallet) throw new Error("No wallet selected")

      await wallet.enable()
      const account = wallet.account

      this.state = {
        account,
        address: account.address,
        isConnected: true,
        isConnecting: false,
      }

      this.notify()
      return account
    } catch (error) {
      this.state.isConnecting = false
      this.notify()
      throw error
    }
  }

  async disconnect() {
    await disconnect()
    this.state = {
      account: null,
      address: null,
      isConnected: false,
      isConnecting: false,
    }
    this.notify()
  }

  getState() {
    return this.state
  }
}

export const walletProvider = new WalletProvider()
