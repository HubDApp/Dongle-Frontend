"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WalletButton } from "@/components/wallet-button"
import { useSubmitDapp } from "@/hooks/use-dapps"
import { useWallet } from "@/hooks/use-wallet"
import type { Category, DappMetadata } from "@/types/dapp"
import { validateStarknetAddress } from "@/lib/codec"
import { ArrowLeft, Upload } from "lucide-react"

const CATEGORIES: Category[] = ["DeFi", "NFT", "Gaming", "DAO", "Infra"]

export default function SubmitPage() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const submitDapp = useSubmitDapp()

  const [formData, setFormData] = useState({
    name: "",
    category: "" as Category,
    primaryContract: "",
    website: "",
    twitter: "",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.length > 40) {
      newErrors.name = "Name must be 40 characters or less"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.primaryContract.trim()) {
      newErrors.primaryContract = "Primary contract address is required"
    } else if (!validateStarknetAddress(formData.primaryContract)) {
      newErrors.primaryContract = "Invalid Starknet address"
    }

    if (formData.description.length > 800) {
      newErrors.description = "Description must be 800 characters or less"
    }

    if (formData.website && !formData.website.startsWith("http")) {
      newErrors.website = "Website must be a valid URL"
    }

    if (formData.twitter && !formData.twitter.startsWith("http")) {
      newErrors.twitter = "Twitter must be a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      alert("Please connect your wallet to submit a dApp")
      return
    }

    if (!validateForm()) return

    const metadata: DappMetadata = {
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim() || undefined,
      website: formData.website.trim() || undefined,
      twitter: formData.twitter.trim() || undefined,
    }

    try {
      const result = await submitDapp.mutateAsync({
        metadata,
        primaryContract: formData.primaryContract.trim(),
      })

      // Show success and redirect
      router.push(`/dapp/${result.dappId}?submitted=true`)
    } catch (error) {
      console.error("Failed to submit dApp:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Explorer
            </Link>
            <WalletButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit a dApp</h1>
            <p className="text-muted-foreground">Add your dApp to the onchain directory and reach more users</p>
          </div>

          {!isConnected && (
            <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Connect your wallet to submit your dApp to the directory
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>dApp Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="My Awesome dApp"
                      maxLength={40}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: Category) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Primary Contract Address *</label>
                  <Input
                    value={formData.primaryContract}
                    onChange={(e) => setFormData((prev) => ({ ...prev, primaryContract: e.target.value }))}
                    placeholder="0x..."
                  />
                  {errors.primaryContract && <p className="text-sm text-destructive mt-1">{errors.primaryContract}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="https://mydapp.com"
                    />
                    {errors.website && <p className="text-sm text-destructive mt-1">{errors.website}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter</label>
                    <Input
                      value={formData.twitter}
                      onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://twitter.com/mydapp"
                    />
                    {errors.twitter && <p className="text-sm text-destructive mt-1">{errors.twitter}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your dApp and what makes it special..."
                    maxLength={800}
                    rows={4}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-muted-foreground">{formData.description.length}/800 characters</div>
                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                  </div>
                </div>

                <div className="border-2 border-dashed border-muted rounded-2xl p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Logo and screenshots upload coming soon</p>
                  <p className="text-xs text-muted-foreground">For now, you can add these after claiming your dApp</p>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitDapp.isPending} className="flex-1">
                    {submitDapp.isPending ? "Submitting..." : "Submit dApp"}
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
