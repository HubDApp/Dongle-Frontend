"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => {
        const starRating = i + 1
        const isFilled = starRating <= rating

        return (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
              interactive && "cursor-pointer hover:text-yellow-400 transition-colors",
            )}
            onClick={() => handleStarClick(starRating)}
          />
        )
      })}
    </div>
  )
}
