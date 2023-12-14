import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./Bootstrap/ExpenseForm.css";
import GroupPopup from "./GroupPopup";

const ExpenseForm = ({ onAddFriend, onAddExpense, onAddGroup, friends }) => {
  const [friendName, setFriendName] = useState("");
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    selectedFriends: [],
    isUnequalSplit: false,
    friendShares: {},
  });

  const [showGroupPopup, setShowGroupPopup] = useState(false);

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

  const handleToggleUnequalSplit = () => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      isUnequalSplit: !prevExpense.isUnequalSplit,
    }));
  };

  const handleSliderChange = (friendId, value) => {
    setExpense((prevExpense) => ({
      ...prevExpense,
      friendShares: {
        ...prevExpense.friendShares,
        [friendId]: value,
      },
    }));
  };

  const handleAddExpense = () => {
    if (expense.description.trim() !== "" && expense.amount > 0) {
      onAddExpense(expense);
      setExpense({
        description: "",
        amount: "",
        selectedFriends: [],
        isUnequalSplit: false,
        friendShares: {},
      });
    }
  };

  const handleShowGroupPopup = () => {
    setShowGroupPopup(true);
  };

  const handleCloseGroupPopup = () => {
    setShowGroupPopup(false);
  };

  return (
    <div className="expense-form-container">
      <h2 className="expense-form-header">
        Add Expense <i className="fas fa-plus-circle"></i>
      </h2>
      <div>
        <label>
          Description: <i className="fa-solid fa-file-pen"></i>
          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleChangeExpense}
          />
        </label>
        <label>
          Amount: <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChangeExpense}
          />
        </label>
        <div className="unequal-split-checkbox">
          <Form.Check
            type="checkbox"
            id="checkbox-unequal-split"
            checked={expense.isUnequalSplit}
            onChange={handleToggleUnequalSplit}
            className="form-check-input"
          />
          <label htmlFor="checkbox-unequal-split" className="form-check-label">
            Unequal Split
          </label>
        </div>
        {expense.isUnequalSplit && (
          <Row>
            {friends.map((friend) => (
              <Col key={friend.id} md={4}>
                <Form.Group controlId={`slider-${friend.id}`}>
                  <Form.Label>{friend.name}</Form.Label>
                  <Form.Control
                    type="range"
                    min="0"
                    max={expense.amount}
                    step="1"
                    value={expense.friendShares[friend.id] || 0}
                    onChange={(e) =>
                      handleSliderChange(friend.id, parseInt(e.target.value))
                    }
                  />
                  <Form.Text>
                    {expense.friendShares[friend.id] || 0} INR
                  </Form.Text>
                </Form.Group>
              </Col>
            ))}
          </Row>
        )}
        <button className="add" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>
      <div>
        <h3>
          Add Friend: <i className="fa-solid fa-person-circle-plus"></i>
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
        <button className="add" onClick={handleShowGroupPopup}>
          Add Group
        </button>
        <GroupPopup
          show={showGroupPopup}
          handleClose={handleCloseGroupPopup}
          onAddGroup={onAddGroup}
        />
      </div>
      <div className="expense-form-group">
        <h3>
          Split Among Friends:{" "}
          <i className="fa-solid fa-arrows-split-up-and-left"></i>
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
              <label
                htmlFor={`checkbox-${friend.id}`}
                className="form-check-label"
              >
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
