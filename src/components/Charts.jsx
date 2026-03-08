import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { useFinanceStore } from "../store/financeStore";
import { getMonthlySpending } from "../utils/calculations";

export default function Charts() {
  const transactions = useFinanceStore((s) => s.transactions);
  const data = getMonthlySpending(transactions);
  console.log(data)

  const formatYAxis = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
    return `$${value}`;
  };

  return (
    <div className="rounded-xl p-4 mb-4 border border-gray-200">
      <h2 className="text-xl mx-2 mb-5 text-gray-800 font-semibold">
        Monthly spending
      </h2>

      {
        data.length?
          <div className="w-full h-50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>

                <defs>
                  <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid horizontal={true} vertical={false} />

                <XAxis dataKey="name" tick={{fontSize: '10px'}} axisLine={false} tickLine={false} tickMargin={10}/>

                <YAxis  tick={{fontSize: '10px'}} axisLine={false} tickLine={false} tickMargin={10} tickFormatter={formatYAxis} />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#spendingGradient)"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>            

        : <i className="w-full flex text-xl text-gray-400 justify-center mx-auto my-4">No Expenses recorded yet</i>
      }


    </div>

  );
}

