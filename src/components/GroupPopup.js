import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const GroupPopup = ({ show, handleClose, onAddGroup }) => {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = () => {
    if (groupName.trim() !== "") {
      onAddGroup(groupName);
      setGroupName("");
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Add Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formGroupName">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddGroup}>
          Add Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupPopup;
