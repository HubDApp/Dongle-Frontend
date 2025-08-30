"use client"

import type { Dapp } from "@/types/dapp"
import { DappCard } from "@/components/dapp-card"

interface DappGridProps {
  dapps: Dapp[]
  isLoading?: boolean
}

export function DappGrid({ dapps, isLoading }: DappGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (dapps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <div className="h-24 w-24 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">No dApps found</h3>
          <p className="text-muted-foreground mb-4">Be the first to submit a dApp to the directory!</p>
          <a
            href="/submit"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Submit dApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dapps.map((dapp) => (
        <DappCard key={dapp.id} dapp={dapp} />
      ))}
    </div>
  )
}
