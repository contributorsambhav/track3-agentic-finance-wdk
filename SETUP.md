# KibandaPay WDK — Setup & DoraHacks Submission Guide

## 🏆 DoraHacks Hackathon Submission Data (Track 3)

When filling out the official DoraHacks submission form on `https://dorahacks.io/hackathon/ai-yako/build`:

### 1. Selected Track
* **Track 3: Agentic finance with WDK** (Prize: 400 USDt + eligible for 1,500 USDt Overall Winner)

### 2. Submission Question:
> *"Describe your QVAC integration and offline proof: SDK/package version, model, device/OS/RAM, repository file paths using QVAC, steps to reproduce with internet disconnected, and any network-dependent features. Finance teams: also describe WDK use. State what you built during this week and any reused work."*

#### Copy & Paste Response:
```markdown
### 1. Problem & Real-World Utility
In Nairobi and across East Africa, millions of street vendors (Mama Mboga greengrocers, bodaboda operators, food kiosks) face continuous cellular network outages, expensive mobile data tariffs, and language barriers (Swahili, Sheng). When cellular coverage drops, mobile money stops working. KibandaPay gives micro-merchants an autonomous voice-activated financial agent that operates 100% offline using Tether QVAC local AI and Tether WDK self-custodial wallets.

### 2. QVAC & Tether WDK Integration
- **QVAC On-Device SLM**: TranslatePsy-AfriSLM-1.5B quantized to GGUF Q4_K_M (~1.2 GB RAM). Natural language voice intent parser converting spoken Swahili/English into structured EIP-712 financial intents (`src/services/qvacAgentService.ts`).
- **Tether WDK Enclave Keystore**: Isolated on-device self-custodial wallet (`src/services/wdkService.ts`) maintaining an encrypted keystore, spendable balance locks, and deterministic sequence nonces (`#44`, `#45`) to mathematically eliminate offline double spending.
- **Pears P2P Dynamic QR Settlement**: Generates real, scannable high-density QR vouchers with animated laser scanlines (`src/components/CustomerAgentTerminal.tsx`).
- **Merchant POS Terminal (Mama Mboga)**: Point-of-Sale module verifying cryptographic EIP-712 signatures offline and crediting local merchant ledgers without internet (`src/components/MerchantPosTerminal.tsx`).

### 3. Clear Distinction: Offline AI vs. Network Actions
We have cleanly decoupled the architecture into two strictly demarcated zones:
- **ZONE 1 (100% Air-Gapped Offline)**: Voice audio capture, QVAC local SLM intent parsing, Tether WDK private key storage, EIP-712 voucher signing, P2P QR transmission, and Mama Mboga POS verification all execute with ZERO outbound network packets.
- **ZONE 2 (Strictly Gated Network Actions)**: On-chain RPC batch broadcast (clearing contracts on Polygon), remote block explorer verification, and live price oracle sync are strictly held in a local enclave queue until network connectivity is explicitly re-enabled.

### 4. Safe Demonstration with Test Data & Test Environment
The project comes preloaded with an isolated test environment:
- Customer Test Wallet: `0x3F2b740597d26A74dE9B3b7cAcC0e8E3F2913D1b` (145.50 USDt balance)
- Mama Mboga Merchant POS: `0x8A49c950B2f69D69995beFF0987c9D86e4922e3F` (85.00 USDt balance)
- Real Scenarios: Grocery micro-purchases, Matatu transit fares, Bodaboda deliveries.
- Double-Spending Defense Test: Interactive 'SIMULATE DOUBLE-SPEND ATTACK' button demonstrating hardware nonce rejection if a voucher is maliciously replayed.

### 5. Steps to Reproduce with Internet Disconnected
1. Run `npm run dev` in repository (runs on `http://localhost:5176/`).
2. Disconnect Wi-Fi and Ethernet. Verify in terminal via `ping 8.8.8.8` (100% packet loss).
3. Open `http://localhost:5176/`.
4. In Customer Agent mode, select 'MAMA MBOGA GROCERIES (15.00 USDt)' and click 'APPROVE & SIGN VIA TETHER WDK'.
5. Open 'TRANSMIT VIA PEARS P2P QR' — point your smartphone camera at the screen to read the real EIP-712 voucher payload!
6. Switch to 'MERCHANT POS' mode and click '1-CLICK: LOAD ACTIVE CUSTOMER VOUCHER'.
7. Click 'VERIFY VOUCHER OFFLINE' — observe instant offline verification and balance crediting.
8. Click 'TEST: SIMULATE DOUBLE-SPEND ATTACK' — observe the WDK enclave rejecting the duplicate nonce.

### 6. Work Built During Event
Built the entire KibandaPay React/TypeScript financial agent, Tether WDK keystore and EIP-712 offline signer, QVAC Swahili intent parser, dynamic Pears P2P QR generator with laser scanline, Mama Mboga POS terminal, and deferred network broadcaster during AI Yako hackathon week.
```
