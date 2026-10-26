import { useState } from 'react';
import {
  Store,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowDownLeft,
  Upload,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';
import { wdkService, type WdkTransactionDraft } from '../services/wdkService';

export const MerchantPosTerminal = () => {
  const [payloadInput, setPayloadInput] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string; isDoubleSpend?: boolean } | null>(null);
  const [merchantBalance, setMerchantBalance] = useState(85.0);
  const [verifiedTransactions, setVerifiedTransactions] = useState<WdkTransactionDraft[]>([
    {
      id: 'merchant-rec-9821',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      sender: '0x3F2b740597d26A74dE9B3b7cAcC0e8E3F2913D1b',
      recipient: '0x8A49c950B2f69D69995beFF0987c9D86e4922e3F',
      recipientLabel: 'Mama Mboga Grocery Terminal (POS-NBO-012)',
      amountUsdt: 12.50,
      kesEquivalent: 1618.75,
      nonce: 42,
      status: 'signed_offline',
      signature: '0xVERIFIED_PEARS_OFFLINE_SIG_042',
      rawPayload: '',
      memo: 'Sukuma wiki + 2kg maize flour',
      airgapHash: '0x4f12...9821'
    }
  ]);

  const handleVerifyVoucher = () => {
    if (!payloadInput.trim()) return;
    const res = wdkService.verifyAndAcceptVoucher(payloadInput);
    setFeedback({ success: res.success, message: res.message, isDoubleSpend: res.isDoubleSpend });

    if (res.success && res.tx) {
      setMerchantBalance(prev => prev + res.tx!.amountUsdt);
      setVerifiedTransactions(prev => [res.tx!, ...prev]);
      setPayloadInput('');
    }
  };

  const handleAutoPasteActiveVoucher = () => {
    let raw = wdkService.getLatestSignedVoucher()?.rawPayload;
    if (!raw) {
      try {
        raw = localStorage.getItem('kibandapay_latest_voucher') || undefined;
      } catch {}
    }
    if (!raw) {
      raw = wdkService.getQueue()[0]?.rawPayload;
    }
    if (raw) {
      setPayloadInput(raw);
      setFeedback(null);
    } else {
      alert('No active voucher in customer memory yet. Please generate a voucher in Customer mode first!');
    }
  };

  const handleSimulateDoubleSpend = () => {
    // Generate a payload with already-processed nonce #42 or #43 to demonstrate rejection
    const doubleSpendPayload = JSON.stringify({
      domain: { name: 'KibandaPayOfflineVoucher', version: '1', chainId: 137 },
      message: {
        sender: '0x3F2b740597d26A74dE9B3b7cAcC0e8E3F2913D1b',
        recipient: '0x8A49c950B2f69D69995beFF0987c9D86e4922e3F',
        recipientLabel: 'Mama Mboga Grocery Terminal',
        amountUsdt: 15.00,
        kesEquivalent: 1942.50,
        nonce: 43, // Nonce 43 is already in processed list!
        memo: 'MALICIOUS REPLAY: Sukuma Wiki Attempt #2'
      },
      signature: '0xREPLAY_ATTACK_SIGNATURE_999999999999999'
    }, null, 2);

    setPayloadInput(doubleSpendPayload);
    const res = wdkService.verifyAndAcceptVoucher(doubleSpendPayload);
    setFeedback({ success: res.success, message: res.message, isDoubleSpend: res.isDoubleSpend });
  };

  const handleResetTestState = () => {
    wdkService.resetTestEnvironment();
    setMerchantBalance(85.0);
    setPayloadInput('');
    setFeedback({
      success: true,
      message: 'Test environment reset. Balance set to 85.00 USDt, sequence nonces refreshed.'
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setPayloadInput(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Merchant Header Card */}
      <div className="panel-industrial p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#ff761c] uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-4 h-4" />
                MAMA MBOGA POINT-OF-SALE (POS) TERMINAL
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                AIR-GAP VERIFIED
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-sans">
              Kibanda #12 (Toi Market, Nairobi) • Offline Settlement Terminal
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetTestState}
              className="btn-tactile text-xs py-1.5 px-3 flex items-center gap-1 text-neutral-400 hover:text-white"
              title="Reset Test Wallets & Nonce Counters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET TEST DATA</span>
            </button>

            <div className="bg-[#12141a] px-4 py-2 rounded-lg border border-white/10 text-right">
              <span className="text-[11px] font-mono text-neutral-400 block">MERCHANT BALANCE:</span>
              <span className="text-xl font-mono font-bold text-[#00d1b2]">
                {merchantBalance.toFixed(2)} USDt
              </span>
            </div>
          </div>
        </div>

        {/* Quick Testing Actions Bar */}
        <div className="bg-[#13171f] p-3 rounded border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-neutral-400">P2P TEST SIMULATOR:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoPasteActiveVoucher}
              className="px-3 py-1.5 rounded bg-[#00d1b2]/15 text-[#00d1b2] border border-[#00d1b2]/30 hover:bg-[#00d1b2]/25 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-CLICK: LOAD ACTIVE CUSTOMER VOUCHER</span>
            </button>

            <button
              onClick={handleSimulateDoubleSpend}
              className="px-3 py-1.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 cursor-pointer flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TEST: SIMULATE DOUBLE-SPEND ATTACK</span>
            </button>
          </div>
        </div>

        {/* Input Box for Scanned QR or Imported JSON */}
        <div className="space-y-3">
          <label className="font-mono text-xs text-neutral-400 block">
            SCAN CUSTOMER QR CODE OR PASTE AIR-GAP VOUCHER JSON:
          </label>
          <textarea
            value={payloadInput}
            onChange={(e) => setPayloadInput(e.target.value)}
            placeholder="Paste voucher payload from customer QR code, Bluetooth sync, or upload .json file..."
            className="w-full h-32 bg-[#050608] border border-white/10 rounded-lg p-3 font-mono text-xs text-white focus:outline-none focus:border-[#ff761c] resize-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="btn-tactile text-xs py-1.5 px-3 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>IMPORT .JSON VOUCHER</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handleVerifyVoucher}
              disabled={!payloadInput.trim()}
              className="btn-tactile btn-ochre text-xs py-2 px-4 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFY VOUCHER OFFLINE</span>
            </button>
          </div>
        </div>

        {/* Verification Result Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded border text-xs font-mono space-y-1 ${
              feedback.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : feedback.isDoubleSpend
                ? 'bg-rose-500/15 border-rose-500/50 text-rose-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {feedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{feedback.isDoubleSpend ? 'CRYPTOGRAPHIC SECURITY ALERT' : 'VERIFICATION RESULT'}</span>
            </div>
            <p className="text-[11px] leading-relaxed pl-6">{feedback.message}</p>
          </div>
        )}
      </div>

      {/* Verified Transaction Ledger */}
      <div className="panel-industrial p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <span className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-wider">
            OFFLINE SETTLED RECEIPTS ({verifiedTransactions.length})
          </span>
          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            ZERO REPLAY RISK • HARDWARE ENCLAVE VERIFIED
          </span>
        </div>

        <div className="space-y-3">
          {verifiedTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 bg-[#12141a] rounded border border-white/5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{tx.memo}</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">
                    Sender: {tx.sender.slice(0, 14)}... • Sequence Nonce #{tx.nonce} • Time: {new Date(tx.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#00d1b2]">+{tx.amountUsdt.toFixed(2)} USDt</p>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  OFFLINE SETTLED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
