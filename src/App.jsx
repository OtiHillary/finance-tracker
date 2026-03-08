import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";
import BudgetProgress from "./components/Budget";
import { Plus, XIcon } from "lucide-react";
import { useFinanceStore } from "./store/financeStore";

export default function App() {
  const showModal = useFinanceStore((s) => s.showTransactionModal);
  const openModal = useFinanceStore((s) => s.openTransactionModal);
  const closeModal = useFinanceStore((s) => s.closeTransactionModal);

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-6 text-teal-500">
        Personal Finance Snapshot
      </h1>

      <Dashboard />
      <BudgetProgress />
      <Charts />
      <TransactionList />

      <button
        onClick={openModal}
        className="fixed flex justify-center items-center bottom-6 right-6 bg-teal-500 text-white w-14 h-14 rounded-full text-3xl shadow-lg hover:bg-teal-600"
      >
        <Plus size={25}/>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 p-2 hover:text-red-500 hover:bg-red-50 rounded-full text-xl"
            >
              <XIcon strokeWidth = {4} size = {15}/>
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Add Transaction
            </h2>

            <AddTransaction />

          </div>

        </div>
      )}
    </div>
  );
}