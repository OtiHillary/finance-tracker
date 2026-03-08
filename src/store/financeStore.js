import { create } from "zustand";

export const useFinanceStore = create((set) => ({
  transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),

  budgets: (() => {
    try {
      return JSON.parse(localStorage.getItem("budgets")) || {};
    } catch {
      localStorage.removeItem("budgets");
      return {};
    }
  })(),

  // this is for UI State, for modal in the App component
  showTransactionModal: false,

  openTransactionModal: () => set({ showTransactionModal: true }),
  closeTransactionModal: () => set({ showTransactionModal: false }),

  addTransaction: (tx) =>
    set((state) => {
      const updated = [...state.transactions, tx];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  setBudget: (amount) =>
    set(() => {
      const currentMonth = new Date().toISOString().slice(0, 7); // "2026-03"

      const updated = {
        month: currentMonth,
        amount: Number(amount),
      };

      localStorage.setItem("budgets", JSON.stringify(updated));

      return { budgets: updated };
    }),

  updateBudget: (amount) =>
    set((state) => {
      if (!state.budgets?.month) return state;

      const updated = {
        ...state.budgets,
        amount: Number(amount),
      };

      localStorage.setItem("budgets", JSON.stringify(updated));

      return { budgets: updated };
    }),

  cancelBudget: () =>
    set(() => {
      localStorage.removeItem("budgets");
      return { budgets: {} };
    }),
}));