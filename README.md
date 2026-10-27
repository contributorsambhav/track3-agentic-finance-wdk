# KibandaPay WDK (YakoP2P) 🛒💳

> **Target Focus**: Agentic Finance with WDK (Self-Custodial Offline Micro-Commerce)  
> **Architecture**: Autonomous Voice & Financial Agent powered by Tether QVAC & Tether WDK

KibandaPay is an autonomous offline voice and self-custodial financial agent engineered for emerging market street vendors (*Mama Mboga*, bodaboda taxis, dukas). Combining Tether's **QVAC Local SLM** with **Tether WDK (Wallet Development Kit)** and **Pears P2P**, it enables customers and merchants to negotiate, sign, and settle USDt transactions with zero internet connection.

---

## ⚡ Key Architectural Modules
* **Official Tether WDK Enclave Keystore** (`@tetherto/wdk` & `@tetherto/wdk-wallet-evm`): Derives BIP-44 self-custodial accounts and signs EIP-712 offline payment vouchers with hardware cryptographic security.
* **Official QVAC Local AI Engine** (`@qvac/sdk` & `@qvac/cli`): Converts spoken audio transcripts and Swahili/English text into structured financial intents.
* **Deterministic Sequence Nonces**: Nonces (`#44`, `#45`) guarantee mathematical double-spending prevention before network broadcast.
* **Pears P2P Dynamic QR Settlement**: Air-gapped device-to-device voucher exchange with laser scanlines.
* **Mama Mboga Merchant POS**: Instant offline signature verification and balance crediting.
* **Deferred Network Broadcaster**: Gated one-click batch submission when Wi-Fi is restored.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Verify QVAC System Requirements
```bash
npm run doctor
# Runs official '@qvac/cli doctor' - checks Node 22+, Vulkan GPU, and Bare runtime
```

### 3. Run Tether WDK Cryptographic Verification
```bash
npm run test:wdk
# Verifies customer signing and merchant POS verification offline
```

### 4. Launch KibandaPay Financial Agent
```bash
# Terminal 1: Tether WDK Enclave & QVAC local daemon
npm run daemon

# Terminal 2: Financial Agent UI
npm run dev
```

Visit `http://localhost:5173/` and disconnect Wi-Fi to test!

---

## 📖 Documentation
* [START.md](./START.md) — Step-by-step developer and judge start guide.
* [SETUP.md](./SETUP.md) — Official DoraHacks submission form answers and verification reports.
* [PITCH_AND_VIDEO.md](./PITCH_AND_VIDEO.md) — 2-minute video script & demo walkthrough.
