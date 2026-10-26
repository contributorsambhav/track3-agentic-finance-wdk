import { useState } from 'react';
import {
  Mic,
  MicOff,
  Zap,
  Shield,
  QrCode,
  Download,
  Check,
  Copy,
  Radio,
  Send,
  CheckCircle2,
  Lock,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { wdkService, type WdkTransactionDraft } from '../services/wdkService';
import { qvacAgentService, type ParsedFinancialIntent } from '../services/qvacAgentService';

interface CustomerAgentTerminalProps {
  onTransactionSigned: (tx: WdkTransactionDraft) => void;
  isAirGapped: boolean;
  onToggleAirGap: () => void;
}

export const CustomerAgentTerminal = ({
  onTransactionSigned,
  isAirGapped,
  onToggleAirGap
}: CustomerAgentTerminalProps) => {
  const [inputText, setInputText] = useState(
    'Lipa 15 USDt kwa Mama Mboga (0x8A49c950B2f69D69995beFF0987c9D86e4922e3F)'
  );
  const [isListening, setIsListening] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedIntent, setParsedIntent] = useState<ParsedFinancialIntent | null>(null);
  const [activeDraft, setActiveDraft] = useState<WdkTransactionDraft | null>(wdkService.getQueue()[0] || null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<{ settledCount: number; hashes: string[] } | null>(null);

  const presets = [
    {
      label: 'MAMA MBOGA GROCERIES (15.00 USDt)',
      text: 'Lipa 15 USDt kwa Mama Mboga (0x8A49c950B2f69D69995beFF0987c9D86e4922e3F) kwa nyanya na sukuma'
    },
    {
      label: 'MATATU FARE KDA 402B (2.50 USDt)',
      text: 'Tuma 2.5 USDt kwa dereva wa Matatu KDA 402B (0x12F7c9D86e4922e3F)'
    },
    {
      label: 'BODABODA EXPRESS (1.20 USDt)',
      text: 'Lipa 1.2 USDt kwa rider wa Bodaboda (0x98A1b2F69D69995beFF0987c9D86e4922e3F)'
    },
    {
      label: 'SPLIT DINNER BILL (8.00 USDt)',
      text: 'Gawa bili ya chakula: 8 USDt kila mmoja kwa marafiki watatu'
    }
  ];

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech Recognition is not supported in this browser. Please type or pick a preset.');
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'sw-KE';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      rec.onresult = (e: any) => {
        const transcript = e.results?.[0]?.[0]?.transcript;
        if (transcript) setInputText(transcript);
      };
      rec.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleParseIntent = () => {
    setIsParsing(true);
    setTimeout(() => {
      const result = qvacAgentService.parseFinancialIntent(inputText);
      setParsedIntent(result);
      setIsParsing(false);
    }, 200);
  };

  const handleSignVoucher = () => {
    const intent = parsedIntent || qvacAgentService.parseFinancialIntent(inputText);
    const tx = wdkService.signOfflineTransaction(
      intent.recipient,
      intent.recipientLabel,
      intent.amountUsdt,
      intent.kesEquivalent,
      intent.memo
    );
    setActiveDraft(tx);
    onTransactionSigned(tx);
  };

  const handleDownloadAirgapJson = () => {
    if (!activeDraft) return;
    const blob = new Blob([activeDraft.rawPayload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kibandapay-voucher-${activeDraft.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBroadcastQueue = async () => {
    if (isAirGapped) {
      alert('AIR-GAP INTERLOCK IS ACTIVE!\n\nSecurity Policy: Network operations are held in local enclave storage while operating in Air-Gapped mode to guarantee zero data leakage.\n\nPlease toggle the AIR-GAP switch to "SYNC MODE (RECONNECT)" in the top header before broadcasting to on-chain RPC.');
      return;
    }

    setIsBroadcasting(true);
    const res = await wdkService.broadcastQueuedTransactions();
    setIsBroadcasting(false);
    setBroadcastResult({ settledCount: res.settledCount, hashes: res.txHashes });
  };

  return (
    <div className="space-y-6">
      {/* Intent & Voice Card */}
      <div className="panel-industrial p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#00d1b2] uppercase tracking-wider">
              AGENTIC NATURAL VOICE & INTENT INTERFACE (100% AIR-GAPPED)
            </span>
            <h2 className="text-lg font-bold text-white font-sans mt-0.5">
              Natural Language Payment Drafter (Swahili / English)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 bg-black/40 px-3 py-1 rounded border border-white/5 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#00d1b2] animate-pulse" />
              QVAC SLM: READY (0 PACKETS)
            </span>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(p.text);
                setParsedIntent(null);
              }}
              className="px-3 py-1.5 rounded bg-[#13171f] hover:bg-[#1a202c] border border-white/5 hover:border-[#00d1b2]/40 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setParsedIntent(null);
            }}
            placeholder="Speak or type transaction intent in Swahili or English (e.g. 'Lipa 15 USDt kwa Mama Mboga')..."
            className="w-full h-24 bg-[#050608] border border-white/10 rounded-lg p-3 text-white font-sans text-sm focus:outline-none focus:border-[#00d1b2] resize-none"
          />

          <button
            onClick={handleVoiceInput}
            className={`absolute right-3 bottom-3 p-2 rounded cursor-pointer transition-all ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
            }`}
            title="Toggle Web Speech Microphone"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <button
            onClick={handleParseIntent}
            disabled={isParsing || !inputText.trim()}
            className="btn-tactile hover:text-[#00d1b2]"
          >
            <Zap className="w-4 h-4 text-[#00d1b2]" />
            <span>{isParsing ? 'PARSING INTENT...' : 'ANALYZE INTENT (QVAC SLM)'}</span>
          </button>

          <button
            onClick={handleSignVoucher}
            className="btn-tactile btn-mint"
          >
            <Lock className="w-4 h-4" />
            <span>APPROVE & SIGN VIA TETHER WDK (AIR-GAPPED)</span>
          </button>
        </div>
      </div>

      {/* Structured Intent Specimen Card */}
      {parsedIntent && (
        <div className="panel-industrial p-6 border-l-4 border-l-[#00d1b2] space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-mono text-xs font-bold text-[#00d1b2] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              QVAC EXTRACTED EIP-712 INTENT PAYLOAD
            </span>
            <span className="font-mono text-xs text-neutral-400">Enclave Verified: 100% Localhost</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#12141a] p-3 rounded border border-white/5">
              <span className="text-neutral-500 block mb-1">RECIPIENT & KIBANDA:</span>
              <p className="text-white font-bold">{parsedIntent.recipientLabel}</p>
              <p className="text-neutral-400 text-[11px] truncate mt-0.5">{parsedIntent.recipient}</p>
            </div>

            <div className="bg-[#12141a] p-3 rounded border border-white/5">
              <span className="text-neutral-500 block mb-1">AMOUNT & CURRENCY PARITY:</span>
              <p className="text-2xl font-bold text-[#00d1b2]">{parsedIntent.amountUsdt.toFixed(2)} USDt</p>
              <p className="text-neutral-400 text-[11px] mt-0.5">≈ {parsedIntent.kesEquivalent.toLocaleString()} KES (Rate 129.50)</p>
            </div>

            <div className="bg-[#12141a] p-3 rounded border border-white/5">
              <span className="text-neutral-500 block mb-1">MEMO / PURPOSE:</span>
              <p className="text-white">{parsedIntent.memo}</p>
              <p className="text-emerald-400 text-[11px] mt-1">Air-gap reservation active</p>
            </div>
          </div>
        </div>
      )}

      {/* Signed Voucher Output Card */}
      {activeDraft && (
        <div className="panel-industrial p-6 space-y-5 bg-[#0a0c10]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                CRYPTOGRAPHIC AIR-GAP VOUCHER GENERATED
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-0.5">
                Voucher #{activeDraft.nonce} • {activeDraft.amountUsdt.toFixed(2)} USDt ({activeDraft.recipientLabel})
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowQrModal(true)}
                className="btn-tactile btn-mint text-xs py-1.5 px-3"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>TRANSMIT VIA PEARS P2P QR</span>
              </button>

              <button
                onClick={handleDownloadAirgapJson}
                className="btn-tactile text-xs py-1.5 px-3"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT .JSON</span>
              </button>
            </div>
          </div>

          <div className="bg-[#050608] p-4 rounded-lg border border-white/10 font-mono text-xs text-neutral-300 space-y-2">
            <div className="flex items-center justify-between text-neutral-500 pb-2 border-b border-white/5">
              <span>EIP-712 Structured Payload (Domain: KibandaPayOfflineVoucher)</span>
              <span className="text-emerald-400">Sig: {activeDraft.signature.slice(0, 20)}...</span>
            </div>
            <pre className="text-neutral-300 overflow-x-auto text-[11px] leading-relaxed">
              {activeDraft.rawPayload}
            </pre>
          </div>
        </div>
      )}

      {/* Deferred Network Broadcaster Bar */}
      <div className={`panel-industrial p-5 flex flex-wrap items-center justify-between gap-4 border transition-all ${
        isAirGapped
          ? 'border-amber-500/20 bg-[#0c0e12]'
          : 'border-blue-500/30 bg-[#0d121c]'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
              DEFERRED ON-CHAIN BATCH BROADCAST (ZONE 2)
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              isAirGapped ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {isAirGapped ? 'INTERLOCKED (GATED)' : 'READY TO BROADCAST'}
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {isAirGapped
              ? 'Offline transactions are safely held in local enclave storage. Toggle to SYNC MODE to broadcast.'
              : 'Network active! Submit accumulated offline vouchers to Tether WDK Polygon testnet.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAirGapped ? (
            <button
              onClick={onToggleAirGap}
              className="btn-tactile text-xs py-1.5 px-3 text-amber-400 border-amber-500/30"
            >
              <span>CONNECT NETWORK TO SYNC</span>
            </button>
          ) : (
            <button
              onClick={handleBroadcastQueue}
              disabled={isBroadcasting}
              className="btn-tactile btn-primary text-xs py-2 px-4"
            >
              <Send className="w-4 h-4 text-[#031310]" />
              <span>{isBroadcasting ? 'BROADCASTING BATCH...' : 'SUBMIT BATCH TO ON-CHAIN RPC'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Broadcast Result Feedback */}
      {broadcastResult && (
        <div className="panel-industrial p-4 border border-blue-500/30 bg-[#070d18] space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>BATCH BROADCAST CONFIRMED ON-CHAIN (TETHER WDK)</span>
          </div>
          <p className="text-neutral-300">
            Successfully cleared {broadcastResult.settledCount} vouchers onto Polygon Testnet.
          </p>
          <div className="space-y-1 pt-1 text-[11px] text-neutral-400">
            {broadcastResult.hashes.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[#00d1b2]">Tx #{i + 1}:</span>
                <span className="truncate">{h}</span>
                <span className="text-[10px] text-blue-400 flex items-center gap-1 cursor-pointer">
                  <ExternalLink className="w-3 h-3" /> Polygonscan
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal with Real Scannable SVG QR */}
      {showQrModal && activeDraft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="panel-industrial max-w-md w-full p-6 space-y-4 border-2 border-[#00d1b2]/40 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#00d1b2]" />
                <h3 className="font-mono text-sm font-bold text-white">PEARS P2P OFFLINE VOUCHER QR</h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-neutral-400 hover:text-white font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
              {/* Scanline Laser Bar */}
              <div className="scanline-bar"></div>

              {/* REAL SCANNABLE QR CODE */}
              <QRCodeSVG
                value={activeDraft.rawPayload}
                size={210}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />

              <div className="mt-3 text-center font-mono text-[10px] text-neutral-800 font-bold">
                KIBANDAPAY • PEARS P2P • {activeDraft.amountUsdt.toFixed(2)} USDt • NONCE #{activeDraft.nonce}
              </div>
            </div>

            <p className="text-xs text-neutral-400 text-center font-mono">
              Mama Mboga points her phone camera at this QR code in Merchant POS mode. No internet or cellular connection required!
            </p>

            <div className="pt-2 flex justify-between gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeDraft.rawPayload);
                  setCopiedPayload(true);
                  setTimeout(() => setCopiedPayload(false), 2000);
                }}
                className="btn-tactile text-xs flex-1 justify-center"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'COPIED PAYLOAD' : 'COPY VOUCHER JSON'}</span>
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="btn-tactile btn-mint text-xs px-4"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
