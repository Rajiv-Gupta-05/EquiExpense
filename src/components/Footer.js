import React from "react";
import { Container } from "react-bootstrap";
import "./Bootstrap/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container className="d-flex justify-content-center align-items-center">
        <p className="mb-0">
          EquiExpense &copy; {new Date().getFullYear()} | Developed by{" "}
          <a
            href="http://rajivgupta.rf.gd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rajiv Gupta
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
