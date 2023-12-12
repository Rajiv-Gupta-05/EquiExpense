import React from "react";
import { format, isToday } from "date-fns";
import "./Bootstrap/ExpenseList.css";

const ExpenseList = ({ expenses, friends }) => {
  const formatExpenseDate = (timestamp) => {
    const expenseDate = new Date(timestamp);

    if (isToday(expenseDate)) {
      return format(expenseDate, "'Today - 'hh:mm a");
    }

    return format(expenseDate, "do MMM - hh:mm a");
  };

  const expenseDescriptionStyle = {
    textAlign: "left",
  };

  // Sort expenses by timestamp in descending order
  const sortedExpenses = expenses.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="expenselist-container">
      <h3>
        Shared Among Friends: <i className="fa-solid fa-share-from-square"></i>
      </h3>
      {sortedExpenses.map((expense) => (
        <div key={expense.id}>
          <p style={expenseDescriptionStyle}>
            <strong>
              <i>{expense.description}</i>:
            </strong>{" "}
            {Object.entries(expense.friendShares).map(([friendId, share]) => (
              <span key={friendId}>
                {friends.find((friend) => friend.id === friendId)?.name}:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: share % 1 !== 0 ? 2 : 0,
                  maximumFractionDigits: share % 1 !== 0 ? 2 : 0,
                }).format(share)}
                {" | "}
              </span>
            ))}
            <span className="total-expense">
              Total Expense:{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(expense.amount)}
            </span>
            <p className="expense-date">
              <small> <i class="fa-solid fa-clock"></i> {formatExpenseDate(expense.timestamp)}</small>
            </p>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
