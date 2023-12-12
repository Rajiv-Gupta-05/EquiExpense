import React from "react";
import "./Bootstrap/FriendList.css";

const FriendList = ({ friends, expenses }) => {
  const calculateFriendTotal = (friendId) => {
    if (!expenses) {
      return 0;
    }

    const totalExpenses = expenses.reduce((acc, expense) => {
      return acc + (expense.friendShares[friendId] || 0);
    }, 0);

    const settledAmount =
      friends.find((friend) => friend.id === friendId)?.settledAmount || 0;

    const total = totalExpenses - settledAmount;

    const hasDecimals = total % 1 !== 0;

    const formattedTotal = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    }).format(total);
   
    const textColorClass = total >= 0 ? "text-1" : "text-2";

    return { formattedTotal, textColorClass };
  };

  return (
    <div>
      <h2>
        Friends <i className="fas fa-users"></i>
      </h2>
      <ul>
        {friends.map((friend) => {
          const { formattedTotal, textColorClass } = calculateFriendTotal(friend.id);

          return (
            <li key={friend.id}>
              <strong className={textColorClass}>{friend.name}</strong>
              <p>
                Total Expenses:{" "}
                <span className={textColorClass}>
                  {formattedTotal}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendList;
