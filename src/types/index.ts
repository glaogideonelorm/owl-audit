export type Priority = "High" | "Medium" | "Low";

export type Recommendation = {
  id: string;
  title: string;
  note: string;
  priority: Priority;
};

export type FileItem = {
  id: string;
  name: string;
  sizeMB: number;
  type: "receipt" | "bill" | "inventory" | "payroll";
};

export type Audit = {
  id: string;
  title: string;
  date: string; // ISO
  status: "Completed" | "Pending";
};

export type Snapshot = {
  revenue: number;
  expenses: number;
};

export type Currency = "NGN" | "EUR" | "USD" | "GHS";
export type Language = "en" | "fr";

export type Settings = {
  push: boolean;
  email: boolean;
  autoBackup: boolean;
  darkMode: boolean;
  currency: Currency;
  language: Language;
};

export type CurrencyInfo = {
  code: Currency;
  symbol: string;
  name: string;
  rate: number; // Rate to USD
};

export type LanguageInfo = {
  code: Language;
  name: string;
  flag: string;
};
