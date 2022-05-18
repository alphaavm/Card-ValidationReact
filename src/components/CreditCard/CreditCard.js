import React from "react";
import "./CreditCard.css";
import image from "../card-chip.png";
import msLogo from "../ms-logo.png";

function CreditCard({ state }) {
  return (
    <div className="credit-card-container">
      <img src={image} className="card-chip-img" />
      <div className="card-no">{state.cardNo || ""}</div>
      <div className="card-name">{state.Name || ""}</div>
      <div className="card-date">{state.date || ""}</div>
      <img src={msLogo} className="visa-img" />
    </div>
  );
}

export default CreditCard;
