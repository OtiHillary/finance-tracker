import { useState } from "react";
import { useFinanceStore } from "../store/financeStore";
import { getCategoryIcon } from "../utils/categoryIcon"
import { formatNumber } from "../utils/formatter";
import { Trash2 } from "lucide-react";
import Button from "./sub-components/Button";

export default function TransactionList() {
  const transactions = useFinanceStore((s) => s.transactions);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);
  const openModal = useFinanceStore((s) => s.openTransactionModal);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // const filteredTransactions =
  //   filter === "all"
  //     ? transactions
  //     : transactions.filter((t) => t.type === filter);

  const filteredTransactions = transactions.filter((t) => {
  const typeMatch = filter === "all" || t.type === filter;

  const categoryMatch =
    categoryFilter === "all" || t.category === categoryFilter;

  return typeMatch && categoryMatch;
});

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="mt-6 rounded-xl border border-gray-300 p-5">
      <h2 className="text-xl mb-2 text-gray-800 font-semibold">
        Transactions
      </h2>

      {/*//Filter categories */}
      <div className="flex gap-1.5 mb-1.5">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded-full text-xs ${
            filter === "all" ? "bg-teal-100 text-teal-500" : "bg-gray-100 text-gray-500"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("expense")}

          className={`px-3 py-1 rounded-full text-xs ${
            filter === "expense" ? "bg-teal-100 text-teal-500" : "bg-gray-100 text-gray-500"
          }`}
        >
          Expenses
        </button>

        <button
          onClick={() => setFilter("income")}

          className={`px-3 py-1 rounded-full text-xs ${
            filter === "income" ? "bg-teal-100 text-teal-500" : "bg-gray-100 text-gray-500"
          }`}
        >
          Income
        </button>
      </div>

	<hr className="border-gray-200 w-full my-2"/>

<div className="flex gap-1.5 mb-4 flex-wrap">
  {["all", "Food", "Housing", "Transport", "Entertainment", "Utilities"].map(
    (cat) => (
      <button
        key={cat}
        onClick={() => setCategoryFilter(cat)}
        className={`px-3 py-1 rounded-full text-xs ${
          categoryFilter === cat
            ? "bg-teal-100 text-teal-500"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {cat}
      </button>
    )
  )}
</div>
      {/*//Filter categories END*/}

        {
          transactions.length?        
            sortedTransactions.map((t) => {
                const date = new Date(t.date);

                const formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });

                const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                return (
                    <div
                    key={t.id}
                    className="flex items-center justify-between py-3"
                    >

                    {/* Description */}
                    <div className="w-2/4 flex justify-start">
                        {getCategoryIcon(t.category)}
                        <div className="flex flex-col ms-1">
                            <span className="font-semibold">{t.description}</span>
                            <span className="text-xs text-gray-500">{t.category}</span>
                        </div>                
                    </div>


                    {/* Date */}
                    <div className="w-1/3 flex flex-col items-start">
                        <div className="text-sm">{formattedDate}</div>
                        <div className="text-xs text-gray-500">At {formattedTime}</div>
                    </div>

                    {/* Amount */}
                    <div
                        className={`w-1/6 items-start font-light text-${ t.type == "expense"? "red" : "teal"}-500 text-lg`}
                    >
                      {t.type == "expense"? "-":"+"}
                      {formatNumber(t.amount)}
                    </div>

                    {/* Delete */}
                    <div className="w-1/6">

                    </div>
                    <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-500 p-2 rounded-full text-sm bg-red-50 hover:bg-red-100"
                    >
                        <Trash2 size={14}/>
                    </button>

                    </div>
                );
            })
          : <div className="w-full flex flex-col justify-center ">
              <i className="text-xl text-gray-400 mx-auto my-4">No transactions added yet</i>

              <Button textValue={'Add Transaction'} onClickFn={openModal}/>
            </div>
        }
    </div>
  );
}