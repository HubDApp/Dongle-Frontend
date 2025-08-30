"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
  debounceMs?: number
}

export function SearchInput({ onSearch, placeholder = "Search dApps...", debounceMs = 300 }: SearchInputProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, onSearch, debounceMs])

  const clearSearch = () => {
    setQuery("")
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative glass-morphism rounded-xl border border-border/50 group-hover:border-primary/30 transition-all duration-300">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-12 py-3 bg-transparent border-0 text-base placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted/50 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
