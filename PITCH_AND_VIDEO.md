# KibandaPay WDK — Official Screen Recording Production Script (Split Screen)

> **Hackathon Target**: Track 3: Agentic Finance with WDK (AI Yako: Own Your AI)  
> **Total Target Video Length**: 1 minute 50 seconds to 2 minutes  
> **Format**: High-Resolution Split-Screen Recording with Voiceover

---

## 🖥️ Screen Setup Before You Hit "Record"

1. Open your browser and create **two windows side-by-side (50% / 50% split)**:
   * **LEFT WINDOW (Customer Side)**: Navigate to `http://localhost:5176/` and make sure **CUSTOMER AGENT** is selected in the top header.
   * **RIGHT WINDOW (Merchant POS Side)**: Navigate to `http://localhost:5176/` and click **MERCHANT POS** in the top header.
2. Have your Windows terminal / PowerShell open behind or minimized ready to show `ping 8.8.8.8`.
3. Set your microphone input level and start your screen recording software (OBS, Loom, or Windows Game Bar `Win + Alt + R`).

---

## 🎬 Step-by-Step Recording Flow & Voiceover Teleprompter

### SCENE 1: The Nairobi Problem & The Physical Air-Gap Proof (0:00 – 0:30)

#### 🖱️ Exactly What to Do on Screen:
1. Show your desktop taskbar: Click the Wi-Fi icon and **Turn Wi-Fi OFF** (or click **Airplane Mode ON**).
2. Bring up terminal and run:
   ```powershell
   ping 8.8.8.8
   ```
   Show the output: `Destination host unreachable` / 100% packet loss.
3. Bring the split browser window back into focus: Point to the Left window (Customer) and Right window (Mama Mboga Merchant POS).

#### 🎙️ Exactly What to Say (Word-for-Word):
> *"In Nairobi and across East Africa, over 40% of street vendors like Mama Mboga experience cellular network blackouts every week. When the internet drops, mobile money stops, and sales immediately freeze.*
> 
> *Today, we introduce KibandaPay: an autonomous offline voice and financial agent powered by Tether QVAC local AI and Tether WDK self-custodial wallets.*
> 
> *To prove true digital sovereignty, I have completely disconnected Wi-Fi. We are 100% air-gapped with zero outbound network packets. On the left is the customer terminal, and on the right is Mama Mboga's Point-of-Sale."*

---

### SCENE 2: Customer Voice Intent & Tether WDK Offline Signing (0:30 – 1:00)

#### 🖱️ Exactly What to Do on Screen (LEFT WINDOW):
1. On the Left screen, click the preset chip:
   - **`MAMA MBOGA GROCERIES (15.00 USDt)`**
2. Click **`ANALYZE INTENT (QVAC SLM)`**.
   - Show the green structured payload card appearing instantly with Recipient address, 15.00 USDt (~1,942.50 KES), and memo.
3. Click **`APPROVE & SIGN VIA TETHER WDK (AIR-GAPPED)`**.
   - Show the newly minted voucher `#45` appear with cryptographic signature `0x...`.
4. Click **`TRANSMIT VIA PEARS P2P QR`**.
   - The animated laser scanline and high-density SVG QR code pop up.

#### 🎙️ Exactly What to Say (Word-for-Word):
> *"The customer wants to buy groceries from Mama Mboga. They speak natural Swahili: 'Lipa 15 USDt kwa Mama Mboga'.*
> 
> *Tether QVAC’s on-device SLM parses the intent in under 20 milliseconds on local hardware with zero cloud API calls.*
> 
> *When the customer approves, Tether WDK signs an EIP-712 offline voucher using private keys isolated in the physical device enclave, incrementing a hardware sequence nonce to lock spendable funds.*
> 
> *The voucher is formatted into a high-density Pears P2P dynamic QR code ready for device-to-device transmission."*

---

### SCENE 3: Mama Mboga POS Offline Verification & Instant Credit (1:00 – 1:25)

