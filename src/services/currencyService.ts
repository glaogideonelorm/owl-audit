import { Currency, CurrencyInfo } from "@types/index";

// Real-time exchange rates (you would typically fetch these from an API)
const EXCHANGE_RATES: Record<Currency, CurrencyInfo> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rate: 1.0, // Base currency
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rate: 0.85, // 1 USD = 0.85 EUR
  },
  GHS: {
    code: "GHS",
    symbol: "₵",
    name: "Ghanaian Cedi",
    rate: 12.1, // 1 USD = 12.10 GHS
  },
  NGN: {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    rate: 1605.0, // 1 USD = 1605 NGN
  },
};

export class CurrencyService {
  private static instance: CurrencyService;

  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  getAllCurrencies(): CurrencyInfo[] {
    return Object.values(EXCHANGE_RATES);
  }

  getCurrencyInfo(code: Currency): CurrencyInfo {
    return EXCHANGE_RATES[code];
  }

  // Convert amount from one currency to another
  convert(
    amount: number,
    fromCurrency: Currency,
    toCurrency: Currency
  ): number {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = EXCHANGE_RATES[fromCurrency].rate;
    const toRate = EXCHANGE_RATES[toCurrency].rate;

    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    const convertedAmount = usdAmount * toRate;

    return Math.round(convertedAmount * 100) / 100; // Round to 2 decimal places
  }

  // Format amount with currency symbol
  formatAmount(amount: number, currency: Currency): string {
    const currencyInfo = this.getCurrencyInfo(currency);
    const formattedAmount = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: currency === "NGN" ? 0 : 2,
      maximumFractionDigits: currency === "NGN" ? 0 : 2,
    }).format(amount);

    return `${currencyInfo.symbol} ${formattedAmount}`;
  }

  // Update exchange rates (in a real app, this would fetch from an API)
  async updateExchangeRates(): Promise<void> {
    try {
      // In a real implementation, you would fetch from an API like:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      // const data = await response.json();
      // Update EXCHANGE_RATES with fresh data

      console.log("Exchange rates updated (mock)");
    } catch (error) {
      console.error("Failed to update exchange rates:", error);
    }
  }
}

export const currencyService = CurrencyService.getInstance();

