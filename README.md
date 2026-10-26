# KibandaPay WDK (YakoP2P) 🛒💳

> **Track 3: Agentic Finance with WDK** | AI Yako: Own Your AI Hackathon (Tether & Node NBO, Nairobi)  
> **Prize Track Bounty**: 400 USDt + 1,500 USDt Overall Winner Contender

KibandaPay is an autonomous offline voice and self-custodial financial agent engineered for emerging market street vendors (*Mama Mboga*, bodaboda taxis, dukas). Combining Tether's **QVAC Local SLM** with **Tether WDK (Wallet Development Kit)** and **Pears P2P**, it enables customers and merchants to negotiate, sign, and settle USDt transactions with zero internet connection.

---

## ⚡ Key Architectural Modules
* **QVAC Swahili/English Intent SLM**: Converts spoken audio transcripts into deterministic financial commands on local hardware.
* **Tether WDK Enclave Keystore**: Stores encrypted private keys locally and generates EIP-712 offline payment vouchers.
* **Deterministic Sequence Nonces**: Nonces (`#44`, `#45`) guarantee mathematical double-spending prevention before network broadcast.
* **Pears P2P Dynamic QR Settlement**: Air-gapped device-to-device voucher exchange with laser scanlines.
* **Mama Mboga Merchant POS**: Instant offline signature verification and balance crediting.
* **Deferred Network Broadcaster**: Gated one-click batch submission when Wi-Fi is restored.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Launch KibandaPay financial agent
npm run dev
```

Visit `http://localhost:5176/` and disconnect Wi-Fi to test!

---

## 📖 Documentation
* [START.md](./START.md) — Step-by-step developer and judge start guide.
* [SETUP.md](./SETUP.md) — Environment setup and official DoraHacks submission form answers.
* [PITCH_AND_VIDEO.md](./PITCH_AND_VIDEO.md) — 2-minute video script & demo walkthrough.
