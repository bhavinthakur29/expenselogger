import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseList from "./ExpenseList";

const API_URL = "http://localhost:5000/api";

function AllExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const fetchAllExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/expenses`);
      setExpenses(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>All Expenses</h2>
      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <div className="loading-message">Loading expenses...</div>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </div>
  );
}

export default AllExpensesPage;
