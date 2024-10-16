import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !amount) return;
    onAddExpense({ item, amount: parseFloat(amount) });
    setItem("");
    setAmount("");
  };

  return (
    <div className="logger">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="item">Spent for:</label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
