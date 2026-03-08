export function calculateTotals(transactions) {
  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function getMonthTotals(transactions, monthOffset = 0) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + monthOffset);

  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    const d = new Date(t.date);

    if (
      d.getMonth() === target.getMonth() &&
      d.getFullYear() === target.getFullYear()
    ) {
      if (t.type === "income") income += t.amount;
      else expenses += t.amount;
    }
  });

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function buildMonthlyTrend(transactions, type) {
  const months = [];

  for (let i = -5; i <= 0; i++) {
    const totals = getMonthTotals(transactions, i);

    months.push({
      month: i,
      value: totals[type],
    });
  }

  return months;
}

export const getMonthlySpending = (transactions) => {
  const monthlyTotals = {};

  transactions.forEach((t) => {
    if (t.type !== "expense") return;

    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });

    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(t.amount);
  });

  return Object.entries(monthlyTotals).map(([name, value]) => ({
    name,
    value,
  }));
};