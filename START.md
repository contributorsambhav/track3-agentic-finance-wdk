# KibandaPay WDK — Quick Start & Judge Testing Guide (Track 3)

## 🚀 How to Run Locally

### 1. Verify Official QVAC & Tether WDK Setup
```bash
# Verify system prerequisites with official QVAC doctor
npm run doctor

# Run Tether WDK cryptographic offline signing & verification test
npm run test:wdk
```

### 2. Launch Local Enclave Daemon & Web App
```bash
# Terminal 1: Launch Tether WDK Enclave & QVAC Daemon
npm run daemon

# Terminal 2: Launch Web Frontend
npm run dev
```
The application will launch on `http://localhost:5173/`.

---

## 🧪 Judge Testing Walkthrough (100% Offline)

### Step 1: Disconnect Internet
1. Turn off your Wi-Fi or unplug your Ethernet cable.
2. In terminal, run:
   ```powershell
   ping 8.8.8.8
   ```
   *(Confirmed: 100% packet loss / completely offline).*
3. Open `http://localhost:5173/` in your browser.

---

### Step 2: The Customer Agent Flow (Zone 1: Air-Gapped)
1. In the **CUSTOMER AGENT** tab, select the preset:
   - *"MAMA MBOGA GROCERIES (15.00 USDt)"* (or speak Swahili using the mic button).
2. Click **ANALYZE INTENT (QVAC SLM)**:
   - Observe the on-device SLM extracting Recipient address (`0x6Fac4D18c912343BF86fa7049364Dd4E424Ab9C0`), Amount in USDt, KES equivalent, and Memo with zero network packets.
3. Click **APPROVE & SIGN VIA TETHER WDK (AIR-GAPPED)**:
   - The Tether WDK enclave signs an EIP-712 offline voucher with a hardware sequence nonce (`#45`), reserving the spendable balance in the customer's wallet.
4. Click **TRANSMIT VIA PEARS P2P QR**:
   - A high-density SVG QR code opens with an animated laser scanline.
   - Point your physical smartphone camera at the screen — your phone will scan the real EIP-712 JSON voucher!

---

### Step 3: Mama Mboga Merchant POS Settlement (Zone 1: Air-Gapped)
1. Switch to the **MERCHANT POS** tab in the top header.
2. Under "JUDGE QUICK TEST BENCH", click **1-CLICK: LOAD ACTIVE CUSTOMER VOUCHER**.
3. Click **VERIFY VOUCHER OFFLINE**:
   - The POS terminal validates the cryptographic signature offline against the customer address (`0x9858EfFD232B4033E47d90003D41EC34EcaEda94`).
   - Mama Mboga's balance instantly credits with **zero internet connection**!
4. Click **TEST: SIMULATE DOUBLE-SPEND ATTACK**:
   - Attempts to replay the same voucher nonce `#43`.
   - The Tether WDK enclave immediately intercepts and blocks it:
     *"REPLAY ATTACK BLOCKED! Voucher Nonce #43 was already settled on this POS. Offline double-spending mathematically rejected by Tether WDK enclave!"*

---

### Step 4: Gated Network Broadcast (Zone 2: Online Sync)
1. Switch the **AIR-GAP ENFORCED** toggle in the header to **"NETWORK RECONNECTED (SYNC MODE)"**.
2. Notice how Zone 2 unlocks.
3. Click **SUBMIT BATCH TO ON-CHAIN RPC**:
   - Simulates atomic batch clearing on Polygon testnet.
   - Generates real on-chain transaction hashes (`0x...`) with block explorer verification.

---

## 🏆 Official DoraHacks Submission Details
Read [SETUP.md](./SETUP.md) for ready-to-paste submission answers for Track 3.
