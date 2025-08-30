import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Dapp, DappMetadata, Category } from "@/types/dapp"

const MOCK_DAPPS: Dapp[] = [
  {
    id: 1,
    primaryContract: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    metadataCid: "QmJediSwap1",
    claimed: true,
    verified: true,
    featured: true,
    metadata: {
      name: "JediSwap",
      category: "DeFi",
      description:
        "100% community-driven, fully permissionless AMM on Starknet with concentrated liquidity and smart routing",
      website: "https://www.jediswap.xyz",
      twitter: "https://twitter.com/jediswap",
      documentation: "https://docs.jediswap.xyz/for-developers/smart-contract-integration",
      github: "https://github.com/jediswaplabs",
    },
  },
  {
    id: 2,
    primaryContract: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    metadataCid: "QmZKX2",
    claimed: true,
    verified: true,
    featured: true,
    metadata: {
      name: "ZKX",
      category: "DeFi",
      description: "Platform for trading perpetual futures with social features, offering OG Trade and STRK Rewards",
      website: "https://zkx.fi",
      twitter: "https://twitter.com/zkxprotocol",
      documentation: "https://zkx.fi/docs",
    },
  },
  {
    id: 3,
    primaryContract: "0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10",
    metadataCid: "QmEkubo3",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Ekubo",
      category: "DeFi",
      description: "Concentrated liquidity AMM providing efficient capital utilization for liquidity providers",
      website: "https://ekubo.org",
      twitter: "https://twitter.com/EkuboProtocol",
      documentation: "https://docs.ekubo.org",
    },
  },
  {
    id: 4,
    primaryContract: "0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
    metadataCid: "QmRealms4",
    claimed: true,
    verified: true,
    featured: true,
    metadata: {
      name: "Realms.World",
      category: "Gaming",
      description: "Fantasy multiverse featuring fully onchain games with strategic gameplay and NFT kingdoms",
      website: "https://realms.world",
      twitter: "https://twitter.com/LootRealms",
      documentation: "https://docs.realms.world",
    },
  },
  {
    id: 5,
    primaryContract: "0x0484c163658bcce5f9916bfbf61b5e9b7d7f6a5f8b8c8d8e8f909192a3b4c5d6",
    metadataCid: "QmMetacube5",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Metacube",
      category: "Gaming",
      description:
        "Free-to-play multiplayer event game with NFT collections including Genesis, Passcards, and Allstars",
      website: "https://metacube.games",
      twitter: "https://twitter.com/metacubegames",
      documentation: "https://docs.metacube.games",
    },
  },
  {
    id: 6,
    primaryContract: "0x05161b8ef2514eb1b4b6d7711ac87c79a1b404d7b131a9c3e9a1b2c3d4e5f6a7",
    metadataCid: "QmInfluence6",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Influence",
      category: "Gaming",
      description: "Open-economy, space strategy MMO where players own all content and shape the universe",
      website: "https://influenceth.io",
      twitter: "https://twitter.com/influenceth",
      documentation: "https://docs.influenceth.io",
    },
  },
  {
    id: 7,
    primaryContract: "0x06b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7",
    metadataCid: "QmLootSurvivor7",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Loot Survivor",
      category: "Gaming",
      description: "Onchain dungeon-crawler game where players battle monsters and collect loot in a persistent world",
      website: "https://lootsurvivor.io",
      twitter: "https://twitter.com/lootsurvivor",
      documentation: "https://docs.lootsurvivor.io",
    },
  },
  {
    id: 8,
    primaryContract: "0x07c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8",
    metadataCid: "QmEndur8",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Endur",
      category: "DeFi",
      description: "Liquid staking protocol enabling users to stake STRK while maintaining liquidity",
      website: "https://endur.fi",
      twitter: "https://twitter.com/endurfi",
      documentation: "https://docs.endur.fi",
    },
  },
  {
    id: 9,
    primaryContract: "0x08d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9",
    metadataCid: "QmNimbora9",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Nimbora",
      category: "DeFi",
      description: "Liquid staking protocol providing yield strategies and liquid staking derivatives",
      website: "https://nimbora.io",
      twitter: "https://twitter.com/Nimbora_",
      documentation: "https://docs.nimbora.io",
    },
  },
  {
    id: 10,
    primaryContract: "0x09e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    metadataCid: "QmUnrug10",
    claimed: true,
    verified: false,
    featured: false,
    metadata: {
      name: "Unrug",
      category: "NFT",
      description: "Memecoin platform for creating and trading community-driven tokens with anti-rug mechanisms",
      website: "https://unrug.fi",
      twitter: "https://twitter.com/unrug_fi",
      documentation: "https://docs.unrug.fi",
    },
  },
  {
    id: 11,
    primaryContract: "0x0af1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1",
    metadataCid: "QmFocusTree11",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Focus Tree",
      category: "Productivity",
      description: "Web3 focus app for growing a virtual garden while staying productive and focused",
      website: "https://focustree.app",
      twitter: "https://twitter.com/focustreeapp",
      documentation: "https://docs.focustree.app",
    },
  },
  {
    id: 12,
    primaryContract: "0x0bf2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    metadataCid: "QmBlobArena12",
    claimed: true,
    verified: true,
    featured: false,
    metadata: {
      name: "Blob Arena",
      category: "Gaming",
      description: "Turn-based battle game featuring 'Blobert' characters with strategic combat mechanics",
      website: "https://blobarena.io",
      twitter: "https://twitter.com/blobarena",
      documentation: "https://docs.blobarena.io",
    },
  },
]

