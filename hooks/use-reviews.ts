import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Review } from "@/types/dapp"
import { getRatings } from "@/lib/contracts"
import { cidToFelt } from "@/lib/codec"

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
      try {
        // Try to call the actual contract
        const ratings = getRatings()
        const result = await ratings.listReviews(dappId, 0, 100)
        
        // Convert contract result to Review objects
        // This is a simplified conversion - you'll need to implement the full logic
        const reviews = result.reviews.map((review: any) => ({
          id: review.review_id.toString(),
          dappId: dappId,
          reviewer: review.reviewer,
          stars: review.stars,
          reviewCid: review.review_cid,
          createdAt: Date.now(), // Get from contract if available
          content: "", // Get from IPFS using reviewCid
        }))
        
        return reviews
      } catch (error) {
        console.warn("Contract call failed, using mock data:", error)
        
        // Fallback to mock data
        return MOCK_REVIEWS.filter((review) => review.dappId === dappId)
      }
    },
  })
}

export function useRatingSummary(dappId: number) {
  return useQuery({
    queryKey: ["rating-summary", dappId],
    queryFn: async () => {
      try {
        // Try to call the actual contract
        const ratings = getRatings()
        const result = await ratings.getAverage(dappId)
        
        // Convert contract result
        return { 
          dappId, 
          avg: result.avg_times_100 / 100, // Convert from times 100 format
          count: result.count 
        }
      } catch (error) {
        console.warn("Contract call failed, using mock data:", error)
        
        // Fallback to mock data
        const reviews = MOCK_REVIEWS.filter((review) => review.dappId === dappId)
        if (reviews.length === 0) {
          return { dappId, avg: 0, count: 0 }
        }

        const avg = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length
        return { dappId, avg, count: reviews.length }
      }
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

      try {
        // Try to call the actual contract
        const ratings = getRatings()
        const result = await ratings.addReview(data.dappId, data.stars, cidToFelt(reviewCid))

        return { reviewId: result.review_id.toString(), txHash: "0x..." }
      } catch (error) {
        console.warn("Contract call failed, using mock data:", error)
        
        // Fallback to mock data
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
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.dappId] })
      queryClient.invalidateQueries({ queryKey: ["rating-summary", variables.dappId] })
    },
  })
}
