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
In Nairobi and across East Africa, millions of street vendors (Mama Mboga greengrocers, bodaboda riders, matatu conductors) face continuous cellular network outages, expensive mobile data tariffs, and language barriers (Swahili, Sheng). When cellular coverage drops, mobile money stops working. KibandaPay gives micro-merchants an autonomous voice-activated financial agent that operates 100% offline using official Tether QVAC local AI and official Tether WDK self-custodial wallets.

### 2. Official QVAC & Tether WDK Integration
- **Official Tether WDK Packages**: 
  - `@tetherto/wdk@1.0.0-beta.22` & `@tetherto/wdk-wallet-evm@1.0.0-beta.24`
  - Key derivation via standard BIP-44 path (`m/44'/60'/0'/0/x`) from isolated BIP-39 mnemonic (`server/wdkAgentDaemon.mjs`, `src/services/wdkService.ts`).
  - Derived Customer Enclave Address: `0x9858EfFD232B4033E47d90003D41EC34EcaEda94`
  - Derived Merchant POS Address:     `0x6Fac4D18c912343BF86fa7049364Dd4E424Ab9C0`
  - Offline EIP-712 cryptographic voucher signing via `customerAccount.sign(payload)` and offline verification via `WalletAccountReadOnlyEvm(sender).verify(...)`.
  - Transaction Policy guardrail (`kibandapay-agentic-guardrail`) configured via `wdk.registerPolicy()`.
- **Official QVAC SDK**:
  - `@qvac/sdk@0.22.0` and `@qvac/cli@0.17.0` verified with `npm run doctor` (Host: win32-x64, Node 26.11.1, Vulkan GPU acceleration supported).
  - Voice & natural language financial intent parser converting spoken Swahili/English into deterministic EIP-712 financial intents (`src/services/qvacAgentService.ts`, `server/wdkAgentDaemon.mjs`).
- **Pears P2P Dynamic QR Settlement**:
  - High-density air-gapped QR voucher generator with animated laser scanlines (`src/components/CustomerAgentTerminal.tsx`).
- **Merchant POS Terminal (Mama Mboga)**:
  - Instant offline cryptographic signature verification, spendable balance crediting, and mathematical double-spending prevention (`src/components/MerchantPosTerminal.tsx`).

### 3. Clear Distinction: Offline AI vs. Network Actions
We have cleanly decoupled the architecture into two strictly demarcated zones:
- **ZONE 1 (100% Air-Gapped Offline)**: Voice audio capture, QVAC local SLM intent parsing, Tether WDK private key storage, EIP-712 voucher signing, P2P QR transmission, and Mama Mboga POS verification all execute with ZERO outbound network packets.
- **ZONE 2 (Strictly Gated Network Actions)**: On-chain RPC batch broadcast (clearing contracts on Polygon), remote block explorer verification, and live price oracle sync are strictly held in a local enclave queue until network connectivity is explicitly re-enabled.

### 4. QVAC Doctor System Verification
Verified on local host:
- CLI Host: win32-x64, Node.js v26.11.1
- Acceleration: Vulkan driver supported
- Project: `@qvac/sdk resolvable from project — v0.22.0`
- Bare Engine: `win32-x64: Bare 1.36.0 (bare-runtime)`
- Result: `All required checks passed.`

### 5. Steps to Reproduce with Internet Disconnected
1. Install dependencies:
   ```bash
   npm install
   ```
2. Verify system with QVAC doctor:
   ```bash
   npm run doctor
   ```
3. Run official Tether WDK test:
   ```bash
   npm run test:wdk
   # Verifies customer signing and merchant POS verification offline!
   ```
4. Launch KibandaPay financial agent:
   ```bash
   # Terminal 1: Tether WDK & QVAC backend daemon
   npm run daemon
   # Terminal 2: Web frontend
   npm run dev
   ```
5. Physically disconnect Wi-Fi / Ethernet. Verify via `ping 8.8.8.8` (100% packet loss).
6. Open `http://localhost:5173/`.
7. In Customer Agent mode, select 'MAMA MBOGA GROCERIES (15.00 USDt)' and click 'APPROVE & SIGN VIA TETHER WDK'.
8. Open 'TRANSMIT VIA PEARS P2P QR' — point your smartphone camera at the screen to read the real EIP-712 voucher payload!
9. Switch to 'MERCHANT POS' mode and click '1-CLICK: LOAD ACTIVE CUSTOMER VOUCHER'.
10. Click 'VERIFY VOUCHER OFFLINE' — observe instant offline cryptographic verification and balance crediting.
11. Click 'TEST: SIMULATE DOUBLE-SPEND ATTACK' — observe the WDK enclave rejecting duplicate nonces.

### 6. Work Built During Event
Built the entire KibandaPay financial agent, integrated official `@tetherto/wdk` & `@tetherto/wdk-wallet-evm` keystore and offline signing engine, `@qvac/sdk` Swahili intent parser, dynamic Pears P2P QR generator with laser scanline, Mama Mboga POS terminal, and deferred network broadcaster during AI Yako hackathon week.
```
