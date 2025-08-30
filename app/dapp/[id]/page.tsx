"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CidImage } from "@/components/cid-image"
import { RatingStars } from "@/components/rating-stars"
import { VerifiedBadge, FeaturedTag } from "@/components/status-badges"
import { ReviewForm } from "@/components/review-form"
import { ReviewList } from "@/components/review-list"
import { WalletButton } from "@/components/wallet-button"
import { useDapp } from "@/hooks/use-dapps"
import { useRatingSummary } from "@/hooks/use-reviews"
import { useWallet } from "@/hooks/use-wallet"
import {
  ArrowLeft,
  ExternalLink,
  Twitter,
  Activity,
  Download,
  Shield,
  Users,
  Globe,
  Code,
  Star,
  Zap,
  BookOpen,
  Github,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"
import { truncateAddress } from "@/lib/codec"

interface DappPageProps {
  params: Promise<{ id: string }>
}

export default function DappPage({ params }: DappPageProps) {
  const { id } = use(params)
  const dappId = Number.parseInt(id)

  const { data: dapp, isLoading } = useDapp(dappId)
  const { data: ratingSummary } = useRatingSummary(dappId)
  const { isConnected, address } = useWallet()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-32"></div>
            <div className="h-64 bg-muted rounded-2xl"></div>
            <div className="h-32 bg-muted rounded-2xl"></div>
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
          <p className="text-muted-foreground mb-4">The dApp you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Explorer</Button>
          </Link>
        </div>
      </div>
    )
  }

  const voyagerUrl = `${process.env.NEXT_PUBLIC_VOYAGER_BASE}/contract/${dapp.primaryContract}`
  const isOwner = isConnected && address && dapp.claimed

  const mockStats = {
    users: "12.5K",
    transactions: "2.1M",
    tvl: "$45.2M",
    version: "2.1.4",
    size: "2.3 MB",
    lastUpdated: "2 days ago",
    developer: "Onchain Labs",
    compatibility: ["Argent X", "Braavos"],
    security: "Audited by OpenZeppelin",
  }

  const mockScreenshots = ["/dapp-dashboard-interface.png", "/trading-interface-with-charts.png", "/wallet-connection-screen.png"]

  const mockFeatures = [
    { icon: Zap, title: "Lightning Fast", description: "Sub-second transaction finality" },
    { icon: Shield, title: "Secure", description: "Audited smart contracts" },
    { icon: Users, title: "Community Driven", description: "Governed by token holders" },
    { icon: Globe, title: "Cross-Chain", description: "Multi-chain compatibility" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-40 bg-background/80">
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
        <div className="space-y-8">
          {/* Hero Section */}
          <Card className="glass-morphism gradient-border overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side - App info */}
                <div className="flex-1 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative">
                      <CidImage
                        cid={dapp.metadata?.logo}
                        alt={dapp.metadata?.name || "dApp logo"}
                        width={120}
                        height={120}
                        className="h-30 w-30 rounded-3xl shadow-2xl"
                      />
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-start gap-3">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {dapp.metadata?.name || `dApp #${dapp.id}`}
                        </h1>
                        {dapp.featured && <FeaturedTag />}
                        {dapp.verified && <VerifiedBadge />}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="secondary" className="text-sm font-semibold">
                          {dapp.metadata?.category || "Unknown"}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          v{mockStats.version}
                        </Badge>
                        <Badge variant="outline" className="text-sm text-green-600">
                          <Shield className="h-3 w-3 mr-1" />
                          {mockStats.security}
                        </Badge>
                      </div>

                      {ratingSummary && ratingSummary.count > 0 && (
                        <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-xl border">
                          <div className="flex items-center gap-3">
                            <RatingStars rating={ratingSummary.avg} size="lg" />
                            <div>
                              <div className="text-3xl font-bold">{ratingSummary.avg.toFixed(1)}</div>
                              <div className="text-sm text-muted-foreground">out of 5</div>
                            </div>
                          </div>
                          <div className="border-l pl-6">
                            <div className="text-2xl font-bold text-primary">{ratingSummary.count}</div>
                            <div className="text-sm text-muted-foreground">reviews</div>
                          </div>
                          <div className="border-l pl-6">
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="font-semibold">Trending</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Popular this week</div>
                          </div>
                        </div>
                      )}

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {dapp.metadata?.description || "No description available."}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          <Download className="h-5 w-5 mr-2" />
                          Connect Wallet
                        </Button>

                        {dapp.metadata?.documentation && (
                          <Button variant="outline" size="lg" asChild>
                            <a href={dapp.metadata.documentation} target="_blank" rel="noopener noreferrer">
                              <BookOpen className="h-5 w-5 mr-2" />
                              Explore Project
                            </a>
                          </Button>
                        )}

                        {dapp.metadata?.website && (
                          <Button variant="outline" size="lg" asChild>
                            <a href={dapp.metadata.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-5 w-5 mr-2" />
                              Visit Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Enhanced stats */}
                <div className="lg:w-80">
                  <Card className="bg-muted/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{mockStats.users}</div>
                          <div className="text-sm text-muted-foreground">Active Users</div>
                        </div>
                        <div className="text-center p-3 bg-secondary/10 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{mockStats.transactions}</div>
                          <div className="text-sm text-muted-foreground">Transactions</div>
                        </div>
                      </div>

                      <div className="text-center pt-2 border-t">
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {mockStats.tvl}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Value Locked</div>
                        <div className="flex items-center justify-center gap-1 mt-1 text-green-600 text-sm">
                          <TrendingUp className="h-3 w-3" />
                          +12.5% this week
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size</span>
                          <span>{mockStats.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Updated</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {mockStats.lastUpdated}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Developer</span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-primary" />
                            {mockStats.developer}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Screenshots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Screenshots & Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockScreenshots.map((screenshot, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center pb-4">
                      <Button size="sm" variant="secondary">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Size
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <feature.icon className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Reviews & Ratings
                    </CardTitle>
                    <ReviewForm dappId={dapp.id} />
                  </div>
                </CardHeader>
                <CardContent>
                  <ReviewList dappId={dapp.id} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <Badge variant="secondary">{dapp.metadata?.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Version</span>
                      <span className="text-sm font-medium">{mockStats.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Size</span>
                      <span className="text-sm font-medium">{mockStats.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Updated</span>
                      <span className="text-sm font-medium">{mockStats.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Wallet Compatibility</div>
                    <div className="flex flex-wrap gap-2">
                      {mockStats.compatibility.map((wallet) => (
                        <Badge key={wallet} variant="outline" className="text-xs">
                          {wallet}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Contract</div>
                    <div className="text-xs font-mono bg-muted p-2 rounded">
                      {truncateAddress(dapp.primaryContract)}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" asChild>
                      <a href={voyagerUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Voyager
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Developer */}
              <Card>
                <CardHeader>
                  <CardTitle>Developer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {mockStats.developer.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{mockStats.developer}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Award className="h-3 w-3 text-primary" />
                        Verified Developer
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {dapp.metadata?.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={dapp.metadata.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {dapp.metadata?.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={dapp.metadata.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {dapp.metadata?.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={dapp.metadata.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {dapp.metadata?.documentation && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={dapp.metadata.documentation} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">New version deployed</span>
                      <span className="text-xs text-muted-foreground ml-auto">2d ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">Security audit completed</span>
                      <span className="text-xs text-muted-foreground ml-auto">1w ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <span className="text-muted-foreground">Featured on homepage</span>
                      <span className="text-xs text-muted-foreground ml-auto">2w ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claim/Edit actions */}
              {!dapp.claimed && (
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">Is this your dApp?</p>
                      <Link href={`/claim/${dapp.id}`}>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary">Claim this dApp</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isOwner && (
                <Card>
                  <CardContent className="p-4">
                    <Button variant="outline" className="w-full bg-transparent">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
