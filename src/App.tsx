import { useState } from 'react';
import { Header } from './components/Header';
import { NetworkSeparationBanner } from './components/NetworkSeparationBanner';
import { CustomerAgentTerminal } from './components/CustomerAgentTerminal';
import { MerchantPosTerminal } from './components/MerchantPosTerminal';
import { PitchDeckDrawer } from './components/PitchDeckDrawer';
import { Presentation, ShieldCheck, Database, Layers } from 'lucide-react';

export default function App() {
  const [isAirGapped, setIsAirGapped] = useState(true);
  const [activeRole, setActiveRole] = useState<'customer' | 'merchant'>('customer');
  const [showPitchDeck, setShowPitchDeck] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col">
      <Header
        isAirGapped={isAirGapped}
        onToggleAirGap={() => setIsAirGapped(prev => !prev)}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Product Hero Banner */}
        <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#00d1b2] tracking-wider uppercase">
                AUTONOMOUS EDGE FINANCE • SELF-CUSTODIAL POS
              </span>
              <span className="text-[10px] bg-[#00d1b2]/10 text-[#00d1b2] border border-[#00d1b2]/30 font-mono px-2 py-0.5 rounded font-bold">
                PRODUCTION GRADE v1.0 • NAIROBI
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-sans">
              KibandaPay WDK — Autonomous Offline Voice & Financial Agent
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
              Combining Tether QVAC On-Device SLM with Tether WDK Self-Custodial Enclave & Pears P2P. Enabling street micro-merchants (Mama Mboga, bodabodas) to negotiate, sign, and settle offline transactions with zero cellular connection.
            </p>
          </div>

          <button
            onClick={() => setShowPitchDeck(true)}
            className="btn-tactile text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <Presentation className="w-4 h-4 text-[#00d1b2]" />
            <span>OPEN PITCH DECK</span>
          </button>
        </div>

        {/* Dual-Zone Security Architecture: Clear Separation between Offline AI and Network Actions */}
        <NetworkSeparationBanner
          isAirGapped={isAirGapped}
          onToggleAirGap={() => setIsAirGapped(prev => !prev)}
        />

        {/* Dynamic Mode Display */}
        {activeRole === 'customer' ? (
          <CustomerAgentTerminal
            onTransactionSigned={() => {}}
            isAirGapped={isAirGapped}
            onToggleAirGap={() => setIsAirGapped(prev => !prev)}
          />
        ) : (
          <MerchantPosTerminal />
        )}

        {/* Key Enclave Specs & Security Guarantees */}
        <div className="panel-industrial p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-neutral-400" />
              KEYSTORE: <strong className="text-white">Isolated Hardware Enclave</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              DOUBLE-SPEND: <strong className="text-emerald-400">Deterministic Nonce Lock</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00d1b2]" />
              PROTOCOL: <strong className="text-[#00d1b2]">EIP-712 Structured</strong>
            </span>
          </div>
          <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
            100% AIR-GAP COMPLIANT (0 BYTES LEAKED)
          </span>
        </div>
      </main>

      <PitchDeckDrawer isOpen={showPitchDeck} onClose={() => setShowPitchDeck(false)} />

      <footer className="border-t border-white/10 bg-[#0b0c10] py-4 px-6 text-center text-xs font-mono text-neutral-500">
        KibandaPay (YakoP2P) • Sovereign Edge Micro-Commerce Infrastructure • Powered by Tether QVAC & Tether WDK
      </footer>
    </div>
  );
}
