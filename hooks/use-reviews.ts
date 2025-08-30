import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Review } from "@/types/dapp"

// Mock data for development
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    dappId: 1,
    reviewer: "0x1234567890abcdef",
    stars: 5,
    createdAt: Date.now() - 86400000,
    content: "Amazing DEX with great liquidity and low fees!",
  },
  {
    id: "2",
    dappId: 1,
    reviewer: "0xabcdef1234567890",
    stars: 4,
    createdAt: Date.now() - 172800000,
    content: "Good platform, could use better UI/UX",
  },
]

export function useReviews(dappId: number) {
  return useQuery({
    queryKey: ["reviews", dappId],
    queryFn: async () => {
      // In production, this would call the contract
      // const ratings = getRatings();
      // const result = await ratings.listReviews(dappId, 0, 100);

      return MOCK_REVIEWS.filter((review) => review.dappId === dappId)
    },
  })
}

export function useRatingSummary(dappId: number) {
  return useQuery({
    queryKey: ["rating-summary", dappId],
    queryFn: async () => {
      // In production, this would call the contract
      // const ratings = getRatings();
      // const result = await ratings.getAverage(dappId);

      const reviews = MOCK_REVIEWS.filter((review) => review.dappId === dappId)
      if (reviews.length === 0) {
        return { dappId, avg: 0, count: 0 }
      }

      const avg = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length
      return { dappId, avg, count: reviews.length }
    },
  })
}

export function useSubmitReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      dappId: number
      stars: 1 | 2 | 3 | 4 | 5
      content?: string
    }) => {
      let reviewCid = ""

      if (data.content) {
        // Upload review content to IPFS
        const response = await fetch("/api/ipfs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: data.content }),
        })

        if (!response.ok) throw new Error("Failed to upload review")

        const result = await response.json()
        reviewCid = result.cid
      }

      // In production, this would call the contract
      // const ratings = getRatings();
      // const result = await ratings.addReview(data.dappId, data.stars, cidToFelt(reviewCid));

      // Mock response
      const newReview: Review = {
        id: String(Date.now()),
        dappId: data.dappId,
        reviewer: "0x1234567890abcdef", // Would be actual wallet address
        stars: data.stars,
        reviewCid,
        createdAt: Date.now(),
        content: data.content,
      }

      MOCK_REVIEWS.push(newReview)

      return { reviewId: newReview.id, txHash: "0xmocktxhash" }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.dappId] })
      queryClient.invalidateQueries({ queryKey: ["rating-summary", variables.dappId] })
    },
  })
}
