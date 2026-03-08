import { TrendingDown, TrendingUp } from "lucide-react";
import { useFinanceStore } from "../store/financeStore";
import { getMonthTotals, buildMonthlyTrend } from "../utils/calculations";
import { formatNumber } from "../utils/formatter";
import { LineChart, Line } from "recharts";

export default function Dashboard() {
    const transactions = useFinanceStore((s) => s.transactions);

    const getPercentageChange = (current, previous) => {
        if (previous === 0) return 100; // avoid divide-by-zero
        return ((current - previous) / previous) * 100;
    };

    const current = getMonthTotals(transactions, 0);
    const previous = getMonthTotals(transactions, -1);

    const incomeChange = getPercentageChange(current.income, previous.income);
    const expenseChange = getPercentageChange(current.expenses, previous.expenses);
    const balanceChange = getPercentageChange(current.balance, previous.balance);

    const incomeTrend = buildMonthlyTrend(transactions, "income");
    const expenseTrend = buildMonthlyTrend(transactions, "expenses");
    const balanceTrend = buildMonthlyTrend(transactions, "balance");

    const renderChange = (value) => {
        const positive = value >= 0;

        return (
            <span className={`text-xs ${positive ? "text-green-600" : "text-red-600"} flex items-center gap-1`}>
            {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(value).toFixed(1)}%
            </span>
        );
    };

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

      {/* Income */}
      <div className="border border-gray-300 p-4 rounded-xl flex flex-col justify-evenly items-start">
            <p className="text-sm text-gray-500 mb-4">Income this month</p>

            <div className="flex justify-between">
                <div className="flex flex-col me-4">
                    <p className="text-2xl font-semibold">{formatNumber(current.income)}</p>
                    {renderChange(incomeChange)}
                </div>

                <LineChart width={80} height={40} data={incomeTrend}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </div>
      </div>

      {/* Expenses */}
      <div className="border border-gray-300 p-4 rounded-xl flex flex-col justify-evenly items-start">
            <p className="text-sm text-gray-500 mb-4">Expenses this month</p>

            <div className="flex justify-between">
                <div className="flex flex-col me-4">
                    <p className="text-3xl font-semibold">{formatNumber(current.expenses)}</p>
                    {renderChange(expenseChange)}
                </div>

                <LineChart width={80} height={40} data={expenseTrend}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>                
            </div>
      </div>

      {/* Balance */}
      <div className="border border-gray-300 p-4 rounded-xl flex flex-col justify-evenly items-start">
            <p className="text-sm text-gray-500 mb-4">Total Balance</p>

            <div className="flex justify-between">
                <div className="flex flex-col me-4">
                    <p className="text-3xl font-semibold">{formatNumber(current.balance)}</p>
                    {renderChange(balanceChange)}
                </div>

                <LineChart width={80} height={40} data={balanceTrend}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                />
                </LineChart>
            </div>
      </div>

    </div>
  );
}