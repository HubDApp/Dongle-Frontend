# Dongle v0 - Your Gateway to Starknet dApps

A hackathon-ready MVP for discovering, reviewing, and submitting Starknet dApps. Built with Next.js 14, TypeScript, and a polished Web3 dark theme.

## Features

- 🔍 **Browse & Search** - Discover Starknet dApps with category filtering
- ⭐ **Reviews & Ratings** - Leave on-chain reviews and see average ratings
- 🔗 **Wallet Integration** - Connect with Argent X or Braavos wallets
- 📝 **Submit dApps** - Add new dApps to the directory
- 🛡️ **Claim Listings** - Prove ownership and manage your dApp profile
- 📦 **IPFS Storage** - Store metadata and reviews on IPFS
- 🎨 **Dark Web3 Theme** - Modern, accessible design with glass morphism

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **State Management**: TanStack Query
- **Blockchain**: starknet.js, get-starknet
- **Storage**: IPFS (Web3.Storage/Pinata)
- **Styling**: Tailwind CSS with custom dark theme
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Starknet wallet (Argent X or Braavos)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd dongle-v0
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy environment variables:
\`\`\`bash
cp .env.local.sample .env.local
\`\`\`

4. Update environment variables in `.env.local`:
\`\`\`env
# Starknet Configuration
NEXT_PUBLIC_STARKNET_NETWORK=sepolia
NEXT_PUBLIC_VOYAGER_BASE=https://sepolia.voyager.online
NEXT_PUBLIC_REGISTRY_ADDRESS=0xYOUR_REGISTRY_CONTRACT
NEXT_PUBLIC_RATINGS_ADDRESS=0xYOUR_RATINGS_CONTRACT
NEXT_PUBLIC_RPC_URL=https://starknet-sepolia.public.blastapi.io/rpc/v0_7

# IPFS Configuration (server-only)
IPFS_PROVIDER=web3storage
WEB3STORAGE_TOKEN=your_web3storage_token
PINATA_JWT=your_pinata_jwt
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
apps/web/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Marketing pages
│   ├── dapp/[id]/         # dApp profile pages
│   ├── submit/            # Submit dApp page
│   ├── claim/[id]/        # Claim dApp page
│   ├── api/ipfs/          # IPFS upload API
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dapp-card.tsx     # dApp display components
│   ├── review-*.tsx      # Review components
│   └── wallet-*.tsx      # Wallet components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
\`\`\`

## Key Components

### Smart Contract Integration

The app integrates with two main contracts:

- **Registry Contract**: Manages dApp listings, metadata, and ownership
- **Ratings Contract**: Handles reviews and rating calculations

### IPFS Integration

Large data (metadata, reviews, images) is stored on IPFS via server-side API routes to keep provider secrets secure.

### Wallet Connection

Uses `get-starknet` for wallet connectivity with support for:
- Argent X
- Braavos
- Other Starknet-compatible wallets

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

### Testing

The project includes:
- Unit tests with Vitest and React Testing Library
- E2E tests with Playwright
- Component testing for UI interactions

### Code Quality

- ESLint + Prettier for code formatting
- TypeScript for type safety
- Conventional Commits for commit messages

## Deployment

The app is designed to deploy easily on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built for Starknet ecosystem
- Uses shadcn/ui for beautiful components
- Inspired by modern Web3 design patterns
