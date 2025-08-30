"use client"

import { useReviews } from "@/hooks/use-reviews"
import { RatingStars } from "@/components/rating-stars"
import { truncateAddress } from "@/lib/codec"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface ReviewListProps {
  dappId: number
}

export function ReviewList({ dappId }: ReviewListProps) {
  const { data: reviews, isLoading } = useReviews(dappId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <RatingStars rating={review.stars} size="sm" />
                <span className="text-sm font-medium">{truncateAddress(review.reviewer)}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </span>
            </div>
            {review.content && <p className="text-sm text-muted-foreground">{review.content}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
