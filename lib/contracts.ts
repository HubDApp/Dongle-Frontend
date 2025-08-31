import { Contract, RpcProvider } from "starknet"
import { walletProvider } from "./wallet-provider"
import { CONTRACTS } from "@/contracts/config"
import { REGISTRY_ABI } from "@/contracts/abis/registry"
import { RATINGS_ABI } from "@/contracts/abis/ratings"
import { VERIFICATION_REGISTRY_ABI } from "@/contracts/abis/verification-registry"
import { FEE_MANAGER_ABI } from "@/contracts/abis/fee-manager"

export function getProvider() {
  return new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
  })
}

export function getRegistry() {
  const { account } = walletProvider.getState()
  const provider = account || getProvider()

  return new Contract(REGISTRY_ABI, CONTRACTS.REGISTRY, provider)
}

export function getRatings() {
  const { account } = walletProvider.getState()
  const provider = account || getProvider()

  return new Contract(RATINGS_ABI, CONTRACTS.RATINGS, provider)
}

export function getVerificationRegistry() {
  const { account } = walletProvider.getState()
  const provider = account || getProvider()

  return new Contract(VERIFICATION_REGISTRY_ABI, CONTRACTS.VERIFICATION_REGISTRY, provider)
}

export function getFeeManager() {
  const { account } = walletProvider.getState()
  const provider = account || getProvider()

  return new Contract(FEE_MANAGER_ABI, CONTRACTS.FEE_MANAGER, provider)
}
