import { Zap, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  type: "featured" | "verified"
  className?: string
}

export function StatusBadge({ type, className }: StatusBadgeProps) {
  const config = {
    featured: {
      icon: Zap,
      text: "Featured",
      className: "bg-accent/20 text-accent-foreground",
    },
    verified: {
      icon: Shield,
      text: "Verified",
      className: "bg-green-500/10 text-green-400",
    },
  }

  const { icon: Icon, text, className: typeClassName } = config[type]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        typeClassName,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {text}
    </div>
  )
}

export function FeaturedTag({ className }: { className?: string }) {
  return <StatusBadge type="featured" className={className} />
}

export function VerifiedBadge({ className }: { className?: string }) {
  return <StatusBadge type="verified" className={className} />
}
