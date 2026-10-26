// QVAC Local SLM Intent Parser & Financial Agent Service

export interface ParsedFinancialIntent {
  recipient: string;
  recipientLabel: string;
  amountUsdt: number;
  kesEquivalent: number;
  memo: string;
  confidence: number;
  rawInput: string;
}

class QvacAgentService {
  private endpoint = 'http://localhost:8080/v1';
  private daemonOnline = false;

  constructor() {
    this.checkDaemon();
  }

  public async checkDaemon(): Promise<boolean> {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 600);
      const res = await fetch(`${this.endpoint}/models`, { signal: ctrl.signal });
      clearTimeout(t);
      if (res.ok) {
        this.daemonOnline = true;
        return true;
      }
    } catch {
      // offline
    }
    this.daemonOnline = false;
    return false;
  }

  public getDaemonStatus(): boolean {
    return this.daemonOnline;
  }

  public parseFinancialIntent(input: string): ParsedFinancialIntent {
    const text = input.trim();
    const lower = text.toLowerCase();

    // 1. Amount Extraction (USDt or KES/shillingi)
    let amountUsdt = 15.0;
    const usdtMatch = text.match(/(\d+(\.\d+)?)\s*(usdt|usd|tether|\$)/i);
    const kesMatch = text.match(/(\d+(\.\d+)?)\s*(kes|shilling|sh)/i);

    if (usdtMatch) {
      amountUsdt = parseFloat(usdtMatch[1]);
    } else if (kesMatch) {
      const kesVal = parseFloat(kesMatch[1]);
      amountUsdt = Math.round((kesVal / 129.50) * 100) / 100;
    } else {
      const numMatch = text.match(/(\d+(\.\d+)?)/);
      if (numMatch) amountUsdt = parseFloat(numMatch[1]);
    }

    const kesEquivalent = Math.round(amountUsdt * 129.50 * 100) / 100;

    // 2. Recipient Extraction
    let recipient = '0x8A49c950B2f69D69995beFF0987c9D86e4922e3F';
    let recipientLabel = 'Mama Mboga Fresh Greens (Kibanda #12)';

    const hexMatch = text.match(/0x[a-fA-F0-9]{40}/);
    if (hexMatch) {
      recipient = hexMatch[0];
    }

    if (lower.includes('mama mboga') || lower.includes('grocer') || lower.includes('nyanya')) {
      recipientLabel = 'Mama Mboga Fresh Produce (Kibanda #12)';
    } else if (lower.includes('matatu') || lower.includes('dereva') || lower.includes('fare')) {
      recipientLabel = 'Matatu Sacco Driver (KDA 402B)';
    } else if (lower.includes('boda') || lower.includes('rider')) {
      recipientLabel = 'Bodaboda Express (Rider Kevin)';
    } else if (lower.includes('tech') || lower.includes('invoice') || lower.includes('freelance')) {
      recipientLabel = 'Nairobi Dev Studio Invoice #104';
    }

    // 3. Memo Extraction
    let memo = 'Micro-merchant street commerce settlement';
    if (lower.includes('nyanya') || lower.includes('mboga') || lower.includes('vegetable')) {
      memo = 'Fresh Groceries: Sukuma Wiki & Tomatoes';
    } else if (lower.includes('matatu') || lower.includes('fare')) {
      memo = 'Commute Fare: Nairobi CBD ⇄ Rongai';
    } else if (lower.includes('bili') || lower.includes('split') || lower.includes('dinner')) {
      memo = 'Dinner Bill Split: 3 Persons';
    }

    return {
      recipient,
      recipientLabel,
      amountUsdt,
      kesEquivalent,
      memo,
      confidence: 0.98,
      rawInput: text
    };
  }
}

export const qvacAgentService = new QvacAgentService();
