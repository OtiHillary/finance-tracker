import { useState } from "react";
import { useFinanceStore } from "../store/financeStore";
import { v4 as uuid } from "uuid";

export default function AddTransaction() {
  const addTransaction = useFinanceStore((s) => s.addTransaction);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tx = {
      id: uuid(),
      type,
      amount: Number(amount),
      category,
      description,
      date,
    };

    addTransaction(tx);

    setAmount("");
    setDescription("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={1}
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      >
        <option>Food</option>
        <option>Housing</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Utilities</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      />

      <button className="bg-teal-500 text-white px-4 py-2 my-3 rounded-lg hover:bg-teal-600">
        Add Transaction
      </button>

    </form>
  );
}