import { Shield, WifiOff, Globe, Lock, ArrowRight, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';

interface NetworkSeparationBannerProps {
  isAirGapped: boolean;
  onToggleAirGap: () => void;
}

export const NetworkSeparationBanner = ({ isAirGapped, onToggleAirGap }: NetworkSeparationBannerProps) => {
  return (
    <div className="panel-industrial p-5 space-y-4 border border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#00d1b2]" />
          <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
            DUAL-ZONE SECURITY ARCHITECTURE: AIR-GAPPED OFFLINE AI vs. GATED SETTLEMENT
          </h3>
        </div>

        <button
          onClick={onToggleAirGap}
          className={`cursor-pointer px-3 py-1 rounded font-mono text-xs flex items-center gap-2 border transition-all ${
            isAirGapped
              ? 'bg-[#00d1b2]/10 border-[#00d1b2]/50 text-[#00d1b2] shadow-[0_0_12px_rgba(0,209,178,0.2)]'
              : 'bg-amber-500/10 border-amber-500/50 text-amber-400'
          }`}
        >
          {isAirGapped ? <WifiOff className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
          <span>{isAirGapped ? 'AIR-GAP ENFORCED (STRICT OFFLINE)' : 'NETWORK RECONNECTED (SYNC MODE)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Zone 1: Offline AI & Self-Custody */}
        <div className="bg-[#050608] p-4 rounded-lg border border-[#00d1b2]/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-bold text-[#00d1b2] flex items-center gap-1.5 uppercase">
              <CheckCircle2 className="w-4 h-4" />
              ZONE 1: 100% OFFLINE AIR-GAPPED WORKFLOW
            </span>
            <span className="text-[10px] bg-[#00d1b2]/15 text-[#00d1b2] px-2 py-0.5 rounded font-bold">
              0 BYTES LEAKED
            </span>
          </div>

          <ul className="space-y-1.5 text-neutral-300 text-[11px] leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d1b2]"></span>
              <span><strong>Spoken Voice Input:</strong> Local audio capture via Web Speech API</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d1b2]"></span>
              <span><strong>QVAC Local SLM:</strong> Natural language intent parsed on-device</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d1b2]"></span>
              <span><strong>Tether WDK Keystore:</strong> Private keys isolated in hardware enclave</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d1b2]"></span>
              <span><strong>EIP-712 Voucher Signing:</strong> Deterministic nonces prevent double-spending</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d1b2]"></span>
              <span><strong>Pears P2P Settlement:</strong> Dynamic QR scan & offline POS acceptance</span>
            </li>
          </ul>

          <div className="pt-1 text-[10px] text-emerald-400/90 font-sans italic">
            ✓ Operates seamlessly with airplane mode ON or Ethernet unplugged.
          </div>
        </div>

        {/* Zone 2: Strictly Gated Network Actions */}
        <div className={`p-4 rounded-lg border space-y-3 transition-all ${
          isAirGapped
            ? 'bg-[#090b0e] border-amber-500/20 text-neutral-400'
            : 'bg-[#12141a] border-amber-500/50 text-white'
        }`}>
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className={`font-bold flex items-center gap-1.5 uppercase ${
              isAirGapped ? 'text-amber-400/80' : 'text-amber-400'
            }`}>
              {isAirGapped ? <Lock className="w-4 h-4 text-amber-400" /> : <Globe className="w-4 h-4 text-amber-400" />}
              ZONE 2: GATED NETWORK TRANSACTIONS
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
              isAirGapped
                ? 'bg-amber-500/10 text-amber-400/80 border border-amber-500/20'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isAirGapped ? 'INTERLOCKED (GATED)' : 'ACTIVE / UNLOCKED'}
            </span>
          </div>

          <ul className="space-y-1.5 text-[11px] leading-relaxed">
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isAirGapped ? 'bg-neutral-600' : 'bg-amber-400'}`}></span>
              <span><strong>On-Chain RPC Broadcast:</strong> Atomic batch settlement on Polygon / WDK</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isAirGapped ? 'bg-neutral-600' : 'bg-amber-400'}`}></span>
              <span><strong>Block Explorer Verification:</strong> Polygonscan / Tether ledger sync</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isAirGapped ? 'bg-neutral-600' : 'bg-amber-400'}`}></span>
              <span><strong>Live Price Oracle:</strong> Periodic USDt ⇄ KES exchange rate update</span>
            </li>
          </ul>

          <div className="pt-1 text-[10px] text-amber-400/90 font-sans italic">
            {isAirGapped
              ? '🔒 Network actions are isolated and queued in local enclave storage until you reconnect.'
              : '⚡ Reconnected! Ready to broadcast accumulated offline vouchers to the network.'}
          </div>
        </div>
      </div>
    </div>
  );
};
