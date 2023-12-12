import React, { useState, useEffect } from "react";
import { Modal} from "react-bootstrap";

const AutoDismissPopup = ({ show, handleClose, message }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      // Auto-dismiss after 3 seconds
      const dismissTimer = setTimeout(() => {
        handleClose();
      }, 2000);

      return () => clearTimeout(dismissTimer);
    }
  }, [show, handleClose]);

  return (
    <Modal show={visible} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#007bff", color: "#fff" }}>
        <Modal.Title style={{ fontSize: "24px" }}>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default AutoDismissPopup;
