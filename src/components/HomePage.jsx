import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const API_URL = "https://expenselogger-backendpvt.onrender.com/api";
// const API_URL = "http://localhost:5000/api";

function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLatestExpenses();
  }, []);

  const fetchLatestExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/expenses/latest`);
      setExpenses(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, expense);
      setExpenses([response.data, ...expenses.slice(0, 4)]);
      setError(null);
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense. Please try again.");
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <div className="loading-message">Loading expenses...</div>
      ) : (
        <>
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList expenses={expenses} />
        </>
      )}
    </div>
  );
}

export default HomePage;
