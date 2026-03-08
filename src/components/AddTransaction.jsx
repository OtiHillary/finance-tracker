import { useState } from "react";
import { useFinanceStore } from "../store/financeStore";
import { v4 as uuid } from "uuid";
import Button from "./sub-components/Button";

export default function AddTransaction() {
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const closeModal = useFinanceStore((s)=>s.closeTransactionModal);
  const today = new Date().toISOString().split("T")[0];

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
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={1}
        required
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
        required
        max={today}
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border border-gray-300 text-gray-500 focus:border-teal-500 focus:outline-teal-500 rounded-lg p-2 my-1 w-full"
      />

      <Button textValue={"Add Transaction"} className={'mt-3'}/>

    </form>
  );
}