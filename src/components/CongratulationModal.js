import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "../assets/Animation.json";
import "./Bootstrap/CongratulationModal.css";

const CongratulationModal = ({ show, handleClose, friendName, settledAmount, paymentType }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      handleClose();
    }, 10000);

    return () => clearTimeout(timeout);
  }, [handleClose]);

  const formatCurrency = (amount) => {
    // Format the amount as Indian currency (INR)
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const amountColor = settledAmount > 0 ? "text-success" : "text-danger";

  return (
    <Modal
      show={show && visible}
      onHide={handleClose}
      centered
      className="congratulation-modal"
    >
      <Modal.Body className="congratulation-content">
        <div className="congratulation-header">
          <h2>Congratulations!</h2>
        </div>
        <Lottie options={lottieOptions} height={300} width={300} />
        <p>
          {friendName} has successfully settled the amount of{" "}
          <span style={{ fontWeight: "bold", color: "#28a745" }}>
            {formatCurrency(settledAmount)}
          </span>{" "}
          through online.
        </p>
        <Button variant="success" onClick={handleClose} className="congratulation-button">
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CongratulationModal;
