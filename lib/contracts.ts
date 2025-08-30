import { Contract, RpcProvider } from "starknet"
import { walletProvider } from "./wallet-provider"

// Mock ABIs - in production these would be imported from contract artifacts
const REGISTRY_ABI = [
  {
    name: "addDapp",
    type: "function",
    inputs: [
      { name: "name", type: "felt252" },
      { name: "primary_contract", type: "felt252" },
      { name: "category", type: "u8" },
      { name: "metadata_cid", type: "felt252" },
    ],
    outputs: [{ name: "dapp_id", type: "u32" }],
  },
  {
    name: "getDapp",
    type: "function",
    inputs: [{ name: "dapp_id", type: "u32" }],
    outputs: [
      { name: "primary_contract", type: "felt252" },
      { name: "metadata_cid", type: "felt252" },
      { name: "claimed", type: "bool" },
    ],
  },
  {
    name: "listDapps",
    type: "function",
    inputs: [
      { name: "offset", type: "u32" },
      { name: "limit", type: "u32" },
    ],
    outputs: [{ name: "dapps", type: "Array<u32>" }],
  },
]

const RATINGS_ABI = [
  {
    name: "addReview",
    type: "function",
    inputs: [
      { name: "dapp_id", type: "u32" },
      { name: "stars", type: "u8" },
      { name: "review_cid", type: "felt252" },
    ],
    outputs: [{ name: "review_id", type: "u32" }],
  },
  {
    name: "getAverage",
    type: "function",
    inputs: [{ name: "dapp_id", type: "u32" }],
    outputs: [
      { name: "avg_times_100", type: "u16" },
      { name: "count", type: "u32" },
    ],
  },
]

export function getProvider() {
  return new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
  })
}

export function getRegistry() {
  const { account } = walletProvider.getState()
  const provider = account || getProvider()

  return new Contract(REGISTRY_ABI, process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || "0xREGISTRY", provider)
}

export function getRatings() {
  const { account } = walletProvider.getState()
  const provider = account || getProvider()

  return new Contract(RATINGS_ABI, process.env.NEXT_PUBLIC_RATINGS_ADDRESS || "0xRATINGS", provider)
}
