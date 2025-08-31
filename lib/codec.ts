import type { Category } from "@/types/dapp"

export function cidToFelt(cid: string): string {
  // Convert IPFS CID to felt252 for Starknet
  // This is a simplified implementation - in production you'd use proper encoding
  const bytes = new TextEncoder().encode(cid)
  let felt = "0x"
  for (let i = 0; i < Math.min(bytes.length, 31); i++) {
    felt += bytes[i].toString(16).padStart(2, "0")
  }
  return felt
}

export function feltToCid(felt: string): string {
  // Convert felt252 back to CID
  // This is a simplified implementation
  if (!felt || felt === "0x0") return ""

  const hex = felt.replace("0x", "")
  const bytes = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(Number.parseInt(hex.substr(i, 2), 16))
  }
  return new TextDecoder().decode(new Uint8Array(bytes)).replace(/\0/g, "")
}

export function categoryToU8(category: Category): number {
  const mapping: Record<Category, number> = {
    DeFi: 0,
    NFT: 1,
    Gaming: 2,
    DAO: 3,
    Infra: 4,
    Identity: 5,
    Bridge: 6,
    Wallet: 7,
    Infrastructure: 8,
    Productivity: 9,
  }
  return mapping[category]
}

export function u8ToCategory(n: number): Category {
  const mapping: Record<number, Category> = {
    0: "DeFi",
    1: "NFT",
    2: "Gaming",
    3: "DAO",
    4: "Infra",
  }
  return mapping[n] || "DeFi"
}

export function validateStarknetAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{1,64}$/.test(address)
}

export function truncateAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
