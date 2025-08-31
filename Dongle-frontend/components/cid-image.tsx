"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CidImageProps {
  cid?: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallback?: string
}

const IPFS_GATEWAYS = ["https://ipfs.io/ipfs/", "https://w3s.link/ipfs/", "https://gateway.pinata.cloud/ipfs/"]

export function CidImage({
  cid,
  alt,
  width = 400,
  height = 400,
  className,
  fallback = "/dapp-logo.png",
}: CidImageProps) {
  const [currentGatewayIndex, setCurrentGatewayIndex] = useState(0)
  const [hasError, setHasError] = useState(false)

  if (!cid || hasError) {
    return (
      <Image
        src={fallback || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("rounded-2xl object-cover", className)}
      />
    )
  }

  const imageUrl = `${IPFS_GATEWAYS[currentGatewayIndex]}${cid.replace("ipfs://", "")}`

  const handleError = () => {
    if (currentGatewayIndex < IPFS_GATEWAYS.length - 1) {
      setCurrentGatewayIndex((prev) => prev + 1)
    } else {
      setHasError(true)
    }
  }

  return (
    <Image
      src={imageUrl || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={cn("rounded-2xl object-cover", className)}
      onError={handleError}
    />
  )
}



