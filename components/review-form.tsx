"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RatingStars } from "@/components/rating-stars"
import { useSubmitReview } from "@/hooks/use-reviews"
import { useWallet } from "@/hooks/use-wallet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"

interface ReviewFormProps {
  dappId: number
}

export function ReviewForm({ dappId }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [stars, setStars] = useState<number>(0)
  const [content, setContent] = useState("")
  const { isConnected } = useWallet()
  const submitReview = useSubmitReview()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (stars === 0) return

    try {
      await submitReview.mutateAsync({
        dappId,
        stars: stars as 1 | 2 | 3 | 4 | 5,
        content: content.trim() || undefined,
      })

      setStars(0)
      setContent("")
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to submit review:", error)
    }
  }

  if (!isConnected) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Leave a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <RatingStars rating={stars} interactive onRatingChange={setStars} size="lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Review (optional)</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience with this dApp..."
              maxLength={500}
              rows={4}
            />
            <div className="text-xs text-muted-foreground mt-1">{content.length}/500 characters</div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={stars === 0 || submitReview.isPending}>
              {submitReview.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
