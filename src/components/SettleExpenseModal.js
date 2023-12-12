import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SettleExpensesModal = ({ friends, onSettle, show, handleClose }) => {
  const [selectedFriend, setSelectedFriend] = useState("");
  const [amount, setAmount] = useState("");

  const handleSettle = () => {
    if (selectedFriend && amount) {
      console.log("Settling expenses: RARARARARARA", selectedFriend, amount);
      onSettle({
        friendId: selectedFriend,
        amount: parseFloat(amount),
      });
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="settle-expenses-modal">
      <Modal.Header closeButton style={{ backgroundColor: "#f39c12", color: "#fff" }}>
        <Modal.Title>Settle Expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#ecf0f1" }}>
        <Form>
          <Form.Group controlId="friendSelect">
            <Form.Label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Select Friend</Form.Label>
            <Form.Control
              as="select"
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
              style={{ borderRadius: "8px", padding: "8px" }}
            >
              <option value="" disabled>Select a friend</option>
              {friends.map((friend) => (
                <option key={friend.id} value={friend.id}>
                  {friend.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="amountInput">
            <Form.Label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Settlement Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ borderRadius: "8px", padding: "8px" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#ecf0f1" }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={handleSettle}>
          Settle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettleExpensesModal;
