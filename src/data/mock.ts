
import { Recommendation, Audit, Snapshot, FileItem } from '../types/index';

export const mockSnapshot: Snapshot = {
  revenue: 106435,
  expenses: 50435,
};

export const mockRecommendations: Recommendation[] = [
  { id: 'rec1', title: 'Cut Utility Costs', note: 'Bills increased 12% from last month', priority: 'High' },
  { id: 'rec2', title: 'Inventory Management', note: 'Consider discounting slow-moving items', priority: 'Medium' },
  { id: 'rec3', title: 'Optimize Payment Terms', note: 'Negotiate payment with suppliers to improve cash flow', priority: 'Low' },
];

export const mockAudits: Audit[] = [
  { id: 'a1', title: 'August Audit Report', date: '2023-08-25', status: 'Completed' },
  { id: 'a2', title: 'September Audit Report', date: '2023-09-25', status: 'Pending' },
  { id: 'a3', title: 'August Audit Report', date: '2023-08-25', status: 'Completed' },
  { id: 'a4', title: 'August Audit Report', date: '2023-08-25', status: 'Completed' },
];

export const mockDrafts: Audit[] = [
  { id: 'd1', title: 'August Audit', date: '2023-08-25', status: 'Pending' },
  { id: 'd2', title: 'August Audit', date: '2023-08-25', status: 'Pending' },
];

export const initialFiles: FileItem[] = [
  { id: 'f1', name: 'Receipt.pdf', sizeMB: 2, type: 'receipt' },
  { id: 'f2', name: 'Receipt.pdf', sizeMB: 2, type: 'receipt' },
];
