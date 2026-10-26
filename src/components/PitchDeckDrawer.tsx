import { useState } from 'react';
import { Presentation, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PitchDeckDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckDrawer = ({ isOpen, onClose }: PitchDeckDrawerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '01 / THE PROBLEM',
      subtitle: 'Cellular Downtime Cripples Nairobi Street Commerce',
      body: 'In East Africa, millions of street vendors (Mama Mboga, bodabodas, food stalls) rely on digital transactions. When internet infrastructure drops or mobile data runs out, sales immediately freeze, forcing merchants into risky paper credit or lost revenue.',
      metric: 'Over 40% of micro-merchants experience weekly connectivity interruptions.'
    },
    {
      title: '02 / THE SOLUTION',
      subtitle: 'KibandaPay: Autonomous Offline Voice & Financial Agent',
      body: 'We combine Tether QVAC on-device AI with Tether WDK self-custodial wallets. Customers speak natural Swahili, the local AI extracts the intent, and Tether WDK signs an air-gapped cryptographic payment voucher with deterministic nonces.',
      metric: '100% functional with zero internet connection or cellular signal.'
    },
    {
      title: '03 / P2P SETTLEMENT',
      subtitle: 'Pears High-Density Dynamic QR Transmission',
      body: 'Value is transferred device-to-device through animated QR codes or Bluetooth/NFC. The merchant POS terminal verifies the cryptographic signature offline against the customer address and credits the merchant balance immediately.',
      metric: 'Instant settlement verification in under 30 milliseconds.'
    },
    {
      title: '04 / DOUBLE-SPENDING DEFENSE',
      subtitle: 'Strict Hardware-Enclave Nonce Reservation',
      body: 'Every offline voucher increments a hardware-enforced sequence nonce. Spendable balances are immediately locked in local enclave memory, preventing duplicate issuance before deferred batch broadcast occurs on-chain.',
      metric: 'Cryptographic finality guaranteed before network reconnection.'
    },
    {
      title: '05 / TETHER STACK SYNERGY',
      subtitle: 'QVAC + WDK + Pears Trinity',
      body: 'QVAC provides 0-cloud latency intelligence in Swahili and English. Tether WDK delivers self-custodial key isolation. Pears enables peer-to-peer air-gapped communication. Together, they create true digital sovereignty.',
      metric: '$0 monthly token costs for emerging market entrepreneurs.'
    },
    {
      title: '06 / ROADMAP & TRACTION',
      subtitle: 'From Nairobi Kiosks to Cross-Border Trade',
      body: 'Phase 1: Pilot in Nairobi market stalls (Gikomba & Toi Market). Phase 2: Mesh network sync via Holepunch/Keet. Phase 3: Hardware POS terminal on Raspberry Pi 5 with thermal receipt printer.',
      metric: 'Targeting 10,000 kiosks across Kenya, Tanzania, and Rwanda.'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="panel-industrial max-w-2xl w-full p-6 space-y-6 border border-white/20 relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-[#00d1b2]" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              PRODUCT KEYNOTE & ARCHITECTURE DECK (SLIDE {currentSlide + 1} OF {slides.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white font-mono text-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="min-h-[220px] flex flex-col justify-between space-y-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#00d1b2] block mb-1">
              {slides[currentSlide].title}
            </span>
            <h2 className="text-xl font-bold text-white font-sans">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-sm text-neutral-300 font-sans mt-3 leading-relaxed">
              {slides[currentSlide].body}
            </p>
          </div>

          <div className="bg-[#12141a] p-3 rounded border border-white/5 font-mono text-xs text-amber-400">
            ★ {slides[currentSlide].metric}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="btn-tactile text-xs py-1.5 px-3 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREVIOUS</span>
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentSlide ? 'bg-[#00d1b2]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="btn-tactile btn-mint text-xs py-1.5 px-3 disabled:opacity-30"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