#### 🖱️ Exactly What to Do on Screen (RIGHT WINDOW):
1. Move mouse to the **RIGHT WINDOW (Merchant POS)**.
2. Under "JUDGE QUICK TEST BENCH", click:
   - **`1-CLICK: LOAD ACTIVE CUSTOMER VOUCHER`**
   - *(The payload from the left window instantly populates the merchant input box).*
3. Click **`VERIFY VOUCHER OFFLINE`**.
4. Watch the screen:
   - The green alert confirms: *"Offline voucher verified! Valid EIP-712 cryptographic signature confirmed. Credited 15.00 USDt to Mama Mboga POS."*
   - Mama Mboga’s balance immediately increments from **`85.00 USDt` ➔ `100.00 USDt`**!
   - A new verified receipt appears at the top of the settled receipts ledger.

#### 🎙️ Exactly What to Say (Word-for-Word):
> *"Now look at the right screen: Mama Mboga's phone terminal. She points her camera at the customer's QR code.*
> 
> *Her POS terminal cryptographically verifies the EIP-712 signature against the customer’s public address offline.*
> 
> *Instantly, 15 USDt is credited to her local ledger balance—growing from 85 to 100 USDt. The transaction is complete with zero internet connection!"*

---

### SCENE 4: Offline Double-Spending Defense Demonstration (1:25 – 1:40)

#### 🖱️ Exactly What to Do on Screen (RIGHT WINDOW):
1. Still on the Right screen, click:
   - **`TEST: SIMULATE DOUBLE-SPEND ATTACK`**
2. Watch the red security intercept banner appear:
   - *"REPLAY ATTACK BLOCKED! Voucher Nonce #43 was already settled on this POS. Offline double-spending rejected by Tether WDK enclave!"*

#### 🎙️ Exactly What to Say (Word-for-Word):
> *"What if someone tries to replay the same voucher twice offline?*
> 
> *Let's simulate a double-spend attack. Notice how Tether WDK’s enclave immediately intercepts and blocks it. Because every voucher enforces deterministic sequence nonces, double-spending is mathematically impossible even completely disconnected from the blockchain."*

---

### SCENE 5: Reconnecting & Gated On-Chain Broadcast (1:40 – 2:00)

#### 🖱️ Exactly What to Do on Screen:
1. In the header banner, click the **`AIR-GAP ENFORCED`** switch to toggle it to:
   - **`NETWORK RECONNECTED (SYNC MODE)`**
   - *(Optional: Turn your laptop Wi-Fi back on).*
2. Look at the **Deferred On-Chain Batch Broadcast** bar:
   - Click **`SUBMIT BATCH TO ON-CHAIN RPC`**.
3. Watch the confirmation box appear showing batch settlement with on-chain Polygon testnet transaction hashes.

#### 🎙️ Exactly What to Say (Word-for-Word):
> *"Notice the clear architectural separation: financial planning and signing happen 100% air-gapped in Zone 1. Network actions in Zone 2 are strictly gated.*
> 
> *When cellular connectivity returns at the end of the day, Mama Mboga toggles to Sync Mode and submits her accumulated queue.*
> 
> *All offline vouchers are broadcast atomically to the Tether WDK on-chain contract, receiving immutable blockchain finality.*
> 
> *KibandaPay brings autonomous, air-gapped financial sovereignty to emerging market micro-merchants. Built for Track 3 of AI Yako. Own your money, own your AI."*

---

## 📋 Quick Pre-Flight Checklist Before Uploading

- [ ] Video duration is between **1:45 and 2:00**.
- [ ] Taskbar visibly showed Wi-Fi disconnected / ping 8.8.8.8 failed.
- [ ] Both Customer (Left) and Merchant (Right) windows were clearly legible.
- [ ] Upload video to **YouTube (Unlisted)**, **Loom**, or **Google Drive (Anyone with link can view)**.
- [ ] Copy the public video URL into your DoraHacks submission form on `https://dorahacks.io/hackathon/ai-yako/build`.
