import { useState } from "react";
import { useFinanceStore } from "../store/financeStore";
import Button from "./sub-components/Button"

export default function BudgetProgress() {
    const transactions = useFinanceStore((s) => s.transactions);
    const budgetData = useFinanceStore((s) => s.budgets);
    const updateBudget = useFinanceStore((s) => s.updateBudget);
    const cancelBudget = useFinanceStore((s) => s.cancelBudget);    
    const setBudget = useFinanceStore((s) => s.setBudget);
    const currentMonth = new Date().toISOString().slice(0, 7);

    const activeBudget = (budgetData?.month === currentMonth) ? budgetData.amount : null;

    const spent = transactions
        .filter(
            (t) =>
            t.type === "expense" &&
            t.date?.slice(0, 7) === budgetData?.month
        ).reduce((sum, t) => sum + t.amount, 0);

    const [showInput, setShowInput] = useState(false);
    const [input, setInput] = useState("");

    const handleSave = () => {
        if (input && Number(input) > 0) {
        setBudget(input);
        setShowInput(false);
        }
    };

  if (!activeBudget) {
    return (
      <div className="flex flex-col items-start space-y-2 p-4 border border-gray-300 rounded-xl my-4">
        <h1 className="text-xl mb-2 text-gray-800 font-semibold">Monthly Budget</h1>

        {showInput ? (
          <div className="flex flex-col w-8/12 mx-auto items-center space-x-2">
            <input
              type="number"
              placeholder="Set monthly budget"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              min={1}
              className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 mb-4 w-full"
            />
            <div className="flex">
                <button
                onClick={handleSave}
                className="bg-teal-500 w-fit text-white px-6 py-2 mx-auto rounded-lg hover:bg-teal-600"
                >
                Save
                </button>
                <button
                    onClick={() => setShowInput(false)}
                    className="bg-red-500 w-fit text-white px-6 py-2 mx-auto ms-2 rounded-lg hover:bg-red-600"
                >
                    Cancel
                </button>  
            </div>
          </div>
        ) : (
            <>
                <div className="text-gray-400 italic mx-auto mb-2">No budget for the month</div>
                <Button onClickFn={() => setShowInput(true)} textValue={"Set Budget"}/>
            </>
        )}
      </div>
    );
  }

  const percentage = Math.min((spent / activeBudget) * 100, 100);

  return (
    <div className="w-full flex flex-col items-start space-y-2 p-4 border border-gray-300 rounded-xl my-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">Monthly Budget</span>
        <span className="text-xs text-gray-500 mx-4">
          ${spent} / ${activeBudget}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-3 rounded-full ${
            percentage > 90
              ? "bg-red-500"
              : percentage > 70
              ? "bg-yellow-400"
              : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="my-2">
        <Button onClickFn={updateBudget} textValue={"Change Budget"} className={'me-2'}/>
        <Button onClickFn={cancelBudget} type="cancel" textValue={"Cancel Budget"}/>
      </div>
    </div>
  );
}