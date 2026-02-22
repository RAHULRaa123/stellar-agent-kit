# Stellar Agent Kit starter

Next.js app with **Connect Wallet** (Freighter) and **all 5 integrated protocols**—no `SECRET_KEY` required. Users sign transactions in their browser.

## Setup

1. Copy env and set your SoroSwap API key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   - `SOROSWAP_API_KEY` — Required for DEX quotes and swap execution (get one from [SoroSwap](https://soroswap.finance)).
   - `SECRET_KEY` — Optional; only for server-side bots. Leave unset for normal use (users connect with Freighter).

2. Install and run:
   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:3000. Click **Connect Wallet** (Freighter), then use all protocols:

## All 5 Protocols Integrated

### 🔄 **Swap** (SoroSwap)
- XLM ↔ USDC via SoroSwap DEX aggregator
- Quote → sign in Freighter → submit
- Includes Phoenix, Aqua routing

### 📤 **Send** (Core Stellar)
- Send XLM or USDC to any address
- Native Stellar payments via Horizon
- Build → sign → submit

### 📊 **Prices** (Reflector Oracle)
- Live prices from Reflector (SEP-40) oracle
- XLM, USDC, BTC prices
- API: `/api/price?symbol=XLM`

### 🏦 **Lending** (Blend)
- **Supply assets**: Deposit USDC or XLM as collateral to earn interest
- **Borrow assets**: Borrow against your collateral on Blend protocol
- **Real-time transactions**: Built with Freighter wallet integration
- **Secure signing**: Uses Freighter's secure transaction signing
- **Transaction tracking**: View transactions on Stellar Expert

### 🌉 **Bridge** (Allbridge Core)
- **Cross-chain transfers**: Bridge assets between Stellar and 10+ networks
- **Multi-network support**: Ethereum, BSC, Polygon, Solana, Avalanche, and more
- **Popular assets**: USDC, USDT, ETH, BTC support
- **Secure bridging**: Powered by Allbridge Core SDK
- **Real-time execution**: Immediate transaction processing

### 💰 **FxDAO** (Synthetic Stablecoins)
- Mint USDx, EURx, GBPx synthetic stablecoins
- Lock XLM as collateral
- Vault management and FXG staking

## Architecture

- **Frontend**: Next.js with Tailwind CSS, shadcn/ui components
- **Wallet**: Freighter integration for transaction signing
- **Backend**: Next.js API routes for protocol interactions
- **SDK**: `stellar-agent-kit` for protocol integrations

## Next steps

- Customize UI for your specific use case
- Add more assets or balance fetching
- Integrate additional Stellar protocols
- Use the full [Stellar DevKit UI](https://github.com/codewmilan/stellar-agent-kit) as reference
