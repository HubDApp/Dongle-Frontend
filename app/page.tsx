"use client"

import { useState } from "react"
import { SearchInput } from "@/components/search-input"
import { DappGrid } from "@/components/dapp-grid"
import { Navbar } from "@/components/navbar"
import { useDappList } from "@/hooks/use-dapps"
import { Sparkles, TrendingUp, Users, Zap, Shield, Rocket, Globe, Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [search, setSearch] = useState("")

  const { data: dapps = [], isLoading } = useDappList(undefined, search)

  const featuredDapps = dapps.filter((dapp) => dapp.featured).slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="space-y-16">
          {/* Hero section */}
          <div className="text-center space-y-8 relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-4 left-1/4 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-float" />
            <div
              className="absolute top-8 right-1/3 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            />

            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-balance leading-tight">
                Discover <span className="gradient-text animate-pulse-slow">Onchain</span> dApps
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty mt-6 leading-relaxed">
                Explore the fastest growing ecosystem of decentralized applications built onchain
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <div className="glass-morphism rounded-2xl p-2 w-full max-w-md">
                <SearchInput onSearch={setSearch} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              <div className="glass-morphism rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 animate-glow">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text">10+</div>
                <div className="text-sm text-muted-foreground">dApps</div>
              </div>

              <div className="glass-morphism rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 animate-glow">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text">25K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>

              <div className="glass-morphism rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 animate-glow">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text">$2.5M</div>
                <div className="text-sm text-muted-foreground">TVL</div>
              </div>

              <div className="glass-morphism rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 animate-glow">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text">4.8</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-balance">
                About <span className="gradient-text">Dongle</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Your gateway to the decentralized future. Discover, review, and connect with the best dApps in the
                ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-morphism rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified & Secure</h3>
                <p className="text-muted-foreground text-pretty">
                  All dApps are thoroughly reviewed and verified for security and authenticity before listing.
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl mx-auto mb-6">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation Hub</h3>
                <p className="text-muted-foreground text-pretty">
                  Discover cutting-edge dApps across DeFi, NFTs, Gaming, DAOs, and Infrastructure.
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl mx-auto mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground text-pretty">
                  Built by the community, for the community. Rate, review, and help others discover great dApps.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold font-serif">Featured dApps</h2>
                <p className="text-muted-foreground mt-2">Handpicked applications from our community</p>
              </div>
              <Link href="/categories">
                <Button variant="outline" className="gradient-border bg-transparent">
                  View All Categories
                </Button>
              </Link>
            </div>
            <DappGrid dapps={featuredDapps} isLoading={isLoading} />
          </section>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-xl mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold gradient-text font-serif">Dongle</span>
              </div>
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
            <p className="text-sm text-muted-foreground">© 2024 Dongle. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">Built with ❤️ for the decentralized future</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
