import React from "react";
import "./Bootstrap/Summary.css"; // Import your custom CSS file

const Summary = ({ expenses, friends }) => {
  const formatCurrency = (amount) => {
    const hasDecimals = amount % 1 !== 0;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    }).format(amount);
  };

  // Ensure expenses and friends are defined before accessing them
  if (!expenses || !friends) {
    return <p>No data to display</p>;
  }

  // Calculate how much each friend owes you
  const friendBalances = friends.map((friend) => {
    const totalExpenses = expenses.reduce((acc, expense) => {
      const friendShare = expense.friendShares && expense.friendShares[friend.id];
      return acc + (friendShare ? friendShare : 0);
    }, 0);

    const settledAmount = friend.settledAmount || 0;

    return {
      name: friend.name,
      balance: totalExpenses - settledAmount,
    };
  });

  return (
    <div className="summary-container">
      <h2 className="summary-title">Summary: <i className="fa-solid fa-list-check fa-fade"></i></h2>

      <div className="friend-balances-container">
        <h3 className="friend-balances-title">Friend Balances: <i className="fa-solid fa-money-bill-transfer"></i></h3>
        {friendBalances.map((friendBalance) => (
          <p key={friendBalance.name} className="friend-balance-item">
            {friendBalance.balance >= 0 ? (
              <>
              <span className="friend-name text-success">{friendBalance.name}</span>owes{" "}
              <span className="friend-amount">{formatCurrency(friendBalance.balance)}</span> to You
            </>
            ) : (
              <>
                You owed <span className="friend-amount text-danger">
                  {formatCurrency(Math.abs(friendBalance.balance))}
                </span > to <span className="friend-name text-danger">{friendBalance.name}</span>
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Summary;
