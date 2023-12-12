import React from "react";

const FriendExpenseDetails = ({ friend, amount }) => {
  return (
    <div>
      <strong>{friend.name}:</strong> {amount}
    </div>
  );
};

export default FriendExpenseDetails;
