import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Bootstrap/ExpenseForm.css";

const ExpenseForm = ({ onAddFriend, onAddExpense, friends }) => {
  const [friendName, setFriendName] = useState("");
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    selectedFriends: [],
  });

  const handleChangeFriend = (e) => {
    setFriendName(e.target.value);
  };

  const handleAddFriend = () => {
    if (friendName.trim() !== "") {
      onAddFriend(friendName);
      setFriendName("");
    }
  };

  const handleChangeExpense = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleToggleFriend = (friendId) => {
    const isSelected = expense.selectedFriends.includes(friendId);
    if (isSelected) {
      setExpense((prevExpense) => ({
        ...prevExpense,
        selectedFriends: prevExpense.selectedFriends.filter(
          (id) => id !== friendId
        ),
      }));
    } else {
      setExpense((prevExpense) => ({
        ...prevExpense,
        selectedFriends: [...prevExpense.selectedFriends, friendId],
      }));
    }
  };

  const handleAddExpense = () => {
    if (expense.description.trim() !== "" && expense.amount > 0) {
      onAddExpense(expense);
      setExpense({
        description: "",
        amount: '',
        selectedFriends: [],
      });
    }
  };

  return (
    <div className="expense-form-container">
      <h2 className="expense-form-header">
        Add Expense <i class="fas fa-plus-circle"></i>
      </h2>
      <div>
        <label>
          Description: <i class="fa-solid fa-file-pen"></i>
          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleChangeExpense}
          />
        </label>
        <label>
          Amount: <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChangeExpense}
          />
        </label>
        <button className="add" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>
      <div>
        <h3>
          Add Friend: <i class="fa-solid fa-person-circle-plus"></i>
        </h3>
        <input
          type="text"
          placeholder="Friend's Name"
          value={friendName}
          onChange={handleChangeFriend}
        />
        <button className="add" onClick={handleAddFriend}>
          Add Friend
        </button>
      </div>
      <div className="expense-form-group">
        <h3>
          Split Among Friends:{" "}
          <i class="fa-solid fa-arrows-split-up-and-left"></i>
        </h3>
        <div className="friend-checkboxes">
          {friends.map((friend) => (
            <div key={friend.id} className="custom-checkbox">
            <Form.Check
              type="checkbox"
              id={`checkbox-${friend.id}`}
              checked={expense.selectedFriends.includes(friend.id)}
              onChange={() => handleToggleFriend(friend.id)}
              className="form-check-input"
            />
            <label htmlFor={`checkbox-${friend.id}`} className="form-check-label">
              {friend.name}
            </label>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
