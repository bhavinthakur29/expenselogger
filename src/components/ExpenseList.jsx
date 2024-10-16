import React, { useEffect, useState } from "react";

const ExpenseList = ({ expenses }) => {
  const style = {
    listHeaderStyle: {
      backgroundColor: "#141414 ",
      borderRadius: "10px 10px 0 0",
    },
    listItemStyle: {
      textTransform: "uppercase",
      color: "white",
      fontWeight: "900",
      fontSize: "20px",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    delBtn: {
      maxWidth: '20px',
      backgroundColor: 'red',
      position: 'relative',
      right: '30px'
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Initial check on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="expense-list">
      <ol reversed>
        {!isMobile && (
          <div className="mobile-hidden-div">
            <li style={style.listHeaderStyle}>
              <span style={style.listItemStyle}>description</span>
              <span style={style.listItemStyle}>amount</span>
              <span style={style.listItemStyle}>date</span>
            </li>
          </div>
        )}

        {expenses.map((expense) => (
          <li key={expense._id}>
            <span style={style.delBtn}>
              <i class="fa-solid fa-trash"></i>
            </span>
            <span>{expense.item}</span>
            <span>₹{expense.amount.toFixed(2)}</span>
            <span>{new Date(expense.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ExpenseList;