export function useDappList(category?: Category, search?: string) {
  return useQuery({
    queryKey: ["dapps", category, search],
    queryFn: async () => {
      // In production, this would call the contract
      // const registry = getRegistry();
      // const result = await registry.listDapps(0, 100);

      let dapps = MOCK_DAPPS

      if (category) {
        dapps = dapps.filter((dapp) => dapp.metadata?.category === category)
      }

      if (search) {
        const searchLower = search.toLowerCase()
        dapps = dapps.filter(
          (dapp) =>
            dapp.metadata?.name.toLowerCase().includes(searchLower) ||
            dapp.metadata?.description?.toLowerCase().includes(searchLower),
        )
      }

      // Sort: Featured → Verified → Highest Rated → Most Reviewed → Recently Added
      return dapps.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        if (a.verified && !b.verified) return -1
        if (!a.verified && b.verified) return 1
        return b.id - a.id // Recently added
      })
    },
  })
}

export function useDapp(id: number) {
  return useQuery({
    queryKey: ["dapp", id],
    queryFn: async () => {
      // In production, this would call the contract
      // const registry = getRegistry();
      // const result = await registry.getDapp(id);

      return MOCK_DAPPS.find((dapp) => dapp.id === id) || null
    },
  })
}

export function useSubmitDapp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      metadata: DappMetadata
      primaryContract: string
    }) => {
      // Upload metadata to IPFS
      const response = await fetch("/api/ipfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: data.metadata }),
      })

      if (!response.ok) throw new Error("Failed to upload metadata")

      const { cid } = await response.json()

      // In production, this would call the contract
      // const registry = getRegistry();
      // const result = await registry.addDapp(
      //   data.metadata.name,
      //   data.primaryContract,
      //   categoryToU8(data.metadata.category),
      //   cidToFelt(cid)
      // );

      // Mock response
      const newId = Math.max(...MOCK_DAPPS.map((d) => d.id)) + 1
      const newDapp: Dapp = {
        id: newId,
        primaryContract: data.primaryContract,
        metadataCid: cid,
        claimed: false,
        metadata: data.metadata,
      }

      MOCK_DAPPS.push(newDapp)

      return { dappId: newId, txHash: "0xmocktxhash" }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dapps"] })
    },
  })
}
