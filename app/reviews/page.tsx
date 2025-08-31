"use client"

import React, { useState } from 'react';
import { Star, Send, Heart, MessageCircle, ThumbsUp } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {  Github, Twitter, Mail } from "lucide-react"

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'CryptoEnthusiast',
      avatar: '🚀',
      rating: 5,
      comment: 'Amazing DApp! The interface is super intuitive and transactions are lightning fast.',
      timestamp: '2 hours ago',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      user: 'Web3Builder',
      avatar: '⚡',
      rating: 4,
      comment: 'Great functionality overall. Could use some improvements in the mobile experience.',
      timestamp: '1 day ago',
      likes: 8,
      isLiked: true
    },
    {
      id: 3,
      user: 'DeFiMaster',
      avatar: '💎',
      rating: 5,
      comment: 'This is the future of decentralized applications. Seamless user experience!',
      timestamp: '3 days ago',
      likes: 23,
      isLiked: false
    }
  ]);

  const handleSubmitReview = () => {
    if (comment.trim() && rating > 0) {
      const newReview = {
        id: reviews.length + 1,
        user: 'You',
        avatar: '👤',
        rating,
        comment,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      };
      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(0);
    }
  };

  const toggleLike = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id 
        ? { 
            ...review, 
            likes: review.isLiked ? review.likes - 1 : review.likes + 1,
            isLiked: !review.isLiked 
          }
        : review
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
           <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Reviews</h1>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Welcome to the Dongle review page! Share your thoughts and experiences with our onchain dApp explorer platform. 
            Help fellow users discover the best decentralized applications by leaving honest reviews and ratings.
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
            <span>({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Write Review Section */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700">
          <h2 className="text-xl font-semibold mb-6 text-white">Write a Review</h2>
          
          {/* Rating and Star */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 mb-3 text-sm">Rate this dApp</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-all duration-200"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setIsStarred(!isStarred)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg gradient-border bg-transparent ${
                isStarred
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'bg-slate-700 text-gray-300 border border-slate-600 hover:bg-slate-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
              <span className="text-sm">{isStarred ? 'Starred' : 'Star dApp'}</span>
            </button>
          </div>

          {/* Comment Input */}
          <div className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this dApp..."
              className="w-full h-24 bg-slate-700 border border-slate-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmitReview}
            disabled={!comment.trim() || rating === 0}
            className="gradient-bg-animated text-white hover:opacity-90 transition-opacity font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{review.user}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{review.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{review.comment}</p>
              
              <button
                onClick={() => toggleLike(review.id)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                  review.isLiked
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${review.isLiked ? 'fill-current' : ''}`} />
                <span>{review.likes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
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
  );
};

export default ReviewPage;