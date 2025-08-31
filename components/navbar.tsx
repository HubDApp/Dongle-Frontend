"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, Plus, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useWallet } from "@/hooks/use-wallet"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/20 transition-all duration-300 animate-glow"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Navbar() {
  const { isConnected, address, connect, disconnect } = useWallet()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg overflow-hidden">
                <img src="/dongle-logo.png" alt="Dongle" className="h-full w-full object-cover" />
              </div>
              <span className="text-xl font-bold gradient-text font-serif">Dongle</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/explore"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/reviews"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Reviews
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/submit">
              <Button variant="outline" size="sm" className="gradient-border bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Submit dApp
              </Button>
            </Link>

            <Button
              className="gradient-bg-animated text-white hover:opacity-90 transition-opacity"
              onClick={isConnected ? disconnect : connect}
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
