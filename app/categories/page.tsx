"use client"

import { useState } from "react"
import { SearchInput } from "@/components/search-input"
import { CategoryFilter } from "@/components/category-filter"
import { DappGrid } from "@/components/dapp-grid"
import { Navbar } from "@/components/navbar"
import { useDappList } from "@/hooks/use-dapps"
import type { Category } from "@/types/dapp"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpDown, Star, TrendingUp, Clock, Verified, Github, Twitter, Mail } from "lucide-react"

type SortOption = "name" | "rating" | "newest" | "featured" | "verified"

export default function CategoriesPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>()
  const [sortBy, setSortBy] = useState<SortOption>("featured")

  const { data: dapps = [], isLoading } = useDappList(selectedCategory, search)

  const sortedDapps = [...dapps].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.metadata?.name || "").localeCompare(b.metadata?.name || "")
      case "rating":
        // This would need actual rating data - placeholder logic
        return 0
      case "newest":
        return b.id - a.id
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      case "verified":
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance">
              Browse <span className="gradient-text">Categories</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover dApps organized by category and find exactly what you're looking for
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="glass-morphism rounded-2xl p-2 w-full max-w-md">
                <SearchInput onSearch={setSearch} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex justify-center lg:justify-start">
                <div className="glass-morphism rounded-2xl p-2">
                  <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <div className="flex gap-1">
                  <Button
                    variant={sortBy === "featured" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("featured")}
                    className="text-xs"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Button>
                  <Button
                    variant={sortBy === "newest" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("newest")}
                    className="text-xs"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Newest
                  </Button>
                  <Button
                    variant={sortBy === "rating" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("rating")}
                    className="text-xs"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Rating
                  </Button>
                  <Button
                    variant={sortBy === "verified" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("verified")}
                    className="text-xs"
                  >
                    <Verified className="h-3 w-3 mr-1" />
                    Verified
                  </Button>
                  <Button
                    variant={sortBy === "name" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("name")}
                    className="text-xs"
                  >
                    A-Z
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          {!isLoading && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Showing {sortedDapps.length} dApp{sortedDapps.length !== 1 ? "s" : ""}
                {selectedCategory && ` in ${selectedCategory}`}
                {search && ` matching "${search}"`}
              </p>
            </div>
          )}

          {/* dApp grid */}
          <DappGrid dapps={sortedDapps} isLoading={isLoading} />
        </div>
      </main>
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-xl mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
               <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg overflow-hidden">
                <img src="/dongle-logo.png" alt="Dongle" className="h-full w-full object-cover" />
              </div>
              <span className="text-xl font-bold gradient-text font-serif">Dongle</span>
            </Link>
              <p className="text-sm text-muted-foreground text-pretty">
                Your gateway to the decentralized future. Discover and connect with the best dApps.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Explore</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="/categories"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
                <Link href="/reviews" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Reviews
                </Link>
                <Link href="/submit" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Submit dApp
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Categories</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="/categories?category=DeFi"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  DeFi
                </Link>
                <Link
                  href="/categories?category=NFT"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  NFT
                </Link>
                <Link
                  href="/categories?category=Gaming"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gaming
                </Link>
                <Link
                  href="/categories?category=DAO"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  DAO
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 Dongle. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">Built with ❤️ for the decentralized future</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
