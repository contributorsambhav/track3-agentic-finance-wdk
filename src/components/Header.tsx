import { Shield, Cpu, WifiOff, Store } from 'lucide-react';
import { wdkService } from '../services/wdkService';

interface HeaderProps {
  isAirGapped: boolean;
  onToggleAirGap: () => void;
  activeRole: 'customer' | 'merchant';
  onSelectRole: (role: 'customer' | 'merchant') => void;
}

export const Header = ({ isAirGapped, onToggleAirGap, activeRole, onSelectRole }: HeaderProps) => {
  const wallet = wdkService.getWallet();

  return (
    <header className="border-b border-white/10 bg-[#0b0c10]/95 backdrop-blur-md sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Product Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#00d1b2]/10 border border-[#00d1b2]/30 flex items-center justify-center text-[#00d1b2]">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white font-mono text-base">KIBANDAPAY WDK</span>
              <span className="text-[10px] bg-[#00d1b2]/15 text-[#00d1b2] border border-[#00d1b2]/30 px-1.5 py-0.5 rounded font-mono font-bold">
                OFFLINE AGENTIC SYSTEM
              </span>
            </div>
            <p className="text-xs text-neutral-400">Offline Voice & Self-Custodial Payment Agent for Emerging Market Micro-Merchants</p>
          </div>
        </div>

        {/* Role Switcher & Airgap Switch */}
        <div className="flex items-center gap-3">
          {/* Role Pills */}
          <div className="bg-[#12141a] p-1 rounded border border-white/10 flex items-center font-mono text-xs">
            <button
              onClick={() => onSelectRole('customer')}
              className={`px-3 py-1 rounded cursor-pointer transition-all ${
                activeRole === 'customer'
                  ? 'bg-[#00d1b2] text-[#031310] font-bold shadow-[0_0_12px_rgba(0,209,178,0.3)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              CUSTOMER AGENT
            </button>
            <button
              onClick={() => onSelectRole('merchant')}
              className={`px-3 py-1 rounded cursor-pointer transition-all ${
                activeRole === 'merchant'
                  ? 'bg-[#ff761c] text-white font-bold shadow-[0_0_12px_rgba(255,118,28,0.3)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              MERCHANT POS
            </button>
          </div>

          {/* Enclave Balance */}
          <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded font-mono text-xs">
            <span className="text-neutral-500">WDK BALANCE:</span>
            <span className="text-[#00d1b2] font-bold">{wallet.balanceUsdt.toFixed(2)} USDt</span>
          </div>

          {/* Airgap Button */}
          <button
            onClick={onToggleAirGap}
            className={`cursor-pointer border px-3 py-1.5 rounded font-mono text-xs flex items-center gap-2 transition-all ${
              isAirGapped
                ? 'border-[#00d1b2]/50 text-[#00d1b2] bg-[#00d1b2]/10 shadow-[0_0_15px_rgba(0,209,178,0.2)]'
                : 'border-amber-500/50 text-amber-400 bg-amber-500/10'
            }`}
          >
            {isAirGapped ? <WifiOff className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
            <span className="font-bold">
              {isAirGapped ? 'AIR-GAP ENFORCED (0 PACKETS)' : 'NETWORK MONITOR (ARMED)'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
