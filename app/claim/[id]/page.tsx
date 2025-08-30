"use client"

import type React from "react"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { WalletButton } from "@/components/wallet-button"
import { useDapp } from "@/hooks/use-dapps"
import { useWallet } from "@/hooks/use-wallet"
import { ArrowLeft, Shield, CheckCircle } from "lucide-react"
import { useState } from "react"

interface ClaimPageProps {
  params: Promise<{ id: string }>
}

export default function ClaimPage({ params }: ClaimPageProps) {
  const { id } = use(params)
  const dappId = Number.parseInt(id)

  const { data: dapp, isLoading } = useDapp(dappId)
  const { isConnected } = useWallet()
  const [proof, setProof] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In production, this would call the claimDapp contract function
      // const registry = getRegistry();
      // await registry.claimDapp(dappId, proof);

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to dApp page with success message
      window.location.href = `/dapp/${dappId}?claimed=true`
    } catch (error) {
      console.error("Failed to claim dApp:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-32"></div>
            <div className="h-64 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!dapp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">dApp not found</h1>
          <p className="text-muted-foreground mb-4">The dApp you're trying to claim doesn't exist.</p>
          <Link href="/">
            <Button>Back to Explorer</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (dapp.claimed) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/dapp/${dapp.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to dApp
              </Link>
              <WalletButton />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-2xl font-bold mb-2">Already Claimed</h1>
            <p className="text-muted-foreground mb-6">This dApp has already been claimed by its owner.</p>
            <Link href={`/dapp/${dapp.id}`}>
              <Button>View dApp</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/dapp/${dapp.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to dApp
              </Link>
              <WalletButton />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6">You need to connect your wallet to claim this dApp.</p>
            <WalletButton />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/dapp/${dapp.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to dApp
            </Link>
            <WalletButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 mx-auto mb-4 text-accent" />
            <h1 className="text-3xl font-bold mb-2">Claim Your dApp</h1>
            <p className="text-muted-foreground">
              Prove ownership of <strong>{dapp.metadata?.name || `dApp #${dapp.id}`}</strong> to claim and manage it
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ownership Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-2xl p-4">
                <h3 className="font-semibold mb-2">How to prove ownership:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Deploy a simple verification contract from the same address</li>
                  <li>• Sign a message with the contract owner's private key</li>
                  <li>• Provide transaction hash showing contract deployment</li>
                </ul>
              </div>

              <form onSubmit={handleClaim} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ownership Proof</label>
                  <Input
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    placeholder="Enter transaction hash, signature, or other proof..."
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This will be verified on-chain to confirm ownership
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
                  <p className="text-sm text-yellow-200">
                    <strong>Note:</strong> This is a simplified claim process for the MVP. In production, this would
                    involve more sophisticated ownership verification.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => window.history.back()} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !proof.trim()} className="flex-1">
                    {isSubmitting ? "Verifying..." : "Claim dApp"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
