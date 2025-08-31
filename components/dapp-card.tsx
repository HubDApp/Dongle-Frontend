"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CidImage } from "@/components/cid-image"
import { RatingStars } from "@/components/rating-stars"
import { VerifiedBadge, FeaturedTag } from "@/components/status-badges"
import type { Dapp } from "@/types/dapp"
import { useRatingSummary } from "@/hooks/use-reviews"
import { ExternalLink, TrendingUp, Users, Eye } from "lucide-react"

interface DappCardProps {
  dapp: Dapp
}

export function DappCard({ dapp }: DappCardProps) {
  const { data: ratingSummary } = useRatingSummary(dapp.id)

  return (
    <div className="animate-fade-in-up">
      <Card className="group cursor-pointer glass-morphism gradient-border hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden relative hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="relative">
              <CidImage
                cid={dapp.metadata?.logo}
                alt={dapp.metadata?.name || "dApp logo"}
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl object-cover"
      
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col gap-2">
              {dapp.featured && <FeaturedTag />}
              {dapp.verified && <VerifiedBadge />}
              <div className="flex items-center gap-1 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <TrendingUp className="h-3 w-3" />
                Hot
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 relative z-10">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 font-serif">
                {dapp.metadata?.name || `dApp #${dapp.id}`}
              </h3>
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-muted to-muted/80 px-3 py-1.5 text-xs font-semibold mt-2 border border-border/50">
                {dapp.metadata?.category || "Unknown"}
              </div>
            </div>

            {ratingSummary && ratingSummary.count > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RatingStars rating={ratingSummary.avg} size="sm" />
                  <span className="text-sm font-medium text-foreground">{ratingSummary.avg.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {ratingSummary.count} reviews
                </div>
              </div>
            )}

            {dapp.metadata?.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{dapp.metadata.description}</p>
            )}

            <div className="flex items-center justify-between pt-2">
              <Link href={`/dapp/${dapp.id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View dApp
                </Button>
              </Link>
              <div className="flex items-center gap-1 text-xs text-primary font-medium ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ExternalLink className="h-3 w-3" />
                Explore
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
