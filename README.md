# Dongle: Your Onchain App Store

## Overview
Dongle is an **onchain dApp store** built to solve one of the most pressing problems in Web3: discovery and trust.  
It begins on **Starknet** but is designed to scale across multiple chains.

Today, discovery is fragmented. Users rely on scattered Twitter posts, Telegram groups, or centralized platforms, none of which are verifiable. Builders struggle for visibility, and users have no reliable way of knowing which projects are safe, audited, or still active.

Dongle addresses this by providing:
- A **transparent project registry** stored onchain.
- A **review and rating system** where users leave verifiable feedback.
- A **verification badge system** where projects pay a fee to request admin review and earn a trusted badge.
- A **ranking engine** for top-rated, trending, and recently added projects.

---

## How Dongle Works

### 1. Project Registration
Builders can submit their dApps to Dongle by providing:
- Project name
- Description
- Category (DeFi, NFTs, Gaming, DAOs, Tools, etc.)
- Website or external link
- Logo and metadata (stored on IPFS/Arweave)

This data is stored onchain for transparency and immutability.

---

### 2. Reviews and Ratings
Users can interact with projects by leaving:
- A **star rating (1–5)** stored onchain.
- An **optional written review**, uploaded to IPFS, with the CID stored onchain.

Rules:
- Each user can leave **one review per project**.
- Reviews can be **updated or deleted**.
- Ratings are aggregated to calculate averages for each project.

---

### 3. Verification
To further increase trust, Dongle introduces project verification.

- **Request**: A project owner submits evidence (audit reports, GitHub repo, documentation, etc.) uploaded as JSON to IPFS.
- **Payment**: A verification fee is paid in **STRK** or **USDC**. The fee is sent directly to the admin/treasury address.
- **Review**: An admin or verifier reviews the request.
- **Decision**:
  - Approved → project receives a **Verified badge**.
  - Rejected → project remains unverified.

Verification provides builders with credibility and users with confidence.

---

### 4. Discovery and Ranking
The frontend displays projects in a directory where users can:
- **Filter** by category (DeFi, NFT, Gaming, DAO, etc.).
- **Sort** by highest rated, trending, or recently added.
- **Toggle** between verified and unverified projects.

Trending projects are determined by recent reviews, ratings, and activity, ensuring new projects also gain visibility.

---

## Why Dongle Matters

- **For Users**  
  A reliable way to find trustworthy dApps with verifiable reviews and transparent verification.

- **For Builders**  
  Visibility, credibility through verification, and a level playing field for projects of all sizes.

- **For Ecosystems**  
  Strengthens adoption by addressing the discovery and trust gap at the core of Web3 growth.

---

## Summary
Dongle is a **transparent, onchain discovery platform** where:
- Builders register their projects,
- Users leave verifiable reviews and ratings,
- Admins provide trusted verification.

It starts with Starknet and scales toward becoming the **cross-chain discovery and trust layer for Web3.**
https://hackmd.io/@xZ4BOZ5TTTy1I0ZQHXFOkg/Bk8s12J5le
