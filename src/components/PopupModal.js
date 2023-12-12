import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopupModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ background: "#f86c6b", color: "#fff" }}>
        <Modal.Title>Oops!</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#f8f9fa" }}>
        <p style={{ fontSize: "18px", color: "#333" }}>
          It seems you forgot to select friends for splitting the expense.
        </p>
      </Modal.Body>
      <Modal.Footer style={{ background: "#f8f9fa" }}>
        <Button variant="danger" onClick={handleClose}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupModal;
