"use client"

import type { Category } from "@/types/dapp"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CATEGORIES: Category[] = ["DeFi", "NFT", "Gaming", "DAO", "Infra"]

interface CategoryFilterProps {
  selectedCategory?: Category
  onCategoryChange: (category?: Category) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={selectedCategory ? "outline" : "default"} size="sm" onClick={() => onCategoryChange(undefined)}>
        All
      </Button>
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={cn("transition-colors", selectedCategory === category && "bg-accent text-accent-foreground")}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
