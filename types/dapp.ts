export type Category =
  | "DeFi"
  | "NFT"
  | "Gaming"
  | "DAO"
  | "Infra"
  | "Identity"
  | "Bridge"
  | "Wallet"
  | "Infrastructure"
  | "Productivity"

export interface DappMetadata {
  name: string
  category: Category
  website?: string
  twitter?: string
  description?: string
  logo?: string // ipfs://
  screenshots?: string[] // ipfs://[]
  documentation?: string
  github?: string
}

export interface Dapp {
  id: number
  primaryContract: string
  metadataCid: string
  claimed: boolean
  verified?: boolean
  featured?: boolean
  metadata?: DappMetadata
}

export interface Review {
  id: string
  dappId: number
  reviewer: string
  stars: 1 | 2 | 3 | 4 | 5
  reviewCid?: string
  createdAt: number
  content?: string
}

export interface RatingSummary {
  dappId: number
  avg: number
  count: number
}

export interface WalletConnection {
  address: string
  isConnected: boolean
}
